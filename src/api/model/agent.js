import config from "@/config";
import http from "@/utils/request";

// 分销数据统计
export const statisticsApi = async (data) => {
	return await http.get(`${config.API_URL}/agent/statistics`, data);
};

// 分销推广员列表
export const agentListApi = async (data) => {
	return await http.get(`${config.API_URL}/agent/${data.page}`, data);
};

// 推广订单列表
export const userBillListApi = async (data) => {
	return await http.get(`${config.API_URL}/user_bill/${data.page}`, data);
};

// 修改分销配置
export const distributionSettingApi = async (data) => {
	return await http.post(`${config.API_URL}/distribution_setting/set`, data);
};

// 获取分销配置
export const distributionSettingInfoApi = async (data) => {
	return await http.get(`${config.API_URL}/distribution_setting/get`, data);
};
