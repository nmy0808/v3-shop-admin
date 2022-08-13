<template>
	<el-image v-bind="$attrs" >
		<template #placeholder>
			<slot name="placeholder">
				<div class="placeholder text-12px 
					bg-gray-100
					dark:(bg-black/6 )
				">加载中...</div>
			</slot>
		</template>
	</el-image>
	
</template>

<script setup>
</script>

<style scoped lang="scss">
.placeholder {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	// background: #f7f9fe;
	color: var(--el-color-primary);
	// opacity: 0.3;
}
</style>
