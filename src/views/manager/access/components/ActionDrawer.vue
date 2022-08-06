<template>
	<NDrawer v-model="isVisible" :title="currentTitle" :loading="loading" @cancel="handleCancel" @confirm="handleSubmit">
		<el-form ref="formRef" :model="formData" :rules="rules" :validate-on-rule-change="false" label-width="120px"
			size="default">
			<el-form-item label="上级菜单" prop="rule_id">
				<el-cascader v-model="formData.rule_id" :options="ruleList" :props="{
					checkStrictly: true,
					label: 'name',
					value: 'id',
					children: 'child'
				}" clearable placeholder="请选择上级菜单" />
			</el-form-item>
			<el-form-item label="菜单/规则" prop="menu">
				<el-radio-group v-model="formData.menu" @change="handleMenuChange">
					<el-radio :label="1" size="large" border>菜单</el-radio>
					<el-radio :label="0" size="large" border>规则</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="名称" prop="name">
				<el-input v-model="formData.name" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item v-if="formData.menu === 0" label="后端规则" prop="condition">
				<el-input v-model="formData.condition" placeholder="请输入后端规则"></el-input>
			</el-form-item>
			<el-form-item v-if="formData.menu === 0" label="请求方式" prop="method">
				<el-select v-model="formData.method" placeholder="请选择请求方式">
					<el-option v-for="item in fetchMethodOptions" :key="item.label" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="菜单图标" prop="icon" v-if="formData.menu === 1">
				<el-select v-model="formData.icon" filterable placeholder="请选择菜单图标">
					<el-option v-for="item in iconOptions" :key="item.label" :label="item.label" :value="item.value">
						<div>
								<el-icon size="22" class="mr-2">
									<Component :is="`el-icon-${item.label}`"></Component>
								</el-icon>
								{{item.label}}
						</div>
					</el-option>
				</el-select>
				<el-icon size="22" class="ml-2">
					<Component :is="`el-icon-${formData.icon}`"></Component>
				</el-icon>
			</el-form-item>
			<el-form-item v-if="formData.menu === 1" label="前端路由规则" prop="frontpath">
				<el-input v-model="formData.frontpath" placeholder="请输入前端路由规则"></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="order">
				<el-input-number v-model="formData.order" :min="0" :max="1000"></el-input-number>
			</el-form-item>
		</el-form>
	</NDrawer>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { ruleCreateApi, ruleUpdateApi } from '@/api/model/rule'
import * as elIcons from '@element-plus/icons-vue'
import { notification } from '@/libs/elementPlus/index.js';
import { menuRules, ruleRules } from './config/actionRule'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
	getListData: {
		type: Function,
		default: null
	},
	ruleList: { // 菜单列表 (级联)
		type: Array,
		default: () => []
	}
})
const iconOptions = ref([])
//统一注册el-icon图标
for (let icon in elIcons) {
	iconOptions.value.push({ label: icon, value: icon })
}

const formData = ref({
	rule_id: null,
	menu: 1,
	name: '',
	condition: '',
	method: '',
	status: 1,
	order: 0,
	icon: '', // （menu为1必填）
	frontpath: ''
})
const rules = computed(() => {
	if (formData.value.menu === 1) {
		return menuRules
	} else {
		return ruleRules
	}
})
const formRef = ref(null)
const fetchMethodOptions = [
	{ label: 'GET', value: 'GET' },
	{ label: 'POST', value: 'POST' },
	{ label: 'PUT', value: 'PUT' },
	{ label: 'DELETE', value: 'DELETE' }
]

const handleMenuChange = () => {
	formData.value = {
		...formData.value,
		rule_id: formData.value.rule_id,
		menu: formData.value.menu,
		name: '',
		condition: '',
		method: '',
		status: 1,
		order: 0,
		icon: '', // （menu为1必填）
		frontpath: ''
	}
		;['name', 'condition', 'method', 'order', 'frontpath'].forEach(prop => {
			formRef.value.clearValidate(prop)
		})
}

const isVisible = ref(false)
const loading = ref(false)
const currentTitle = ref('')

// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		formData.value = {
			rule_id: null,
			menu: 1,
			name: '',
			condition: '',
			method: '',
			status: 1,
			order: 0,
			icon: '', // （menu为1必填）
			frontpath: ''
		}
	}
})

const open = ({ title, data }) => {
	currentTitle.value = title
	if (data) {
		const tempData = { ...cloneDeep(data), child: undefined }
		formData.value = { ...formData.value, ...tempData }
	}
	isVisible.value = true
}
const handleCancel = () => {
	isVisible.value = false
}
const handleSubmit = async () => {
	formRef.value.validate(async valid => {
		if (!valid) return
		loading.value = true
		try {
			let rule_id = null
			if (Array.isArray(formData.value.rule_id)) {
				rule_id = [...formData.value.rule_id].pop()
			} else {
				rule_id = formData.value.rule_id
			}
			if (formData.value.id && formData.value.id !== 0) {
				await ruleUpdateApi({ ...formData.value, rule_id })
				notification({ message: '编辑成功', type: 'success' })
			} else {
				await ruleCreateApi({ ...formData.value, rule_id })
				notification({ message: '新增成功', type: 'success' })
			}
		}
		finally {
			loading.value = false
			isVisible.value = false
			props.getListData && props.getListData()
		}
	})
}

defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
