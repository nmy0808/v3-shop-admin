import { ref } from "vue";

export const tableOptions = ref([
	{
    label: "#",
    prop: "index",
    type: "selection",
    width: "60px",
    align: "center",
  },
	{
		label: "规格名称",
		prop: "name",
		width: "300px",
		align: "",
	},
	{
		label: "规格值",
		prop: "default",	
		align: "",
		slot: "skus",
	},
	{
		label: "排序",
		prop: "order",
		align: "center",
	},
	{
		label: "状态",
		prop: "",
		width: "200px",
		align: "center",
		slot: "status",
	},
]);
