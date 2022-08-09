<template>
	<div>
		<NDrawer size="70%" v-model="isVisible" :title="currentTitle" :loading="loading" @cancel="isVisible = false"
			@confirm="handleSubmit">
			<el-form ref="formRef" :model="formData" label-width="80px">
				<el-form-item label="规格类型" prop="name">
					<el-radio-group v-model="formData.sku_type">
						<el-radio :label="0" border>单规格</el-radio>
						<el-radio :label="1" border>多规格</el-radio>
					</el-radio-group>
				</el-form-item>
				<!-- 单规格 -->
				<template v-if="formData.sku_type === 0">
					<el-form-item label="市场价格" prop="password">
						<el-input-number v-model="formData.sku_value.oprice" :precision="2"></el-input-number>
						<span class="ml-2">元</span>
					</el-form-item>
					<el-form-item label="销售价格" prop="password">
						<el-input-number v-model="formData.sku_value.pprice" :precision="2"></el-input-number>
						<span class="ml-2">元</span>
					</el-form-item>
					<el-form-item label="成本价格" prop="password">
						<el-input-number v-model="formData.sku_value.cprice" :precision="2"></el-input-number>
						<span class="ml-2">元</span>
					</el-form-item>
					<el-form-item label="商品重量" prop="password">
						<el-input-number v-model="formData.sku_value.weight" :precision="2"></el-input-number>
						<span class="ml-2">公斤</span>
					</el-form-item>
					<el-form-item label="商品体积" prop="password">
						<el-input-number v-model="formData.sku_value.volume" :precision="2"></el-input-number>
						<span class="ml-2">立方米</span>
					</el-form-item>
				</template>
			</el-form>
			<!-- 多规格 -->
			<SkuCard v-if="formData.sku_type === 1" v-model:goodsSkus='goods_skus_card' @get-info-data='getInfoData'
				:goodsId="currentId"></SkuCard>
			<SkuTable class="mt-6" ref="skuTableRef" :goodsSkusCard="goods_skus_card" :goodsSkus="goodsSkus"></SkuTable>
		</NDrawer>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { goodsInfoApi, goodsSkuUpdateApi } from '@/api/model/goods'
import { notification } from '@/libs/elementPlus';
import SkuCard from './SkuCard.vue'
import SkuTable from './SkuTable.vue'
import cloneDeep from 'lodash/cloneDeep'
import { cartesianProductOf } from '@/utils/sku';
const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})
const emit = defineEmits(['move'])
const isVisible = ref(false)
const loading = ref(false)

const currentTitle = ref('')
const formData = ref({
	sku_type: 0,  //规格类型：0单规格 1多规格
	sku_value: {
		oprice: 0,  // 市场价格
		pprice: 0, 	// 销售价格
		cprice: 0,  // 成本价格
		weight: 0, 	// 商品重量
		volume: 0,  // 商品体积
	},
	goodsSkus: [
		{
			skus: [
				// sku 组合
				{
					goods_skus_card_id: "428",
					name: "尺寸",
					value: "XL",
					order: 50,
					id: "1202",
					text: "XL"
				},
				// ...
			],
			image: '',
			oprice: 0,  // 市场价格
			pprice: 0, 	// 销售价格
			cprice: 0,  // 成本价格
			weight: 0, 	// 商品重量
			volume: 0,  // 商品体积
			stock: 0,   // 库存
			code: '',
			goods_id: null
		}
	]
})
// 规格
const goods_skus_card = ref([])
const goodsSkus = ref([])
// 当前编辑对象 (新增状态为null)
let currentEditData = null
let currentId = ref(null)
// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		currentEditData = null
		goods_skus_card.value = []
	}
})

const open = async ({ title, data }) => {
	loading.value = true
	currentId.value = data.id
	await getInfoData()
	isVisible.value = true
	currentTitle.value = title
	loading.value = false
}

const getInfoData = () => {
	const params = {}
	params.id = currentId.value
	// 根据id获取商品资料
	goodsInfoApi(params).then(({ data: result }) => {
		const sku_type = result.sku_type
		formData.value.sku_type = result.sku_type
		// 规格类型：0单规格
		if (sku_type === 0) {
			formData.value.sku_value = result.sku_value || {}
		} else {
			// 规格类型：1多规格
			// sku 规格
			goods_skus_card.value = result.goodsSkusCard
			goodsSkus.value = getGoodsSkus(goods_skus_card.value, result.goodsSkus)
		}
		currentEditData = result
	})
}

const skuTableRef = ref(null)

const handleSubmit = async () => {
	try {
		loading.value = true
		await goodsSkuUpdateApi({
			...formData.value, id: currentEditData.id,
			goodsSkus: skuTableRef.value.getData()
		})
		notification({ message: '商品规格设置完成', type: 'success' })
	}
	finally {
		loading.value = false
		isVisible.value = false
		props.getListData && props.getListData()
	}
}

const getGoodsSkus = (goodsSkusCard, goodsSkus) => {
	const goodsSkusCopy = []
	cloneDeep(goodsSkus).forEach(item => {
		item._ids = Object.values(item.skus).map(it => it.id).join(',')
		goodsSkusCopy.push(item)
	})
	const goodsSkusCardCopy = cloneDeep(goodsSkusCard)
	const skus = goodsSkusCardCopy.map(it => [...it.goodsSkusCardValue]).filter(it => it.length > 0)

	const values = cartesianProductOf(...skus)
	const result = values.map(item => {
		const _ids = item.map(it => it.id).join(',')
		if (_ids) {
			const target = goodsSkusCopy.find(it => it._ids === _ids)
			if (target) {
				target?._ids && (delete target['_ids'])
				target.skus = item
				return target
			}
		}
		const obj = {}
		// obj.id = 
		obj.image = ""
		obj._ids = _ids
		obj.pprice = 0
		obj.oprice = 0
		obj.cprice = 0
		obj.stock = 0
		obj.volume = 0
		obj.weight = 0
		obj.code = ""
		obj.goods_id = currentId.value
		obj.skus = item
		return obj
	})
	return result
}


const getAllSkus = () => {
	return goodsSkus.value
}

defineExpose({
	open,
	getGoodsSkus: getAllSkus,
	refreshGoodsSkus: getGoodsSkus
})
</script>

<style scoped lang="scss">
</style>
