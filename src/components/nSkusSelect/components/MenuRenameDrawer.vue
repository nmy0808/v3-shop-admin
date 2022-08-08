<template>
	<NDrawerForm v-model:visible="visible" :schema="schema" :loading="loading" :formOptions="{ labelWidth: '100px' }"
		@submit="submit"></NDrawerForm>
</template>

<script setup>
import { ref, watch } from 'vue'
import { updateImageMenuApi, createImageMenuApi } from '@/api/model/imageClass'
import NDrawerForm from '@/components/nDrawerForm/index.vue'
import { notification } from '@/libs/elementPlus/index.js';


const emit = defineEmits(['submit'])
const visible = ref(false)
const loading = ref(false)

const schema = ref([
	{
		type: 'input',
		label: '相册名称',
		prop: 'name',
		value: '',
		placeholder: '请填写相册名称',
		attrs: {
			clearable: true
		},
		rules: [
			{
				trigger: 'blur',
				required: true,
				message: '请填写相册名称'
			}
		]
	},
	{
		type: 'input-number',
		label: '排序',
		prop: 'order',
		value: 0,
		attrs: {
			min: 0,
			max: 10000
		},
		rules: [
			{
				trigger: 'blur',
				required: true,
				message: '必须填写排序'
			}
		]
	},
])
let id = null
const open = ({ data }) => {
	id = data?.id || null
	schema.value[0].value = data?.name || ''
	schema.value[1].value = data?.order || 0
	visible.value = true
}
const submit = async (model) => {
	try {
		loading.value = true
		if (id) {
			// await updateImageMenuApi({...model, id})
			notification({ message: '演示数据', type: 'success' })
		} else {
			await createImageMenuApi({ ...model })
			notification({ message: '新增成功', type: 'success' })
		}
		visible.value = false
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
