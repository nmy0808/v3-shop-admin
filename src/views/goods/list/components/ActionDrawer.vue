<template>
	<div class="">
		<NDrawerForm v-model:visible="isVisible" :title="currentTitle" :schema="actionSchema" :loading="loading"
			:formOptions="{ labelWidth: '160px' }" @submit="handleSubmit"></NDrawerForm>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getActionSchema } from './config/actionSchema'
import { goodsCreateApi, goodsEditApi } from '@/api/model/goods'
import { usePageAction } from '@/hooks/usePageAction'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})

const { createData, updateData, loading } = usePageAction({
	createDataApi: goodsCreateApi,
	updateDataApi: goodsEditApi
})

const isVisible = ref(false)


const actionSchema = ref([])
const currentTitle = ref('')

// 当前编辑对象 (新增状态为null)
let currentEditData = null

// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		currentEditData = null
	}
})

const mergeData = (data) => {
	actionSchema.value.forEach(item => {
		const prop = item.prop
		prop && (item.value = data[prop])
	})
}

const open = ({ title, data }) => {
	actionSchema.value = getActionSchema().value
	currentTitle.value = title
	if (data) {
		const dataCopy = cloneDeep(data)
		dataCopy.min_price = parseFloat(dataCopy.min_price)
		dataCopy.min_oprice = parseFloat(dataCopy.min_oprice)
		currentEditData = dataCopy
		mergeData(dataCopy)
	}
	isVisible.value = true
}

const handleSubmit = async (model) => {
	if (currentEditData) {
		await updateData({
			params: { ...model, id: currentEditData.id },
			callback: () => {
				isVisible.value = false
				props.getListData && props.getListData()
			}
		})
	} else {
		await createData({
			params: model,
			callback: () => {
				isVisible.value = false
				props.getListData && props.getListData()
			}
		})
	}
}

defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
