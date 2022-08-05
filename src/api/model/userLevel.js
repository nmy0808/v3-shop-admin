import config from "@/config";
import http from "@/utils/request";

// 会员等级列表
export const userLevelListApi = async (data) => {
	return await http.get(`${config.API_URL}/user_level/${data.page}`);
};

// 增加会员等级
export const userLevelCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/user_level`, data);
};

// 修改会员等级
export const userLevelEditApi = async (data) => {
	return await http.post(`${config.API_URL}/user_level/${data.id}`, data);
};

// 修改会员等级状态
export const userLevelStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/user_level/${data.id}/update_status`, { status: data.status });
};

// 删除会员等级
export const userLevelDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/user_level/${data.id}/delete`);
};