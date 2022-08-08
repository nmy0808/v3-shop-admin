<template>
	<div class="">
		<NDrawer v-model="isVisible" :title="currentTitle" :loading="loading"
		 @cancel="isVisible = false"
		 @confirm="handleSubmit">
		 	<ScEditor v-model="content"
        :customUpload="customUpload"
      ></ScEditor>
		 </NDrawer>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { goodsEditApi } from '@/api/model/goods'
import { uploadImageApi } from "@/api/model/upload";
import { notification } from '@/libs/elementPlus';
import ScEditor from '@/components/scEditor/index.vue'
const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})

const isVisible = ref(false)
const loading = ref(false)

const currentTitle = ref('')

// 当前编辑对象 (新增状态为null)
let currentEditData = null
const content = ref('')
// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		currentEditData = null
	}
})

const open = ({ title, data }) => {
	isVisible.value = true
	currentTitle.value = title
	currentEditData = data
	content.value = data.content
}

const customUpload = async(file)=>{
	// 1.自定义上传请求
	// 2.返回图片url即可
	const { data } = await uploadImageApi({ img: [file] });
	return data.url;
}

const handleSubmit = async () => {
	try {
		loading.value = true
		await goodsEditApi({id: currentEditData.id , content: content.value})
		notification({message: '商品详情设置完成', type: 'success'})
	}
	finally {
		loading.value = false
		isVisible.value = false
		props.getListData && props.getListData()
	}
}

defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
