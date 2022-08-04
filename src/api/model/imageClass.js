import config from "@/config";
import http from "@/utils/request";
/**
 * 图库列表
 * @param {*} params page limit
 * @returns
 */
export const imageMenusApi = async (data) => {
	return await http.get(`${config.API_URL}/image_class/${data.page}`, { limit: data.limit });
};
/**
 * 指定分类下的图片列表
 * @param {*} data  id page limit
 * @returns 
 */
export const imageListByIdApi = async (data) => {
	return await http.get(`${config.API_URL}/image_class/${data.id}/image/${data.page}`, { limit: data.limit });
};
/**
 * 修改图库分类
 * @param {*} data  id page limit
 * @returns 
 */
 export const updateImageMenuApi = async (data) => {
	return await http.post(`${config.API_URL}/image_class/${data.id}`, { name: data.name, order: data.order });
};
/**
 * 修改图库分类
 * @param {*} data  id page limit
 * @returns 
 */
 export const createImageMenuApi = async (data) => {
	return await http.post(`${config.API_URL}/image_class`, { name: data.name, order: data.order });
};