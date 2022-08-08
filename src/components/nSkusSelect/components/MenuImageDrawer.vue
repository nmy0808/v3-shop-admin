<template>
	<NDrawer v-model="visible" title="新增图片" :loading="loading" @confirm="handleCancel" :showActionBtn="true"
		confirmBtnText="关闭"
		:showCancelBtn="false"
		:showConfirmBtn="true"
		>
		<NUploadMultiple v-model="imageUrls" :max-num="5"
			:custom-upload="customUpload"
			@upload-success="handleUploadSuccess"
		></NUploadMultiple>
	</NDrawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import NDrawer from '@/components/nDrawer/index.vue'
import NUploadMultiple from '@/components/nUploadMultiple/index.vue'
import { notification } from '@/libs/elementPlus/index.js';
import { uploadImageApi } from '@/api/model/image'
const props = defineProps({
	getData:{
		type: Function,
		default: null
	}
})
const emit = defineEmits(['submit'])
const visible = ref(false)
const loading = ref(false)

let image_class_id = null
const imageUrls = ref([])
const open = (id) => {
	image_class_id = id
	visible.value = true
}
const customUpload = async (file)=>{
	const { data } = await uploadImageApi({image_class_id, img: file})
	return data.url
}
const handleCancel = async () => {
	visible.value = false
}
const handleUploadSuccess = async()=>{
	notification({message:'上传成功', type:'success'})
	props.getData && await props.getData()
}
defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
