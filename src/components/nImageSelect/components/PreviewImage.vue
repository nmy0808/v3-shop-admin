<template>
	<div class="preview" v-if="modelValue" @click="emit('update:modelValue', false)">
		<el-image class="preview-image" fit="contain" v-bind="$attrs"></el-image>
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type:Boolean,
		default: false
	}
})
const emit = defineEmits(['update:modelValue'])

</script>

<style scoped lang="scss">
.preview{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0,0,0,0.1);
	z-index: 1;
}
.preview-image {
	width: 800px;
	height: 500px;
}
</style>
