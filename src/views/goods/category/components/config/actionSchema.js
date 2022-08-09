import { ref } from "vue";
import { getRequiredRule } from "@/utils/rules";

export const getActionSchema = () => {
	const actionSchema = ref([
		{
			type: "input",
			label: "分类名称",
			prop: "name",
			placeholder: "请输入分类名称",
			value: "",
			attrs: {
				clearable: true,
			},
			rules: getRequiredRule("必须输入分类名称"),
		},
	]);

	return actionSchema;
};
