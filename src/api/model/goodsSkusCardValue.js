import config from "@/config";
import http from "@/utils/request";

// 添加商品规格选项
export const goodsSkuValCreateApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_skus_card_value`, data);
};

// 修改商品规格选项
export const goodsSkuValEditApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_skus_card_value/${data.id}`, data);
};

// 删除商品规格选项的值
export const goodsSkuValDeleteApi = async (data) => {
	return await http.post(`${config.API_URL}/goods_skus_card_value/${data.id}/delete`, data);
};
