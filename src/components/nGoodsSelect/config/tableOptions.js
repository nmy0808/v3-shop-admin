import { ref } from 'vue'

export const tableOptions = ref([
	{
		type: 'selection',
    width: "60",
    align: "center"
  },
  {
    label: "商品",
		slot: 'info',
    width: "340px",
    align: ""
  }
]);