<template>
	<div class="flex justify-between mb-6">
		<div>
			<slot name="left">
				<el-button type="primary" size="small" @click="emit('create')">新增</el-button>
			</slot>
		</div>
		<div>
			<slot name="right">
				<el-button size="small" icon="el-icon-refresh" @click="emit('refresh')"></el-button>
			</slot>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(['create', 'refresh'])
</script>

<style scoped lang="scss">

</style>
