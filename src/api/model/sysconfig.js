import config from "@/config";
import http from "@/utils/request";

// 增加商品
export const settingInfoApi = async (data) => {
	return await http.get(`${config.API_URL}/sysconfig`, data);
};
// 上传
export const fileUploadApi = async (data) => {
	return await http.post(`${config.API_URL}/sysconfig/upload`, data);
};
