import { ref } from "vue";
export const buySchema = ref([

	{
		type: "input-number",
		label: "未支付订单",
		prop: "close_order_minute",
		placeholder: "",
		value: 0,
		appendText: '分钟后自动关闭',
		attrs: {
			clearable: true,
			style: {
				width: "130px",
			},
		},
	},


	{
		type: "input-number",
		label: "已发货订单",
		prop: "auto_received_day",
		placeholder: "",
		value: 0,
		appendText: '天后自动确认收货',
		attrs: {
			clearable: true,
			style: {
				width: "130px",
			},
		},
	},

	{
		type: "input-number",
		label: "已完成订单",
		prop: "after_sale_day",
		placeholder: "",
		value: 0,
		appendText: '天内允许申请售后',
		attrs: {
			clearable: true,
			style: {
				width: "130px",
			},
		},
	},

]);
