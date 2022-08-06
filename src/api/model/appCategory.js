import config from "@/config";
import http from "@/utils/request";

// 分类关联产品列表
export const appCategoryListApi = async (data) => {
	return await http.get(`${config.API_URL}/app_category_item/list`, data);
};
// 删除关联产品
export const appCategoryDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/app_category_item/${data.id}/delete`);
};
// 关联产品
export const appCategorySetApi = async (data) => {
	return await http.post(`${config.API_URL}/app_category_item`, data);
};