import config from "@/config";
import http from "@/utils/request";

// 菜单权限列表
export const ruleListApi = async (data) => {
	return await http.get(`${config.API_URL}/rule/${data?.page || 1}`);
};