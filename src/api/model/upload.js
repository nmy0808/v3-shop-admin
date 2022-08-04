import config from "@/config";
import http from "@/utils/request";

export const uploadApi = async (data) => {
	const formData = new FormData();
	formData.append("id", data.image_class_id);
	if(Array.isArray(data.img)){
		data.img.forEach(it => formData.append("img", it))
	}else{
		formData.append("img", data.img);
	}
	return await http.post(`${config.API_URL}/image/upload`, formData);
};
