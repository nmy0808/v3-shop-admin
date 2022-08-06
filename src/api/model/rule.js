import config from "@/config";
import http from "@/utils/request";

// 菜单权限列表
export const ruleListApi = async (data) => {
	return await http.get(`${config.API_URL}/rule/${data?.page || 1}`);
};

// 增加菜单权限
export const ruleCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/rule`, data);
};

// 修改菜单权限
export const ruleUpdateApi = async (data) => {
	return await http.post(`${config.API_URL}/rule/${data.id}`, data);
};

// 删除菜单权限
export const ruleDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/rule/${data.id}/delete`);
};

// 修改菜单权限状态
export const ruleStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/rule/${data.id}/update_status`, data);
};