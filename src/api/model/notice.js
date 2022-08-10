import config from "@/config";
import http from "@/utils/request";

// 公告列表
export const noticeListApi = async (data) => {
	return await http.get(`${config.API_URL}/notice/${data.page}`, {limit: data.limit});
};
// 增加公告
export const noticeCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/notice`, data);
};
// 修改公告
export const noticeEditApi = async (data) => {
	return await http.post(`${config.API_URL}/notice/${data.id}`, data);
};
// 删除公告
export const noticeDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/notice/${data.id}/delete`, data);
};
