<template>
	<div class="flex  duration-100" :class="{ isFold, 'search-header-container': !showFold }">
		<div class=" flex justify-between flex-1 flex-wrap mr-8 items-start">
			<NForm ref="nFormRef" :schema="schema" :form-options="formOptions"></NForm>
		</div>
		<div class="flex flex-shrink-0 justify-end w-190px ">
			<el-button type="" @click="handleReset" size="small" v-if="showResetBtn">重置</el-button>
			<el-button type="primary" @click="handleSearch" size="small">搜索</el-button>
			<div v-if="!showFold" class="flex justify-center ml-3 mt-2 color-primary cursor-pointer select-none" @click="toggle">
				{{ isFold ? '展开' : '收起' }}
				<NIcon class="mt-2px ml-1px" :icon="isFold ? 'ArrowDownBold' : 'ArrowUpBold'" color="#409EFF"></NIcon>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	showFold: {
		type: Boolean,
		default: false
	},
	showResetBtn: {
		type: Boolean,
		default: true
	},
	schema: {
		type: Array,
		default: () => []
	},
	formOptions: {
		type: Object,
		default: ()=> ({
			size: 'small',
			inline: true,
		})
	}
})
const emit = defineEmits(['search'])

const isFold = ref(true)

const toggle = () => {
	isFold.value = !isFold.value
}
const nFormRef = ref(null)

const handleSearch = async () => {
	const valid = await nFormRef.value.validate()
	if (valid) {
		const model = nFormRef.value.getModel()
		emit('search', model)
	}
}
const handleReset = () => {
	nFormRef.value.resetFields()
}
</script>

<style scoped lang="scss">
.search-header-container {
	height: 88px;
}

.isFold {
	height: 40px;
	overflow: hidden;
}
</style>
