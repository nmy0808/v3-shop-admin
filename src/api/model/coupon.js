import config from "@/config";
import http from "@/utils/request";

// 增加优惠券
export const couponCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/coupon`, data);
};
// 修改优惠券
export const couponUpdateApi = async (data) => {
	return await http.post(`${config.API_URL}/coupon/${data.id}`, data);
};
// 优惠券列表
export const couponListApi = async (data) => {
	return await http.get(`${config.API_URL}/coupon/${data.page}`, data);
};
// 删除优惠券
export const couponDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/coupon/${data.id}/delete`, data);
};
// 修改优惠券状态
export const couponStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/coupon/${data.id}/update_status`, data);
};