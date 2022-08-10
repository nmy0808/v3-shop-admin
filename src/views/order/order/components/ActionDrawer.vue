<template>
	<div class="">
		<NDrawerForm v-model:visible="isVisible" :title="currentTitle" :schema="actionSchema" :loading="loading"
			:formOptions="{ labelWidth: '100px' }" @submit="handleSubmit"></NDrawerForm>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getActionSchema } from './config/actionSchema'
import { orderShipApi } from '@/api/model/order'
import { usePageAction } from '@/hooks/usePageAction'
import { notification } from '@/libs/elementPlus';

const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})


const isVisible = ref(false)
const loading = ref(false)

const actionSchema = ref([])
const currentTitle = ref('')
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
	console.log(data, "daa")
	currentEditData = data
	if (data) {
		mergeData(data)
	}
	isVisible.value = true
}

const handleSubmit = async (model) => {
	try {
		loading.value = true
		await orderShipApi({ id: currentEditData.id, ...model })
		notification({
			message: '提交成功',
			type: 'success'
		})
		props.getListData && props.getListData()
	}
	finally {
		loading.value = false
		isVisible.value = false
	}
}

defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
