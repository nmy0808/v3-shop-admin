import config from "@/config";
import http from "@/utils/request";

// 商品评价列表
export const goodsCommentListApi = async (data) => {
	return await http.get(`${config.API_URL}/goods_comment/${data.page}`, data);
};
// 修改商品评价状态
export const goodsCommentStatusApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_comment/${data.id}/update_status`, data);
};
// 回复商品评价
export const goodsCommentReviewApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_comment/review/${data.id}`, data);
};
