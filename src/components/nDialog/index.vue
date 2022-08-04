<template>
	<el-dialog
		title="浏览"
		v-model="isVisible"
		width="30%">
			<img src="" alt="">
	</el-dialog>
</template>

<script setup>
import { ref } from 'vue'
const prop = defineProps({
	modelValue: {
		type:Boolean,
		default: false
	}
})

const isVisible = ref(false)

</script>

<style scoped lang="scss">

</style>
