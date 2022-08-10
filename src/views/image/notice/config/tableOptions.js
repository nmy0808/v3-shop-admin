import { ref } from 'vue'

export const tableOptions = ref([
	{
    label: "公告标题",
    prop: "title",
  },
	{
    label: "发布时间",
    prop: "create_time",
  },
]);
