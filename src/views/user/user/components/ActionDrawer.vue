<template>
	<div class="">
		<NDrawerForm v-model:visible="isVisible" :title="currentTitle" :schema="actionSchema"
			:formOptions="{ labelWidth: '100px' }" @submit="handleSubmit"></NDrawerForm>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getActionSchema } from './config/actionSchema'
import { userCreateApi, userEditApi } from '@/api/model/user'
import { notification } from '@/libs/elementPlus'

const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})

const isVisible = ref(false)
const mergeData = (data) => {
	actionSchema.value.forEach(item => {
		const prop = item.prop
		prop && (item.value = data[prop])
	})
}
const actionSchema = ref([])
const currentTitle = ref('')

// 当前编辑对象 (新增状态为null)
let currentEditData = null

watch(isVisible, () => {
	if (!isVisible.value) {
		currentEditData = null
	}
})

const open = ({ title, data }) => {
	actionSchema.value = getActionSchema().value
	currentTitle.value = title
	if (data) {
		currentEditData = data
		const index = actionSchema.value.findIndex(it=>it.prop === 'password')
		actionSchema.value.splice(index,1)
		mergeData(data)
	}
	isVisible.value = true
}

const loading = ref(false)

const handleSubmit = async (model) => {
	loading.value = true
	try {
		if (currentEditData) {
			await userEditApi({...model, id: currentEditData.id})
			notification({ message: '编辑完成', type: 'success' })
		} else {
			await userCreateApi(model)
			notification({ message: '新增成功', type: 'success' })
		}
		isVisible.value = false
		props.getListData && props.getListData()
	}
	finally {
		loading.value = false
	}

}
defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
