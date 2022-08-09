import { ref } from 'vue'

export const tableOptions = ref([
  {
    label: "商品",
		slot: 'info',
    width: "440px",
    align: ""
  },
  {
    label: "实际销量",
    prop: "sale_count",
    align: "center"
  },
	{
    label: "商品状态",
    prop: "status",
		slot: "status",
    align: "center"
  },
	{
    label: "审核状态",
    prop: "ischeck",
		slot: "ischeck",
    align: "center"
  },
  {
    label: "总库存",
    prop: "stock",
    align: "center",
  },
]);