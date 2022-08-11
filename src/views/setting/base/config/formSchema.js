import { ref } from "vue";
import { userLevelListApi } from "@/api/model/userLevel";
export const registrySchema = ref([
	{
		type: "radio-group",
		label: "是否允许注册会员",
		prop: "open_reg",
		placeholder: "",
		value: 1,
		children: [
			{
				type: "radio",
				label: 1,
				border: true,
				text: "是",
			},
			{
				type: "radio",
				label: 0,
				border: true,
				text: "否",
			}
		],
		attrs: {},
	},
	{
		type: "radio-group",
		label: "注册类型",
		prop: "reg_method",
		placeholder: "",
		value: 'username',
		children: [
			{
				type: "radio",
				label: 'username',
				border: true,
				text: "普通注册",
			},
			{
				type: "radio",
				label: 'phone',
				border: true,
				text: "手机",
			}
		],
		attrs: {},
	},
	{
		type: "input",
		label: "密码最小长度",
		prop: "password_min",
		placeholder: "请输入密码最小长度",
		value: "",
		attrs: {
			clearable: true,
			style: {
				width: "400px",
			},
		},
	},
	{
		type: "checkbox-group",
		label: "强制密码复杂度",
		prop: "password_encrypt",
		placeholder: "",
		value: [],
		children: [
			{
				type: "checkbox",
				label: "0",
				border: true,
				text: "数字",
			},
			{
				type: "checkbox",
				label: "1",
				border: true,
				text: "小写字母",
			},
			{
				type: "checkbox",
				label: "2",
				border: true,
				text: "大写字母",
			},
		],
		attrs: {},
	},
]);
export const uploadSchema = ref([
	{
		type: "radio-group",
		label: "默认上传方式",
		prop: "upload_method",
		placeholder: "",
		value: 'oss',
		children: [
			{
				type: "radio",
				label: 'oss',
				border: true,
				text: "阿里oss",
			}
		],
		attrs: {},
	},

	{
		type: "input",
		label: "Bucket",
		prop: "Bucket",
		placeholder: "请输入Bucket",
		value: "",
		attrs: {
			clearable: true,
			style: {
				width: "400px",
			},
		},
	},
	{
		type: "input",
		label: "ACCESS_KEY",
		prop: "ACCESS_KEY",
		placeholder: "请输入ACCESS_KEY",
		value: "",
		attrs: {
			clearable: true,
			style: {
				width: "400px",
			},
		},
	},
	{
		type: "input",
		label: "SECRET_KEY",
		prop: "SECRET_KEY",
		placeholder: "请输入SECRET_KEY",
		value: "",
		attrs: {
			clearable: true,
			style: {
				width: "400px",
			},
		},
	},
	{
		type: "input",
		label: "http",
		prop: "http",
		placeholder: "请输入http",
		value: "",
		attrs: {
			clearable: true,
			style: {
				width: "400px",
			},
		},
	},

]);
export const apiSchema = ref([
	{
		type: "radio-group",
		label: "是否开启API安全",
		prop: "api_safe",
		placeholder: "",
		value: 1,
		children: [
			{
				type: "radio",
				label: 1,
				border: true,
				text: "开启",
			},
			{
				type: "radio",
				label: 0,
				border: true,
				text: "关闭",
			}
		],
		attrs: {},
	},

	{
		type: "input",
		label: "密匙",
		prop: "api_secret",
		placeholder: "请输入密匙",
		value: "",
		attrs: {
			clearable: true,
			style: {
				width: "400px",
			},
		},
	},

]);
