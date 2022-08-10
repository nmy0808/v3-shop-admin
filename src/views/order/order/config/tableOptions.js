import { ref } from 'vue'

export const tableOptions = ref([
	{
		type: 'selection',
    width: "60px",
    align: "center"
  },
  {
    label: "商品",
		slot: 'goods-info',
    width: "400px",
    align: ""
  },
  {
    label: "实付款",
    prop: "total_price",
    align: "center"
  },
  {
    label: "买家",
    slot: "user",
    align: "center"
  },
	{
    label: "交易状态",
    slot: "status-info",
    align: "center"
  }
]);
