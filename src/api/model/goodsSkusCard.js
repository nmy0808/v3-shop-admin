import config from "@/config";
import http from "@/utils/request";

// 添加商品规格选项
export const goodsSkuCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_skus_card`, data);
};

// 修改商品规格选项
export const goodsSkuEditApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_skus_card/${data.id}`, data);
};

// 删除商品规格选项
export const goodsSkuDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_skus_card/${data.id}/delete`, data);
};

// 排序商品规格选项
export const goodsSkuSortApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_skus_card/sort`, data);
};

// 选择设置商品规格选项和值
export const goodsSkuSetApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_skus_card/${data.id}/set`, data);
};
