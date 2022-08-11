import { ref } from 'vue'
import { expressCompanyListApi } from '@/api/model/order'
import { getRequiredRule, usernameRule, nicknameRule, passwordRule, emailRule, phoneRule } from '@/utils/rules'

export const getActionSchema = ()=>{
	 const actionSchema = ref([
		{
			type: 'input',
			label: '快递单号',
			prop: 'express_no',
			placeholder: '请输入快递单号',
			value: '',
			attrs: {
				clearable: true
			},
			rules: getRequiredRule('必须填写快递单号')
		},
		{
			type: 'select',
			label: '快递公司',
			prop: 'express_company',
			placeholder: '请选择快递公司',
			value: null,
			attrs: {
				clearable: true
			},
			children: [],
			rules: getRequiredRule('请选择快递公司')
		},
	])

		// 获取会员等级列表数据
	const getUserLevelListData = async () => {
			const { data } = await expressCompanyListApi({ page: 1 })
			actionSchema.value.find(it => it.prop === 'express_company').children = data.list.map(it => {
				return {
					type: 'option',
					value: it.id,
					label: it.name
				}
			})
		}
	getUserLevelListData()
	return actionSchema
}


