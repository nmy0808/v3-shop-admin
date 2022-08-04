import config from "@/config";
import http from "@/utils/request";

// 会员等级列表
export const userLevelListApi = async (data) => {
	return await http.get(`${config.API_URL}/user_level/${data.page}`);
};