import { ref } from 'vue'
import { goodsListApi } from '@/api/model/goods'
import { uploadImageApi } from '@/api/model/upload'
import { getRequiredRule, usernameRule, nicknameRule, passwordRule, emailRule, phoneRule } from '@/utils/rules'

export const getActionSchema = ()=>{
	 const actionSchema = ref([
		{
			type: 'input',
			label: '商品名称',
			prop: 'title',
			placeholder: '请输入商品名称, 不能超过60个字符',
			value: '',
			attrs: {
				clearable: true, 
				maxLength: 60
			},
			rules: usernameRule
		},
		{
			type: 'upload',
			label: '封面',
			prop: 'cover',
			value: '',
			customUpload: async (file) => {
				// 1.自定义上传请求
				// 2.返回图片url即可
				const {data} =await uploadImageApi({img: [file]})
				return data.url
			}
		},
		{
			type: 'select',
			label: '商品分类',
			prop: 'category_id',
			placeholder: '请选择商品分类',
			value: '',
			attrs: {
				clearable: true
			},
			children: [
			],
			rules: nicknameRule
		},

		{
			type: 'input',
			label: '商品描述',
			prop: 'desc',
			placeholder: '请输入商品描述',
			value: null,
			attrs: {
				clearable: true,
				type: 'textarea',
				rows: 3
			},
			rules: getRequiredRule('请输入商品描述')
		},
		{
			type: 'input',
			label: '商品单位',
			prop: 'unit',
			placeholder: '请输入商品单位',
			value: '',
			attrs: {
				clearable: true
			},
			rules: getRequiredRule('请输入商品单位')
		},
		{
			type: 'input-number',
			label: '总库存',
			prop: 'stock',
			value: 0,
			attrs: {
				clearable: true
			},
			
		},
		{
			type: 'input-number',
			label: '库存预警',
			prop: 'min_stock',
			value: 0,
			attrs: {
				clearable: true
			},
			
		},
		{
			type: 'input-number',
			label: '最低销售价',
			prop: 'min_price',
			value: 0,
			attrs: {
				clearable: true
			},
			
		},
		{
			type: 'input-number',
			label: '最低原价',
			prop: 'min_oprice',
			value: 0,
			attrs: {
				clearable: true
			},
			
		},
		{
			type: 'switch',
			label: '库存显示',
			prop: 'stock_display',
			value: 1,
			attrs: {
				activeValue: 1,
				inactiveValue: 0
			}
		},
		{
			type: 'switch',
			label: '是否上架(上架/仓库)',
			prop: 'status',
			value: 1,
			attrs: {
				activeValue: 1,
				inactiveValue: 0
			}
		},
	])

// 获取商品分类
const getGoodsListData = async () => {
	const { data } = await goodsListApi({ page: 1 })
	actionSchema.value.find(it=>it.prop === 'category_id').children = data.cates.map(it => {
		return {
			type: 'option',
			value: it.id,
			label: it.name
		}
	})
}
getGoodsListData()
	return actionSchema
}


