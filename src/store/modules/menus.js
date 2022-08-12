export default {
	state: {
		// 整理后的路由菜单
		menus: []
	},
	mutations: {
		SET_MENUS(state, menus){
			state.menus = menus
		},
	}
}
