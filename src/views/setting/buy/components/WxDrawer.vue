<template>
	<div class="">
		<NDrawerForm v-model:visible="isVisible" :title="currentTitle" :schema="actionSchema" :loading="loading"
			:formOptions="{ labelWidth: '140px' }" @submit="handleSubmit"></NDrawerForm>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getWxSchema } from './config/actionSchema'
import { userCreateApi, userEditApi } from '@/api/model/user'
import { usePageAction } from '@/hooks/usePageAction'
import { notification } from '@/libs/elementPlus';

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
	actionSchema.value = getWxSchema().value
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
	notification({ message: '演示数据', type: 'success' })
	isVisible.value = false
	props.getListData && props.getListData()
}

defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
