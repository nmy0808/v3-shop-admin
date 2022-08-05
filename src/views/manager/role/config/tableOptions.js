import { ref } from 'vue'

export const tableOptions = ref([
  {
    label: "角色名称",
    prop: "name",
    width: "",
    align: "center"
  },
	{
    label: "角色描述",
    prop: "desc",
    width: "",
    align: "center"
  },
  {
    label: "状态",
    prop: "",
    width: "200px",
    align: "center",
		slot: 'status'
  },
]);