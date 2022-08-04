import config from "@/config";
import http from "@/utils/request";

export default {
	token: {
		url: `${config.API_URL}/login`,
		name: "登录获取TOKEN",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		},
	},
	loginApi: async (data = {}) => {
		return await http.post(`${config.API_URL}/login`, data);
	},
	userInfoApi: async () => {
		return await http.post(`${config.API_URL}/getinfo`);
	},
};
