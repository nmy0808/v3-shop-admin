import { createRouter, createWebHashHistory } from "vue-router";
import { ElNotification } from "element-plus";
import config from "@/config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import tool from "@/utils/tool";
import systemRouter from "./systemRouter";
import userRoutes from "@/config/route";
import { beforeEach, afterEach } from "./scrollBehavior";
import store from '@/store/'
//系统路由
const routes = systemRouter;

//系统特殊路由
const routes_404 = {
	path: "/:pathMatch(.*)*",
	hidden: true,
	component: () => import(/* webpackChunkName: "404" */ "@/layout/other/404"),
};
let routes_404_r = () => {};

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

//设置标题
document.title = config.APP_NAME;

//判断是否已加载过动态/静态路由
var isGetRouter = false;

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	//动态标题
	document.title = to.meta.title
		? `${to.meta.title} - ${config.APP_NAME}`
		: `${config.APP_NAME}`;

	let token = tool.cookie.get("TOKEN");

	if (to.path === "/login") {
		//删除路由(替换当前layout路由)
		router.addRoute(routes[0]);
		//删除路由(404)
		routes_404_r();
		isGetRouter = false;
		next();
		return false;
	}

	if (routes.findIndex((r) => r.path === to.path) >= 0) {
		next();
		return false;
	}

	if (!token) {
		next({
			path: "/login",
		});
		return false;
	}

	//整页路由处理
	if (to.meta.fullpage) {
		to.matched = [to.matched[to.matched.length - 1]];
	}
	//加载动态/静态路由
	if (!isGetRouter) {
		let apiMenu = tool.data.get("MENU") || [];
		// let apiMenu =  []
		// let userInfo = tool.data.get("USER_INFO")
		// let userMenu = treeFilter(userRoutes, node => {
		// 	return node.meta.role ? node.meta.role.filter(item=>userInfo.role.indexOf(item)>-1).length > 0 : true
		// })
		const menu = [...userRoutes, ...getAsyncMenus()];
		var menuRouter = filterAsyncRouter(menu);
		menuRouter = flatAsyncRoutes(menuRouter);
		store.commit('SET_MENUS', menuRouter)
		// tool.data.set("MENU1", JSON.stringify(menuRouter))
		menuRouter.forEach((item) => {
			router.addRoute("layout", item);
		});
		routes_404_r = router.addRoute(routes_404);
		if (to.matched.length == 0) {
			router.push(to.fullPath);
		}
		isGetRouter = true;
	}
	beforeEach(to, from);
	next();
});

router.afterEach((to, from) => {
	afterEach(to, from);
	NProgress.done();
});

router.onError((error) => {
	NProgress.done();
	ElNotification.error({
		title: "路由错误",
		message: error.message,
	});
});

//入侵追加自定义方法、对象
router.sc_getMenu = () => {
	// let userInfo = tool.data.get("USER_INFO");
	// let userMenu = treeFilter(userRoutes, (node) => {
	// 	return node.meta.role
	// 		? node.meta.role.filter((item) => userInfo.role.indexOf(item) > -1)
	// 				.length > 0
	// 		: true;
	// });
	const menu = [...userRoutes, ...getAsyncMenus()];
	return menu;
};

//转换
function filterAsyncRouter(routerMap) {
	const accessedRouters = [];
	routerMap.forEach((item) => {
		if (item) {
			item.meta = item.meta ? item.meta : {};
			//处理外部链接特殊路由
			if (item.meta.type == "iframe") {
				item.meta.url = item.path;
				item.path = `/i/${item.name}`;
			}
			//MAP转路由对象
			const route = {
				path: item.path,
				name: item.name,
				meta: item.meta,
				redirect: item.redirect,
				children: item.children ? filterAsyncRouter(item.children) : null,
				component: loadComponent(item.component),
			};
			accessedRouters.push(route);
		}
	});
	return accessedRouters;
}
function loadComponent(component) {
	if (component) {
		return () =>
			import(/* webpackChunkName: "[request]" */ `@/views/${component}`);
	} else {
		return () => import(`@/layout/other/empty`);
	}
}

//路由扁平化
function flatAsyncRoutes(routes, breadcrumb = []) {
	let res = [];
	routes.forEach((route) => {
		const tmp = { ...route };
		if (tmp.children) {
			let childrenBreadcrumb = [...breadcrumb];
			childrenBreadcrumb.push(route);
			let tmpRoute = { ...route };
			tmpRoute.meta.breadcrumb = childrenBreadcrumb;
			delete tmpRoute.children;
			res.push(tmpRoute);
			let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb);
			childrenRoutes.map((item) => {
				res.push(item);
			});
		} else {
			let tmpBreadcrumb = [...breadcrumb];
			tmpBreadcrumb.push(tmp);
			tmp.meta.breadcrumb = tmpBreadcrumb;
			res.push(tmp);
		}
	});
	return res;
}

//过滤树
function treeFilter(tree, func) {
	return tree
		.map((node) => ({ ...node }))
		.filter((node) => {
			node.children = node.children && treeFilter(node.children, func);
			return func(node) || (node.children && node.children.length);
		});
}

//将接口传来的menus配置整理为该脚手架需要的配置格式
function parseMenusApiToConfig(allRoutes, apiMenus) {
	// 补全父级path, 后端给的接口数据没有path
	apiMenus.map((apiMenu, index) => {
		const hasChild = apiMenu.child && apiMenu.child.length;
		if (hasChild) {
			apiMenu.frontpath = "/" + apiMenu.child[0].frontpath.split("/")[1];
		} else {
			apiMenu.frontpath = "/";
		}
	});
	apiMenus.shift(); // 去掉后端传来的首页
	const resultRoutes = [];
	const deep = (apiMenu) => {
		const configMenu = allRoutes.find(
			(item) => item.path === apiMenu.frontpath
		);
		const obj = {
			meta: {
				title: "",
			},
		};
		obj.path = apiMenu.frontpath;
		// 是否是顶级路由
		const isParentRoute = !!(apiMenu.child && apiMenu.child.length);
		if (!isParentRoute && !configMenu) {
			// console.log(apiMenu , configMenu , "!")
			return null;
		}
		obj.path = isParentRoute ? apiMenu.frontpath : configMenu.path;
		obj.name = isParentRoute
			? apiMenu.frontpath.replaceAll("/", "")
			: configMenu.name;
		obj.meta.title = apiMenu.name;
		obj.meta.icon = apiMenu.icon && "el-icon-" + apiMenu.icon;
		//
		obj.component = configMenu ? configMenu.component : null;
		// 遍历子元素
		if (isParentRoute) {
			if (!obj.children) {
				obj.children = [];
			}
			apiMenu.child.forEach((child) => {
				obj.children.push(deep(child));
			});
		}
		return obj;
	};
	apiMenus.forEach((apiMenu) => {
		const route = deep(apiMenu);
		resultRoutes.push(route);
	});
	return resultRoutes.filter((it) => it);
}

function getAsyncMenus() {
	const allRoutes = [];
	// 请求到的menus (格式跟脚手架不一致)
	const apiMenus = tool.data.get("MENU") || [];

	// 1.读取本地所有路由
	const routeFiles = require.context("./main", true, /\.js$/);
	routeFiles.keys().forEach((key) => {
		// "../router/main/analysis/dashboard/dashboard.js"
		const route = require("../router/main" + key.substr(1)).default;
		allRoutes.push(route);
	});
	// 2.对照本地所有与请求来的menus, 生成符合脚手架格式的路由表
	const list = parseMenusApiToConfig(allRoutes, apiMenus);
	return list;
}
export default router;
