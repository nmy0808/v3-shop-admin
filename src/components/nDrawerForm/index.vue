<template>
	<NDrawer v-model="drawerVisible" :loading="loading" @cancel="handleCancel" @confirm="handleConfirmClick">
		<NForm ref="nFormRef" :schema="schema" :form-options="formOptions" >
		</NForm>
	</NDrawer>
</template>

<script setup>
import { ref, watch } from 'vue';
import NDrawer from '@/components/nDrawer/index.vue'
import NForm from '@/components/nForm/index.vue'
const props = defineProps({
	visible: {
		type: Boolean,
		default: false
	},
	schema: {
		type: Array,
		default: () => ([])
	},
	formOptions: {
		type: Object,
		default: () => ({})
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(['update:visible', 'confirm', 'cancel', 'submit'])

const drawerVisible = ref(false);
const nFormRef = ref(null)

watch(() => props.visible, () => {
	if (props.visible === false) {
		nFormRef.value && nFormRef.value.resetFields()
	}
	drawerVisible.value = props.visible
}, { immediate: true })

watch(drawerVisible, () => {
	emit('update:visible', drawerVisible.value)
})

const handleCancel = () => {
	emit('cancel', false)
	emit('update:visible', false)
}
const handleConfirmClick = async () => {
	const valid = await nFormRef.value.validate()
	valid && emit('submit', nFormRef.value.getModel())
}

</script>

<style scoped lang="scss">
</style>
