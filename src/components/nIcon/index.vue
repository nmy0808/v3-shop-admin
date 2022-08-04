<script setup>

const props = defineProps({
	icon: {
		type: String,
		default: ''
	}
})
</script>

<template>
  <div class="n-icon">
    <el-icon v-bind="$attrs">
      <component :is="`el-icon-${icon}`"></component>
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.n-icon {
  display: inline-block;
}
</style>
<script>
export default {
  name: 'NIcon'
}
</script>
