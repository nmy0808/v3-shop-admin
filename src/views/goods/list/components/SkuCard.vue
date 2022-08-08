<template>
	<div v-loading="loading">
		<div class="el-card mb-6" v-for="(item, index) in currentGoodsSkus" :key="item.id">
			<!-- sku -->
			<div class="p-4 py-4 bg-gray-200/80 dark:bg-black/30  ">
				<el-input class="w-70 m-0" size="small" v-model="item.name" @blur="handleSkuNameChange(item)"
					@keyup.enter="handleSkuNameChange(item)">
					<template #append>
						<div @click="handleOpenSelectSku(item)" class="px-20px h-100% cursor-pointer">
							<NIcon icon="more" color="black" class="mt-1 !dark:text-white"></NIcon>
						</div>
					</template>
				</el-input>
				<div class="float-right">
					<NIcon icon="top" color="black" class="cursor-pointer mt-4px"
						:class="{ 'opacity-60 cursor-not-allowed': index === 0 }" @click.stop="handleSkuItemTopSort(item, index)">
					</NIcon>
					<NIcon icon="bottom" color="black" class="cursor-pointer mt-4px mx-8px"
						:class="{ 'opacity-60 cursor-not-allowed': index >= currentGoodsSkus.length - 1 }"
						@click.stop="handleSkuItemBottomSort(item, index)">
					</NIcon>
					<NIcon icon="delete" color="black" class="cursor-pointer mt-4px" @click.stop="handleDeleteSkuItem(item)">
					</NIcon>
				</div>
			</div>
			<!-- 对应sku下参数 -->
			<div class="p-4 pb-0 flex flex-wrap" v-loading="loading">
				<template v-for="tagItem in item.goodsSkusCardValue" :key="tagItem.id">
					<el-input class="w-60 m-0 mb-4" size="small" v-model="tagItem.value"
						@blur="handleTagNameChange(tagItem, item)" @keyup.enter="handleTagNameChange(tagItem, item)">
					</el-input>
					<div class="w-10 pl-1">
						<NIcon icon="close" color="black" class="cursor-pointer mt-1" @click.stop="handleDeleteTag(tagItem)">
						</NIcon>
					</div>
				</template>
				<el-tag v-if="!item.isEdit" type="success" size="small" effect="light" class="w-30 h-9 mb-4"
					@click="handleAddClick(item)">+ 添加值</el-tag>
				<el-input v-if="item.isEdit" v-model="currentTag" ref="tagInputRef" class="w-30 h-9 mb-4" size="small"
					@blur="handleTagBlur" @keyup.enter="handleTagBlur"></el-input>
			</div>
		</div>
		<el-button type="success" size="small" @click="handleCreateSkuItem">+ 新增规格</el-button>
		<NSkusSelect ref="nSkusSelectRef"></NSkusSelect>
	</div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { goodsSkuValCreateApi, goodsSkuValDeleteApi, goodsSkuValEditApi } from '@/api/model/goodsSkusCardValue'
import { goodsSkuEditApi, goodsSkuSetApi, goodsSkuDeleteApi, goodsSkuSortApi, goodsSkuCreateApi } from '@/api/model/goodsSkusCard'
import cloneDeep from 'lodash/cloneDeep'
import { message } from '@/libs/elementPlus/index.js';
import NSkusSelect from '@/components/nSkusSelect/index.vue'

const props = defineProps({
	goodsId: {
		type: Number,
		default: null
	},
	goodsSkus: {
		type: Array,
		default: () => []
	}
})
const emit = defineEmits(['get-info-data'])
const currentGoodsSkus = ref([])
const currentSkuItem = ref(null) // 当前编辑的skuItem对象
const currentTag = ref('') 		// 当前tag的input的值
const tagInputRef = ref(null) // 当前tag上的input组件, 用于触发聚焦事件

const loading = ref(false)
// 点击添加值
const handleAddClick = (skuItem) => {
	currentSkuItem.value = skuItem
	currentSkuItem.value.isEdit = true
	nextTick(() => tagInputRef.value[0].focus()) // 输入框聚焦
}

// 取消聚焦
const handleTagBlur = async () => {
	const value = currentTag.value.trim()
	// 如果tag-input有值
	if (value) {
		try {
			loading.value = true
			const params = {}
			params.goods_skus_card_id = currentSkuItem.value.id
			params.name = currentSkuItem.value.name
			params.order = 50
			params.value = currentTag.value
			await goodsSkuValCreateApi(params)
			emit('get-info-data')
			message({ message: '添加完成' })
		}
		finally {
			loading.value = false
		}
	}
	currentSkuItem.value && (currentSkuItem.value.isEdit = false)
	currentSkuItem.value = null
	currentTag.value = ''
}

