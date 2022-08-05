import { ref } from 'vue'
import { userLevelListApi } from '@/api/model/userLevel'
export const searchSchema = ref([
	{
		type: 'input',
		label: '关键词',
		prop: 'keyword',
		placeholder: '手机号/邮箱/会员昵称',
		value: '',
		attrs: {
			clearable: true,
			style: {
				width: '200px'
			}
		}
	},
	{
		type: 'select',
		label: '会员等级',
		prop: 'user_level_id',
		placeholder: '请选择会员等级',
		value: '',
		attrs: {
			clearable: true
		},
		children: [
			
		]
	},
])
// 获取会员等级列表数据
const getUserLevelListData = async () => {
	const { data } = await userLevelListApi({ page: 1 })
	searchSchema.value[1].children = data.list.map(it => {
		return {
			type: 'option',
			value: it.id,
			label: it.name
		}
	})
}
getUserLevelListData()