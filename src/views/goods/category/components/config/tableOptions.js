import { ref } from 'vue'

export const tableOptions = ref([
	{
    label: "ID",
    prop: "id",
    width: "100px",
    align: "center"
  },
  {
    label: "商品封面",
		slot: 'info',
    align: "",
  }
  
]);