const handleDeleteTag = async (tagItem) => {
	const params = { id: tagItem.id }
	try {
		loading.value = true
		await goodsSkuValDeleteApi(params)
		emit('get-info-data')
		message({ message: '已删除' })
	}
	finally {
		loading.value = false
	}
}
// 添加规格
const handleCreateSkuItem = async () => {
	const order = currentGoodsSkus.value?.length > 0 
		? currentGoodsSkus.value[currentGoodsSkus.value.length - 1].order + 1
		: 50
	const params = {
		goods_id: props.goodsId,
		name: '规格名称',
		order,
		type: 0
	}
	try {
		loading.value = true
		await goodsSkuCreateApi(params)
		emit('get-info-data')
		message({ message: '新增规格完成' })
	}
	finally {
		loading.value = false
	}
}
// 删除sku-item
const handleDeleteSkuItem = async (skuItem) => {
	try {
		loading.value = true
		await goodsSkuDeleteApi({ id: skuItem.id })
		emit('get-info-data')
		message({ message: '已删除' })
	}
	finally {
		loading.value = false
	}
}

const handleSkuItemTopSort = async (skuItem, index) => {
	const newIndex = index - 1
	if (newIndex === -1) return
	const params = {}
	const skusList = cloneDeep(currentGoodsSkus.value)
	const item = skusList.splice(index, 1)[0]
	skusList.splice(newIndex, 0, item)
	params.sortdata = skusList.map((it, index) => {
		const obj = {}
		obj.id = it.id
		obj.order = index + 1
		return obj
	})
	try {
		loading.value = true
		await goodsSkuSortApi(params)
		emit('get-info-data')
		message({ message: '完成排序' })
	}
	finally {
		loading.value = false
	}
}
const handleSkuItemBottomSort = async (skuItem, index) => {
	const newIndex = index + 1
	if (newIndex >= currentGoodsSkus.value.length) return
	const params = {}
	const skusList = cloneDeep(currentGoodsSkus.value)
	const item = skusList.splice(index, 1)[0]
	skusList.splice(newIndex, 0, item)
	params.sortdata = skusList.map((it, index) => {
		const obj = {}
		obj.id = it.id
		obj.order = index + 1
		return obj
	})
	try {
		loading.value = true
		await goodsSkuSortApi(params)
		emit('get-info-data')
		message({ message: '完成排序' })
	}
	finally {
		loading.value = false
	}
}

// 修改sku-name
const handleSkuNameChange = async (skuItem) => {
	const originSkuItem = props.goodsSkus.find(it => it.id === skuItem.id)
	const oldName = originSkuItem.name
	const newName = skuItem.name
	if (oldName != newName) {
		const params = {}
		params.goods_id = skuItem.goods_id
		params.id = skuItem.id
		params.name = newName
		params.order = skuItem.order
		params.type = 0
		try {
			loading.value = true
			await goodsSkuEditApi(params)
			emit('get-info-data')
			message({ message: '完成修改' })
		}
		finally {
			loading.value = false
		}
	}
}

// 修改tag-name
const handleTagNameChange = async (tagItem, skuItem) => {
	const originSkuItem = props.goodsSkus.find(it => it.id === skuItem.id)
	const originTagItem = originSkuItem.goodsSkusCardValue.find(it => it.id === tagItem.id)
	const oldTagValue = originTagItem.value
	const newTagValue = tagItem.value
	// 如果当前值有改变, 才发出修改请求
	if (oldTagValue !== newTagValue) {
		const params = {}
		params.id = tagItem.id
		params.goods_skus_card_id = skuItem.id
		params.name = skuItem.name
		params.order = skuItem.order
		params.value = tagItem.value
		try {
			loading.value = true
			await goodsSkuValEditApi(params)
			emit('get-info-data')
			message({ message: '完成修改' })
		}
		finally {
			loading.value = false
		}
	}
}

const nSkusSelectRef = ref(null)

// 打开skus选择面板
const handleOpenSelectSku = (skuItem) => {
	nSkusSelectRef.value.open(async (params) => {
		params.id = skuItem.id
		await goodsSkuSetApi(params)
		emit('get-info-data')
		message({ message: '完成修改' })
	})
}

watch(() => props.goodsSkus, () => {
	currentGoodsSkus.value = cloneDeep(props.goodsSkus)
}, { immediate: true })


</script>

<style scoped lang="scss">
:deep(.el-input-group__append) {
	padding: 0;
}
</style>
