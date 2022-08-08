<template>
	<div>
		<NDrawer 
		 v-model="isVisible" :title="currentTitle" :loading="loading" @cancel="isVisible = false"
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
			<SkuCard v-if="formData.sku_type === 1" v-model:goodsSkus='goods_skus_card'
				:loading="loading"
				@get-info-data='getInfoData'
			></SkuCard>
			<!-- <div class="el-card">
					<div class=" p-4 pt-2 light:bg-gray-100 dark:bg-black/30  ">
						<el-input class="w-70 m-0" size="small">
							<template #append>
								<NIcon icon="more" color="black" class="cursor-pointer mt-1"></NIcon>
							</template>
						</el-input>
					</div>
					<div class="p-4 pb-0 flex flex-wrap">
						<el-input class="w-60 m-0 mr-2 mb-4" size="small">
							<template #append>
								<NIcon icon="close" color="black" class="cursor-pointer mt-1"></NIcon>
							</template>
						</el-input>
						<el-input class="w-60 m-0 mr-2 mb-4" size="small">
							<template #append>
								<NIcon icon="close" color="black" class="cursor-pointer mt-1"></NIcon>
							</template>
						</el-input>
						<el-input class="w-60 m-0 mr-2 mb-4" size="small">
							<template #append>
								<NIcon icon="close" color="black" class="cursor-pointer mt-1"></NIcon>
							</template>
						</el-input>
						<el-button class="h-9 flex items-center" size="small">+添加值</el-button>
					</div>
				</div> -->
		</NDrawer>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { goodsInfoApi, goodsSkuUpdateApi } from '@/api/model/goods'
import { uploadImageApi } from "@/api/model/upload";
import { notification } from '@/libs/elementPlus';
import SkuCard from './SkuCard.vue'
const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})

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
// 当前编辑对象 (新增状态为null)
let currentEditData = null
let currentId = null
// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		currentEditData = null
		goods_skus_card.value = []
	}
})
const open = async ({ title, data }) => {
	loading.value = true
	currentId = data.id
	await getInfoData()
	isVisible.value = true
	currentTitle.value = title
	loading.value = false
}

const getInfoData = () => {
	const params = {}
	params.id = currentId
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
		}
		currentEditData = result
	})
}


const customUpload = async (file) => {
	// 1.自定义上传请求
	// 2.返回图片url即可
	const { data } = await uploadImageApi({ img: [file] });
	return data.url;
}

const handleSubmit = async () => {
	try {
		loading.value = true
		await goodsSkuUpdateApi({ ...formData.value, id: currentEditData.id })
		notification({ message: '商品规格设置完成', type: 'success' })
	}
	finally {
		loading.value = false
		isVisible.value = false
		props.getListData && props.getListData()
	}
}

defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
