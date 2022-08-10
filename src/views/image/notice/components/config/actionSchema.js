import { ref } from "vue";
import { getRequiredRule } from "@/utils/rules";

export const getActionSchema = () => {
	const actionSchema = ref([
		{
			type: "input",
			label: "公告标题",
			prop: "title",
			placeholder: "请输入公告标题",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule("必须输入公告标题"),
		},
		{
			type: "input",
			label: "公告内容",
			prop: "content",
			placeholder: "请输入公告内容",
			value: "",
			attrs: {
				type: 'textarea',
				rows: 3,
				clearable: true,
			},
			rules: getRequiredRule("必须输入公告内容"),
		},
	]);

	return actionSchema;
};
