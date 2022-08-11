import { ref } from "vue";
import { fileUploadApi } from '@/api/model/sysconfig'
import {
	getRequiredRule,
} from "@/utils/rules";

export const getAliSchema = () => {
	const actionSchema = ref([
		{
			type: "input",
			label: "app_id",
			prop: "app_id",
			placeholder: "请输入app_id",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入app_id'),
		},
		{
			type: "input",
			label: "公钥 ",
			prop: "ali_public_key",
			placeholder: "请输入公钥",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入公钥'),
		},
		{
			type: "input",
			label: "私钥",
			prop: "private_key",
			placeholder: "请输入私钥",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入私钥'),
		}

	]);
	return actionSchema
};


export const getWxSchema = () => {
	const actionSchema = ref([
		{
			type: "input",
			label: "公众号 APPID",
			prop: "app_id",
			placeholder: "公众号APPID",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入公众号APPID'),
		},
		{
			type: "input",
			label: "小程序 APPID",
			prop: "miniapp_id",
			placeholder: "小程序APPID",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入小程序APPID'),
		},
		{
			type: "input",
			label: "小程序 secret",
			prop: "secret",
			placeholder: "小程序secret",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入小程序secret'),
		},
		{
			type: "input",
			label: "appid",
			prop: "appid",
			placeholder: "appid",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入appid'),
		},
		{
			type: "input",
			label: "商户号",
			prop: "mch_id",
			placeholder: "商户号",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入商户号'),
		},
		{
			type: "input",
			label: "API 秘钥",
			prop: "key",
			placeholder: "API秘钥",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule('请输入API秘钥'),
		},

		// {
		// 	type: "upload",
		// 	label: "cert_client",
		// 	prop: "cert_client",
		// 	value: "",
		// 	customUpload: async (file) => {
		// 		// 1.自定义上传请求
		// 		// 2.返回图片url即可
		// 		const { data } = await fileUploadApi({ file });
		// 		console.log(data)
		// 		return data.url;
		// 	},
		// },

	]);
	return actionSchema
};
