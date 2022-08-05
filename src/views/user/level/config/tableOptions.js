import { ref } from 'vue'

export const tableOptions = ref([
	{
    label: "等级名称",
    prop: "name",
    width: "",
    align: "center"
  },
  {
    label: "会员等级",
    prop: "",
    width: "",
    align: "center",
		parse: ({ row }) => {
      return row?.user_level?.name || '普通会员';
    },
  },
  {
    label: "折扣率(%)",
    prop: "discount",
    width: "",
    align: "center",
  },
	{
    label: "等级序号",
    prop: "level",
    width: "",
    align: "center",
  },
  {
    label: "状态",
    prop: "",
    width: "",
    align: "center",
		slot: 'status'
  },
]);