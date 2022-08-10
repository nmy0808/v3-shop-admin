import config from "@/config";
import http from "@/utils/request";

// 订单列表
export const orderListApi = async (data) => {
	const params = {}
	Object.entries(data).forEach(([k,v])=>{
		if(v){
			params[k] = v
		}
	})
	return await http.get(`${config.API_URL}/order/${data.page}`, params);
};
// 批量删除订单
export const orderBatchDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/order/delete_all`, data);
};
// 订单发货
export const orderShipApi = async (data) => {
	return await http.post(`${config.API_URL}/order/${data.id}/ship`, data);
};
// 拒绝/同意退款
export const orderStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/order/${data.id}/handle_refund`, data);
};
// 导出订单
export const orderExportApi = async (data) => {
	return await http.post(`${config.API_URL}/order/excelexport`, data);
};
// 快递公司列表
export const expressCompanyListApi = async (data) => {
	return await http.get(`${config.API_URL}/express_company/${data.page}`, data);
};
// 查看订单物流信息
export const orderShipInfoApi = async (data) => {
	return await http.get(`${config.API_URL}/order/${data.id}/get_ship_info`, data);
};
