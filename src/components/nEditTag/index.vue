<template>
	<el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
		@close="handleClose(tag)">
		{{ tag }}
	</el-tag>
	<el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
		@keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
	<el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
		+ 添加值
	</el-button>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { ElInput } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
const props = defineProps({
	modelValue: {
		type: Array,
		default: () => []
	}
})
const emit = defineEmits(['update:modelValue'])
const inputValue = ref('')
const dynamicTags = ref([])
const inputVisible = ref(false)
const InputRef = ref()

watch(() => props.modelValue, () => {
	dynamicTags.value = cloneDeep(props.modelValue)
}, { immediate: true })



const handleClose = (tag) => {
	dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
	emit('update:modelValue', cloneDeep(dynamicTags.value))
}

const showInput = () => {
	inputVisible.value = true
	nextTick(() => {
		InputRef.value.input.focus()
	})
}

const handleInputConfirm = () => {
	const value = inputValue.value.trim()
	if (value) {
		dynamicTags.value.push(value)
		emit('update:modelValue', cloneDeep(dynamicTags.value))
	}
	inputVisible.value = false
	inputValue.value = ''
}
</script>
<style scoped lang="scss">
:deep(.el-input) {
	@apply inline-block;
}
</style>
