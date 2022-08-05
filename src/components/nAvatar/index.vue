<template>
	<NImage class="w-14 h-14 rounded-full" :src="props.src || defaultAvatar" fit="cover"></NImage>
</template>

<script setup>
import defaultAvatar from '/public/img/avatar3.gif'

const props = defineProps({
	src: {
		type: String,
		default:''
	}
})

</script>

<style scoped lang="scss">

</style>
