import { ref } from 'vue'
import { userLevelListApi } from '@/api/model/userLevel'
export const searchSchema = ref([
	{
		type: 'input',
		label: '关键词',
		prop: 'keyword',
		placeholder: '管理员昵称',
		value: '',
		attrs: {
			clearable: true,
			style: {
				width: '300px'
			}
		}
	}
])
