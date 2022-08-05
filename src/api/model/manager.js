import config from "@/config";
import http from "@/utils/request";

// 管理员列表
export const managerListApi = async (data) => {
	return await http.get(`${config.API_URL}/manager/${data.page}`, {
		limit: data.limit,
		keyword: data.keyword
	});
};
// 增加管理员
export const managerCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/manager`, data);
};
// 修改管理员
export const managerEditApi = async (data) => {
	return await http.post(`${config.API_URL}/manager/${data.id}`, data);
};
// 删除管理员
export const managerDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/manager/${data.id}/delete`);
};
// 修改管理员状态
export const managerStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/manager/${data.id}/update_status`, data);
};