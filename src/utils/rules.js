
export const getRequiredRule = (message) => ({
	required: true,
	message,
	trigger: "blur",
});
export const levelNameRule = [
	{ required: true, message: "等级名称不能为空", trigger: "blur" },
	{
		pattern: /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
		message: "等级名称必须是纯汉字组成",
		trigger: "blur",
	},
]
export const usernameRule = [
	{ required: true, message: "用户名不能为空", trigger: "blur" },
	{ min: 4, max: 25,  message: "用户名需要4-25字符", trigger: "blur" },
];
export const nicknameRule = [
	{ required: true, message: "昵称不能为空", trigger: "blur" },
];
export const passwordRule = [
	{ required: true, message: "密码不能为空", trigger: "blur" },
];
export const phoneRule = [
	{ required: true, message: "手机号不能为空", trigger: "blur" },
	{
		pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
		message: "手机号格式不正确",
		trigger: "blur",
	},
];
export const emailRule = [
	{ required: true, message: "邮箱不能为空", trigger: "blur" },
	{
		pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
		message: "邮箱格式不正确",
		trigger: "blur",
	},
];
