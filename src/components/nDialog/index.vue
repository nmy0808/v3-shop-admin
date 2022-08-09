<template>
	<el-dialog custom-class="c-pt-0" lock-scroll title="浏览" v-model="isVisible" width="1200px" top="3%"
		:close-on-click-modal="false" :close-on-press-escape="false" v-bind="$attrs">
		<slot name="header"></slot>
		<el-scrollbar height="69vh">
			<slot name="content"></slot>
		</el-scrollbar>
		<slot name="footer"></slot>
	</el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['update:modelValue'])
const isVisible = ref(false)

watch(() => props.modelValue, () => {
	isVisible.value = props.modelValue
})

watch(isVisible, () => {
	emit('update:modelValue', isVisible.value)
})

</script>

<style lang="scss" scoped>

</style>
