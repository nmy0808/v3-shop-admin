<template>
	<div class="el-card mb-6" v-for="item in currentGoodsSkus" :key="item.id" v-loading="loading">
		<!-- sku -->
		<div class="p-4 py-4 bg-gray-200/80 dark:bg-black/30  ">
			<el-input class="w-70 m-0" size="small" v-model="item.name">
				<template #append>
					<NIcon icon="more" color="black" class="cursor-pointer mt-1 !dark:text-white"></NIcon>
				</template>
			</el-input>
		</div>
		<!-- 对应sku下参数 -->
		<div class="p-4 pb-0 flex flex-wrap">
			<template v-for="gItem in item.goodsSkusCardValue" :key="gItem.id">
				<el-input class="w-60 m-0 mr-4 mb-4" size="small" v-model="gItem.value">
					<template #append>
						<NIcon icon="close" color="black" class="cursor-pointer mt-1"></NIcon>
					</template>
				</el-input>
			</template>
			<el-tag v-if="!item.isEdit" type="danger" size="small" effect="dark" class="w-30 h-9" @click="handleAddClick(item)">+添加值</el-tag>
			<el-input v-if="item.isEdit" v-model="currentTag" ref="tagInputRef" class="w-30 h-9" size="small"
				@blur="handleTagBlur"
			></el-input>
		</div>
	</div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { goodsSkuValCreateApi } from '@/api/model/goodsSkusCardValue'
import cloneDeep from 'lodash/cloneDeep'
import { message } from '@/libs/elementPlus/index.js';
const props = defineProps({
	goodsSkus: {
		type: Array,
		default: () => []
	},
	loading:{
		type: Boolean,
		default: false
	}
})
const emit = defineEmits(['get-info-data'])
const currentGoodsSkus = ref([])
const currentSkuItem = ref(null) // 当前编辑的skuItem对象
const currentTag = ref('') 		// 当前tag的input的值
const tagInputRef = ref(null) // 当前tag上的input组件, 用于触发聚焦事件

// 点击添加值
const handleAddClick = (skuItem) => {
	currentSkuItem.value = skuItem
	currentSkuItem.value.isEdit = true
	nextTick(()=> tagInputRef.value[0].focus() ) // 输入框聚焦
}

// 取消聚焦
const handleTagBlur = async ()=>{
	const value =  currentTag.value.trim()
	// 如果tag-input有值
	if(value){
		const params = {}
		params.goods_skus_card_id = currentSkuItem.value.id
		params.name = currentSkuItem.value.name
		params.order = 50
		params.value = currentTag.value
		console.log(params)
		await goodsSkuValCreateApi(params)
		emit('get-info-data')
		message({message: '添加完成'})
	}
	currentSkuItem.value.isEdit = false
	currentSkuItem.value = null
	currentTag.value = ''
}

watch(() => props.goodsSkus, () => {
	currentGoodsSkus.value = cloneDeep(props.goodsSkus)
}, { immediate: true })


</script>

<style scoped lang="scss">
</style>
