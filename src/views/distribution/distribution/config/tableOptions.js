import { ref } from 'vue'

export const tableOptions = ref([
  {
    label: "ID",
    prop: "id",
    align: "center"
  },
  {
    label: "用户信息",
		slot: 'user-info',
    width: "260px",
    align: ""
  },
  {
    label: "推广用户数量",
    prop: "share_num",
    align: "center"
  },
	{
    label: "订单数量",
    prop: "share_order_num",
    align: "center"
  },
	{
    label: "订单金额",
    prop: "order_price",
    align: "center"
  },
	{
    label: "账户佣金",
    prop: "commission",
    align: "center"
  },
	{
    label: "已提现金额",
    prop: "cash_out_price",
    align: "center"
  },
	{
    label: "提现次数",
    prop: "cash_out_time",
    align: "center"
  },
	{
    label: "未提现金额",
    prop: "no_cash_out_price",
    align: "center"
  },
]);
