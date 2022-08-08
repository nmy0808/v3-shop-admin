import config from "@/config";
import http from "@/utils/request";

// 增加商品
export const goodsCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/goods`, data);
};
// 修改商品
export const goodsEditApi = async (data) => {
	return await http.post(`${config.API_URL}/goods/${data.id}`, data);
};
// 批量上架/下架商品
export const goodsStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/goods/changestatus`, data);
};
// 商品列表
export const goodsListApi = async (data) => {
	const params = {...data}
	if(!data.category_id){
		delete params['category_id']
	}
	return await http.get(`${config.API_URL}/goods/${data.page}`, 
		params
	);
};
// 批量删除商品
export const goodsBatchDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/goods/delete_all`, data);
};
// 批量恢复商品
export const goodsBatchRestoreApi = async (data) => {
	return await http.post(`${config.API_URL}/goods/restore`, data);
};
// 彻底删除商品
export const goodsBatchDestroyApi = async (data) => {
	return await http.post(`${config.API_URL}/goods/destroy`, data);
};
// 审核商品
export const goodsCheckApi = async (data) => {
	return await http.post(`${config.API_URL}/goods/${data.id}/check`, data);
};
// 设置商品轮播图
export const goodsSetBannersApi = async (data) => {
	return await http.post(`${config.API_URL}/goods/banners/${data.id}`, data);
};
// 查看商品资料
export const goodsInfoApi = async (data) => {
	return await http.get(`${config.API_URL}/goods/read/${data.id}`, data);
};
// 更新商品规格
export const goodsSkuUpdateApi = async (data) => {
	return await http.post(`${config.API_URL}/goods/updateskus/${data.id}`, data);
};
