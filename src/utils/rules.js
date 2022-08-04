
export const getRequiredRule = (message) => ({
	required: true,
	message,
	trigger: "blur",
});
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
