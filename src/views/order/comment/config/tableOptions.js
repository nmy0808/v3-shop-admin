import { ref } from 'vue'

export const tableOptions = ref([
  {
		type: 'expand',
		slot: 'expand'
  },
  {
    label: "ID",
		prop: 'id',
    width: "80px",
    align: "center"
  },
	{
    label: "商品",
		slot: 'goods_info',
    width: "",
    align: ""
  },
  {
    label: "评价信息",
    slot: "comment",
    align: "center"
  },
	{
    label: "评价时间",
    prop: "review_time",
    align: "center"
  },
  {
    label: "是否显示",
		slot: 'status',
    width: "200px",
    align: "center",
  },
]);
