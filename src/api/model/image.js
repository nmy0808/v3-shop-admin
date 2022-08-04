import config from "@/config";
import http from "@/utils/request";

/**
 * 修改图库分类
 * @param {*} data  image_class_id page limit
 * @returns 
 */
 export const uploadImageApi = async (data) => {
	const formData = new FormData();
	formData.append("image_class_id", data.image_class_id);
	if(Array.isArray(data.img)){
		data.img.forEach(it => formData.append("img", it))
	}else{
		formData.append("img", data.img);
	}
	return await http.post(`${config.API_URL}/image/upload`, formData);
};

// 修改图片名称
export const renameImageApi = async (data) => {
	return await http.post(`${config.API_URL}/image/${data.id}`, { name: data.name });
};
// 删除图片
export const removeImageByIdApi = async (data) => {
	return await http.post(`${config.API_URL}/image/delete_all`, { ids: data.ids });
};