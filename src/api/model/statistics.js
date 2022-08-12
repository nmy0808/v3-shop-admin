import config from "@/config";
import http from "@/utils/request";

// 后台首页统计1
export const statistics1InfoApi = async () => {
	return await http.get(`${config.API_URL}/statistics1`);
};
// 后台首页统计2
export const statistics2InfoApi = async () => {
	return await http.get(`${config.API_URL}/statistics2`);
};

// 后台首页统计3
export const statistics3InfoApi = async (data) => {
	return await http.get(`${config.API_URL}/statistics3`, data);
};
