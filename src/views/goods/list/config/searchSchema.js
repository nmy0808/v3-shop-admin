import { ref } from 'vue'
import { goodsListApi } from '@/api/model/goods'
export const searchSchema = ref([
	{
		type: 'input',
		label: '商品名称',
		prop: 'title',
		placeholder: '搜索商品名称',
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
		label: '商品分类',
		prop: 'category_id',
		placeholder: '请选择商品分类',
		value: '',
		attrs: {
			clearable: true
		},
		children: [
		]
	},
])
// 获取商品分类
const getGoodsListData = async () => {
	const { data } = await goodsListApi({ page: 1 })
	searchSchema.value[1].children = data.cates.map(it => {
		return {
			type: 'option',
			value: it.id,
			label: it.name
		}
	})
}
getGoodsListData()