<script setup>
import { ref, watch, onMounted } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import ScEditor from '@/components/scEditor/index.vue'
import NUpload from '@/components/nUpload/index.vue'
import NUploadMultiple from '@/components/nUploadMultiple/index.vue'

const props = defineProps({
	schema: {
		type: Array,
		required: true
	},
	formOptions: {
		type: Object,
		default: () => ({})
	}
})
const emit = defineEmits(['submit'])


const formRef = ref(null)
const model = ref({})
const rules = ref({})

const resetFields = () => {
	const schema = cloneDeep(props.schema)
	schema.forEach((item) => {
		model.value[item.prop] = item.value
	})
	formRef.value?.clearValidate()
}

const validate = () => {
	return new Promise((resolve, reject) => {
		formRef.value?.validate((valid) => {
			resolve(valid)
		})
	})
}

const handleSubmit = async (e) => {
	e.preventDefault()
	const flag = await validate()
	if (flag) {
		const payload = { model: cloneDeep(model.value), form: formRef.value }
		emit('submit', payload)
	}
}

const handleEditChange = (prop, html) => {
	model.value[prop] = html
}

const getModel = () => {
	return cloneDeep(model.value)
}

const init = () => {
	const schema = cloneDeep(props.schema)
	schema.forEach((item) => {
		const prop = item.prop
		model.value[prop] = item.value
		rules.value[prop] = item.rules
	})
}

onMounted(() => {
	init()
})

watch(
	props,
	() => {
		init()
	},
	{ deep: true }
)
defineExpose({ resetFields, validate, getModel })
</script>

<template>
	<el-form ref="formRef" :model="model" :validate-on-rule-change="false" :rules="rules" @submit="handleSubmit"
		v-bind="formOptions">
		<template v-for="(item, index) in schema" :key="index">
			<el-form-item :prop="item.prop" :label="item.label">
				<template v-if="item.type === 'editor'">
					<ScEditor v-model="model[item.prop]" :placeholder="item.placeholder"
						:custom-upload="(item.editorOptions?.customUpload)" v-bind="item.editorAttrs"
						@change="(html) => handleEditChange(item.prop, html)"></ScEditor>
				</template>
				<template v-if="item.type === 'upload'">
					<NUpload v-model="model[item.prop]" :custom-upload="item.customUpload"></NUpload>
				</template>
				<template v-if="item.type === 'upload-multiple'">
					<NUploadMultiple v-model="model[item.prop]" :custom-upload="item.customUpload" v-bind="item.attrs">
					</NUploadMultiple>
				</template>

				<template v-else>
					<component :is="`el-${item.type}`" v-model="model[item.prop]" :placeholder="item.placeholder"
						v-bind="item.attrs">
						<template v-if="item.children && item.children.length">
							<template v-for="(cItem, cIndex) in item.children" :key="cIndex">
								<component :is="`el-${cItem.type}`" v-bind="cItem" v-if="!cItem.text"></component>
								<component :is="`el-${cItem.type}`" v-bind="cItem" v-else>
									{{cItem.text}}
								</component>
							</template>
						</template>
					</component>
				</template>
			</el-form-item>
		</template>
		<el-form-item>
			<slot name="action" :form="formRef" :model="model"></slot>
		</el-form-item>
	</el-form>
</template>

<style scoped lang="scss">
</style>
<script>
export default {
	name: 'NForm'
}
</script>
