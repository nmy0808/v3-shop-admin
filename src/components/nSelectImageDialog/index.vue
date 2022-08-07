<template>
	<NDialog v-model="visible">
		<template #content>
			<NImageSelect ref="selectImage" :imagePageLimit="6" isSelect multiple @select="handleSelectImage"></NImageSelect>
		</template>
		<template #footer>
			<div class="pt-10 flex items-center justify-end bg-white">
				<el-button type="" @click="visible = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</template>
	</NDialog>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
})
// const emit = defineEmits(['update:modelValue'])
const visible = ref(false)

const selectedImgs = ref([])

let callBack = null

const open = (cb)=>{
	visible.value = true
	callBack = cb
}

const confirm = ()=> {
	callBack && callBack([...selectedImgs.value])
	visible.value = false
}

const handleSelectImage = (imgs) => {
	selectedImgs.value = imgs
}

const selectImage = ref(null)
watch(visible, ()=>{
	!visible.value && selectImage.value.clearSelected()
})

defineExpose({ open })
</script>

<style scoped lang="scss">
</style>
