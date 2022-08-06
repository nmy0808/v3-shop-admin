import config from "@/config";
import http from "@/utils/request";

// 商品分类列表
export const categoryListApi = async () => {
	return await http.get(`${config.API_URL}/category`);
};

// 增加商品分类
export const categoryCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/category`, data);
};
// 修改商品分类
export const categoryEditApi = async (data) => {
	return await http.post(`${config.API_URL}/category/${data.id}`, data);
};

// 修改商品分类状态
export const categoryStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/category/${data.id}/update_status`, data);
};

// 删除商品分类
export const categoryDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/category/${data.id}/delete`);
};
