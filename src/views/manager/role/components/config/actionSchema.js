import { ref } from 'vue'
import { getRequiredRule } from '@/utils/rules'

export const getActionSchema = ()=>{
	 const actionSchema = ref([
		{
			type: 'input',
			label: '角色名称',
			prop: 'name',
			placeholder: '请角色名称',
			value: '',
			attrs: {
				clearable: true
			},
			rules: getRequiredRule('角色名称不能为空')
		},
		{
			type: 'input',
			label: '角色描述',
			prop: 'desc',
			placeholder: '请输入角色描述',
			value: '',
			attrs: {
				type: 'textarea',
				rows: "5"
			},
			rules: getRequiredRule('角色描述不能为空')
		},
		{
			type: 'switch',
			label: '状态',
			prop: 'status',
			value: 1,
			attrs: {
				activeValue: 1,
				inactiveValue: 0
			}
		},
	])

	return actionSchema
}


