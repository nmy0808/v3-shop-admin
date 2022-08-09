import config from "@/config";
import http from "@/utils/request";

// 商品分类列表
export const categoryItemListApi = async (data) => {
	return await http.get(`${config.API_URL}/app_category_item/list`, data);
};
// 删除关联产品
export const categoryItemDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/app_category_item/${data.id}/delete`, data);
};
// 关联产品
export const categoryItemSetApi = async (data) => {
	return await http.post(`${config.API_URL}/app_category_item`, data);
};