import config from "@/config";
import http from "@/utils/request";

// 用户列表
export const userListApi = async (data) => {
	return await http.get(`${config.API_URL}/user/${data.page}`, {
		limit: data.limit,
		keyword: data.keyword,
		user_level_id: data.user_level_id
	});
};
// 修改用户状态
export const userStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/user/${data.id}/update_status`, {
		status: data.status
	});
};

// 增加用户
export const userCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/user`, data);
};
// 编辑用户
export const userEditApi = async (data) => {
	return await http.post(`${config.API_URL}/user/${data.id}`, data);
};
// 编辑用户
export const userDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/user/${data.id}/delete`);
};