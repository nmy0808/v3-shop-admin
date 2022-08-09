<template>
	<el-drawer :size="size" lock-scroll destroy-on-close :close-on-press-escape="false"  :close-on-click-modal="false"
		v-model="isVisible" :direction="direction" :before-close="handleBeforeClose" v-bind="$attrs">
		<el-scrollbar>
			<el-main v-loading="loading">
				<!-- 内容部分 -->
				<slot></slot>
				<!--  -->
			</el-main>
		</el-scrollbar>
		<template #footer>
			<slot name="footer">
				<div style="flex: auto" v-if="showActionBtn">
				<el-button @click="handleCancelClick" v-if="showCancelBtn">取消</el-button>
				<el-button type="primary" @click="handleConfirmClick" :loading="loading" v-if="showConfirmBtn">
					{{ confirmBtnText }}</el-button>
			</div>
			</slot>
		</template>
	</el-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	direction: {
		type: String,
		default: 'rtl'
	},
	size: {
		type: String,
		default: '40%'
	},
	beforeClose: {
		type: Function,
		default: (done) => done()
	},
	loading: {
		type: Boolean,
		default: false
	},
	showConfirmBtn: {
		type: Boolean,
		default: true
	},
	showCancelBtn: {
		type: Boolean,
		default: true
	},
	showActionBtn: {
		type: Boolean,
		default: true
	},
	confirmBtnText: {
		type: String,
		default: '确定'
	},
})

const isVisible = ref(false)
const emit = defineEmits(['confirm', 'cancel'])

watch(() => props.modelValue, () => {
	isVisible.value = props.modelValue
}, { immediate: true })

const handleBeforeClose = (done) => {
	props.beforeClose(done)
};
const handleCancelClick = () => {
	emit('cancel')
}
const handleConfirmClick = () => {
	emit('confirm')
}

</script>

<style scoped lang="scss">
</style>
