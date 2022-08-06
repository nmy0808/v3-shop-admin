import { ref } from 'vue'

export const tableOptions = ref([
  {
    label: "优惠券名称",
		slot: 'name',
    width: "300px",
    align: ""
  },
	{
    label: "状态",
    prop: "status",
    slot: "status",
    width: "100px",
    align: "center",
		
  },
	{
    label: "满足条件",
    prop: "min_price",
    align: "center",
		parse: ({ row }) => {
      return `¥ ${row.min_price}`;
    },
  },
  {
    label: "优惠",
    prop: "value",
    slot: "value",
    align: "center"
  },
  {
    label: "发放数量",
    prop: "total",
    align: "center"
  },
	{
    label: "已使用",
    prop: "used",
    align: "center",
    width: "160px"
  },
]);