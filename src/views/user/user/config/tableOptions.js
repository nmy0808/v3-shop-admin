import { ref } from 'vue'

export const tableOptions = ref([
  {
    label: "会员",
		slot: 'user',
    width: "",
    align: ""
  },
  {
    label: "会员等级",
    prop: "",
    width: "180px",
    align: "center",
		parse: ({ row }) => {
      return row?.user_level?.name || '普通会员';
    },
  },
  {
    label: "登录注册",
    prop: "",
    width: "300px",
    align: "center",
    parse: ({ row }) => {
      const value = row.create_time;
      return value
    },
  },
  {
    label: "状态",
    prop: "",
    width: "100px",
    align: "center",
		slot: 'status'
  },
]);