import { ref } from 'vue'

export const tableOptions = ref([
  {
    label: "管理员",
		slot: 'user',
    width: "",
    align: ""
  },
  {
    label: "所属管理员",
    prop: "",
    align: "center",
		parse: ({ row }) => {
      return row?.role?.name || '-';
    },
  },
  {
    label: "状态",
    prop: "",
    align: "center",
		slot: 'status'
  },
]);