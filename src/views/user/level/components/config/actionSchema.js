import { ref } from 'vue'
import { levelNameRule } from '@/utils/rules'

export const getActionSchema = ()=>{
	 const actionSchema = ref([
		{
			type: 'input',
			label: '等级名称',
			prop: 'name',
			placeholder: '请输入等级名称',
			value: '',
			attrs: {
				clearable: true
			},
			rules: levelNameRule
		},
		{
			type: 'input-number',
			label: '等级权重',
			prop: 'level',
			value: 0,
			attrs: {
				clearable: true,
				min: 0,
				max: 1000
			}
		},
		{
			type: 'switch',
			label: '是否启用',
			prop: 'status',
			value: 1,
			attrs: {
				activeValue: 1,
				inactiveValue: 0
			}
		},
		{
			type: 'input-number',
			label: '累计消费升级 (元)',
			prop: 'max_price',
			value: 0,
			attrs: {
				precision: 2,
				min: 0
			}
		},
		{
			type: 'input-number',
			label: '累计次数升级 (次)',
			prop: 'max_times',
			value: 0,
			attrs: {
				precision: 2,
				min: 0
			}
		},
		{
			type: 'input-number',
			label: '折扣率 (%)',
			prop: 'discount',
			value: 0,
			attrs: {
				precision: 2,
				min: 0,
				max: 100
			}
		},
	])

		// 获取会员等级列表数据
	// const getUserLevelListData = async () => {
	// 		const { data } = await userLevelListApi({ page: 1 })
	// 		actionSchema.value.find(it => it.prop === 'user_level_id').children = data.list.map(it => {
	// 			return {
	// 				type: 'option',
	// 				value: it.id,
	// 				label: it.name
	// 			}
	// 		})
	// 	}
	// getUserLevelListData()
	return actionSchema
}


