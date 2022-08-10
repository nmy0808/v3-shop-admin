import { ref } from 'vue'
export const searchSchema = ref([
	{
		type: 'input',
		label: '关键词',
		prop: 'title',
		placeholder: '要搜索的商品',
		value: '',
		attrs: {
			clearable: true,
			style: {
				width: '200px'
			}
		}
	}
])
