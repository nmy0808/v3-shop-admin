<template>
	<NDrawer v-model="isVisible"
		:loading="submitLoading"
		 @confirm="handleSubmit"
		 @cancel="handleCancel">
		<el-tree-v2 ref="treeRef"
			:loading="loading"
			:data="ruleList" 
			:props="defaultProps" 
			show-checkbox
			@check="handleCheck"
			:default-expanded-keys="defaultExpandedKeys"
			:check-strictly="false"
			:height="height" >
			<template #="{node, data}">
				<el-tag v-if="data.menu === 1" class="mr-2" size="small"  effect="light" 
					disable-transitions
				>菜单</el-tag>
				<el-tag v-else type="info" class="mr-2" size="small"  effect="light" 
					disable-transitions
				>权限</el-tag>
				<span>{{ data.name }}</span>
			</template>
			</el-tree-v2>
	</NDrawer>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { roleSetApi } from '@/api/model/role'
import { ruleListApi } from '@/api/model/rule'
import { notification } from '@/libs/elementPlus'
const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})

const height = computed(()=>{
	console.log('w')
	return window.innerHeight
})

const defaultProps = {
	value: 'id',
	children: 'child',
	label: 'name'
}
const loading = ref(false)
const submitLoading = ref(false)
const ruleList = ref([])
const defaultExpandedKeys = ref([])
const getRuleListData = async () => {
	loading.value = true
	const { data } = await ruleListApi()
	ruleList.value = data.list
	defaultExpandedKeys.value = data.list.map(it => it.id)
	loading.value = false
}

const isVisible = ref(false)

const currentTitle = ref('')

// 当前编辑对象
let currentEditData = null
// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		currentEditData = null
	}
})

const treeRef = ref(null)
let checkedKeys = []

const open = async ({ title, data }) => {
	currentTitle.value = title
	currentEditData = data
	await getRuleListData()
	isVisible.value = true
	setTimeout(()=>{
		checkedKeys = data.rules.map(it => it.id)
		treeRef.value.setCheckedKeys(checkedKeys)
	})
}

const handleCancel = () => {
	isVisible.value = false
}

const handleCheck = (data, info)=>{
	checkedKeys = info.checkedKeys
}
const handleSubmit = async () => {
	try {
		submitLoading.value = true
		await roleSetApi({id: currentEditData.id, rule_ids: checkedKeys})
		props.getListData && (await props.getListData())
		notification({ message: '修改完成', type: 'success'})
	}
	finally {
		submitLoading.value = false
		isVisible.value = false
	}

}

defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
