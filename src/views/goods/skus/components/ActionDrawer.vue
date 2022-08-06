<template>
	<NDrawer
		v-model="isVisible" 
		:loading="loading"
		:title="currentTitle"
		@confirm="handleSubmit"
		@cancel="handleCancel"
	>
		<el-form
			ref="formRef"
			:model="formData"
			:rules="rules"
			label-width="80px"
			size="default"
		>
			<el-form-item label="规格名称" prop="name">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="order">
				<el-input-number 
					v-model="formData.order" 
					:min="0"
					:max="1000"
				></el-input-number>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-switch v-model="formData.status"
					:active-value="1" 
					:inactive-value="0"
					:min="0"
					:max="1000"
					/>
			</el-form-item>
			<el-form-item label="规格值" prop="default">
				<NEditTag v-model="skuValues" />
			</el-form-item>
		</el-form>
	</NDrawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { skuCreateApi, skuEditApi } from '@/api/model/skus'
import { notification } from '@/libs/elementPlus/index.js';

const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})


const isVisible = ref(false)
const currentTitle = ref('')

// 当前编辑对象 (新增状态为null)


const rules = {}
const formData = ref({
	name:'', 
	order: 0,
	status: 1,
	default: ''
})
const skuValues = ref([])
const loading = ref(false)
const open = ({ title, data }) => {
	currentTitle.value = title
	if (data) {
		formData.value = data
		skuValues.value = data.default.split(',')
	}
	isVisible.value = true
}

const handleSubmit = async () => {
	loading.value = true
	try {
		const params = {...formData.value, default: skuValues.value.join(',')}
		if (params.id) {
			await skuEditApi(params)
			isVisible.value = false
			notification({message: '编辑成功', type: 'success'})
			props.getListData && props.getListData()
		} else {
			await skuCreateApi(params)
			isVisible.value = false
			props.getListData && props.getListData()
			notification({message: '新增成功', type: 'success'})
		}
	}
	finally {
		loading.value = false
	}
}
const handleCancel = ()=>{
	isVisible.value = false
}
// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		formData.value = {
			name:'', 
			order: 0,
			status: 1,
			default: ''
		}
		skuValues.value = []
	}
})
defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
