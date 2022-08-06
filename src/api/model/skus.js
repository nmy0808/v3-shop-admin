import config from "@/config";
import http from "@/utils/request";

// 增加商品规格
export const skuCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/skus`, data);
};

// 修改商品规格
export const skuEditApi = async (data) => {
	return await http.post(`${config.API_URL}/skus/${data.id}`, data);
};

// 修改商品规格状态
export const skuStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/skus/${data.id}/update_status`, data);
};

// 商品规格列表
export const skuListApi = async (data) => {
	return await http.get(`${config.API_URL}/skus/${data.page}`, data);
};

// 批量删除商品规格
export const skuDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/skus/delete_all`, data);
};