<template>
	<div class="">
		<NDrawerForm v-model:visible="isVisible" :title="currentTitle" :schema="actionSchema" :loading="loading"
			:formOptions="{ labelWidth: '100px' }" @submit="handleSubmit"></NDrawerForm>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getActionSchema } from './config/actionSchema'
import { userCreateApi, userEditApi } from '@/api/model/user'
import { usePageAction } from '@/hooks/usePageAction'

const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})

const { createData, updateData, loading } = usePageAction({
	createDataApi: userCreateApi,
	updateDataApi: userEditApi
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
		currentEditData = data
		const index = actionSchema.value.findIndex(it => it.prop === 'password')
		actionSchema.value.splice(index, 1)
		mergeData(data)
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
