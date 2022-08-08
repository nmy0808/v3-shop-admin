import { confirm, notification } from "@/libs/elementPlus";
import { nextTick, ref, toRaw, watch } from "vue";

export const usePageAction = ({
	listSearchParams, // 除分页外查询参数
	listDataApi,
	createDataApi,
	updateDataApi,
	statusDataApi,
	deleteDataApi,
}) => {
	const loading = ref(false);
	const pageSearch = ref({
		page: 1,
		limit: 10,
	});
	const total = ref(0);

	const list = ref([]);
	//获取列表
	//params: 额外的参数可以由外部传入
	const getListData = async () => {
		try {
			loading.value = true;
			let params = {};
			listSearchParams && (params = toRaw(listSearchParams.value));
			params.page = pageSearch.value.page;
			params.limit = pageSearch.value.limit;
			const { data } = await listDataApi(params);
			list.value = data.list;
			total.value = data.totalCount;
			return data
		} finally {
			loading.value = false;
		}
	};
	//创建数据
	const createData = async ({params, callback}) => {
		try {
			loading.value = true;
			await createDataApi(params)
			callback && (await callback())
			notification({ message: '新增成功', type: 'success' })
		}  finally {
			loading.value = false;
		}
	};
	//修改数据
	const updateData = async({params, callback}) => {
		try {
			loading.value = true;
			await updateDataApi(params)
			callback && (await callback())
			notification({ message: '编辑完成', type: 'success' })
		}  finally {
			loading.value = false;
		}
	};
	//修改状态
	const statusData = async ({params, row}) => {
		try {
			row.statusLoading = true
			await statusDataApi(params)
			if(row.status !== undefined || null){
				row.status 
					? notification({ message: "已开启", type: "success" })
					: notification({ message: "已关闭", type: "error" })
			}else{
				notification({ message: "状态更新完成", type: "success" })
			}
		} catch (error) {
			await getListData()
		} finally {
			row.statusLoading = false
		}
	};
	//删除数据
	const deleteData = async (params) => {
		const flag = await confirm({ message: "确定删除?" });
		if (!flag) return;
		try {
			loading.value = true;
			await deleteDataApi(params);
			await getListData();
			notification({ message: "已删除", type: "success" });
		} catch (error) {
		} finally {
			loading.value = false;
		}
	};
	// 监听分页
	watch(pageSearch, getListData, { deep: true });
	return {
		loading,
		pageSearch,
		total,
		list,
		getListData,
		createData,
		updateData,
		statusData,
		deleteData,
	};
};
