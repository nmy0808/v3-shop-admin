import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import { ElNotification, ElMessageBox, ElMessage } from "element-plus";

export const setupElementPlus = (app) => {
	app.use(ElementPlus);
};
export function notification({ message, title, type = "error" }) {
	ElNotification({
		title,
		message,
		type,
	});
}

export function confirm({message, type='warning'}){
	return new Promise((resolve)=>{
		ElMessageBox.confirm(message, "提示", {
			type,
			confirmButtonText: "确定",
			cancelButtonText: "取消",
		}).then(async () => {
			resolve(true)
		}).catch(_=>{
			resolve(false)
		})
	})
}

export function message({ message, type, duration }){
	ElMessage({
		type,
		message,
		duration,
	});
}

export function prompt({message, title, inputValue, inputPattern, inputErrorMessage}){
	return new Promise((resolve, reject)=>{
		ElMessageBox.prompt(message, title, {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			inputPattern,
			inputErrorMessage,
			inputValue
		})
			.then(({ value }) => {	
				resolve(value)
			})
			.catch(() => {
				reject()
			})
	})
}