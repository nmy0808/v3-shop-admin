import config from "@/config";
import http from "@/utils/request";

// 角色列表
export const roleListApi = async (data) => {
	return await http.get(`${config.API_URL}/role/${data.page}`);
};
// 删除角色
export const roleDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/role/${data.id}/delete`);
};
// 修改角色状态
export const roleStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/role/${data.id}/update_status`, {status : data.status});
};
// 配置角色权限
export const roleSetApi = async (data) => {
	return await http.post(`${config.API_URL}/role/set_rules`, data);
};
// 增加角色
export const roleCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/role`, data);
};
// 修改角色
export const roleEditApi = async (data) => {
	return await http.post(`${config.API_URL}/role/${data.id}`, data);
};