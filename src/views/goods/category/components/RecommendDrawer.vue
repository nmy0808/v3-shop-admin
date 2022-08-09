<template>
	<nDrawer v-model="isVisible" :title="currentTitle" :loading="loading" @confirm="handleSubmit">
		<NTable v-if='isVisible' :options="tableOptions" :data="currentEditData" :dragSort="false" :loading="loading"
			table-layout="auto">
			<template #info="{ row }">
				<div class="flex items-center">
					<NAvatar :src="row.cover" class="rounded-2px"></NAvatar>
					<span class="ml-4">{{ row.name }}</span>
				</div>
			</template>
			<template #action="{ row }">
				<el-button type="primary" link size="small" @click="handleDelete(row)">删除</el-button>
			</template>
		</NTable>
		<template #footer>
			<el-button @click="handleSelectClick" type="success">选择</el-button>
			<el-button type="" @click="handleCancelClick" :loading="loading">关闭</el-button>
		</template>
		<NGoodsSelect ref="nGoodsSelectRef"></NGoodsSelect>
	</nDrawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getActionSchema } from './config/actionSchema'
import { categoryCreateApi, categoryEditApi } from '@/api/model/category'
import { categoryItemDeleteApi, categoryItemListApi, categoryItemSetApi } from '@/api/model/appCategoryItem'
import { usePageAction } from '@/hooks/usePageAction'
import { tableOptions } from './config/tableOptions'
import { confirm, notification } from '@/libs/elementPlus'
import NGoodsSelect from '@/components/nGoodsSelect/index.vue'
const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})
const emit = defineEmits(['refreshList'])
const { createData, updateData, loading, deleteData } = usePageAction({
	createDataApi: categoryCreateApi,
	updateDataApi: categoryEditApi,
	deleteDataApi: categoryItemDeleteApi
})

const isVisible = ref(false)


const actionSchema = ref([])
const currentTitle = ref('')

// 当前编辑对象 (新增状态为null)
const currentEditData = ref(null)

// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		currentEditData.value = null
	}
})
let params = null
const getListData = async () => {
	const { data } = await categoryItemListApi(params)
	currentEditData.value = data
	return data
}

const open = async ({ title, params: paramsTemp }) => {
	params = paramsTemp
	actionSchema.value = getActionSchema().value
	currentTitle.value = title
	await getListData()
	isVisible.value = true
}

const handleSubmit = async (model) => {
	if (currentEditData.value) {
		await updateData({
			params: { ...model, id: currentEditData.value.id },
			callback: () => {
				isVisible.value = false
				props.getListData && props.getListData()
			}
		})
	} else {
		await createData({
			params: model,
			callback: () => {
				isVisible.value = false
				props.getListData && props.getListData()
			}
		})
	}
}

const handleDelete = async (row) => {
	const flag = await confirm({ message: "确定删除?" });
	if (!flag) return;
	try {
		loading.value = true
		await categoryItemDeleteApi({ id: row.id })
		notification({ title: '删除完成', type: 'success' })
	}
	finally {
		await getListData()
		loading.value = false
	}
}

const handleCancelClick = () => {
	isVisible.value = false
}
const nGoodsSelectRef = ref(null)
const handleSelectClick = () => {
	nGoodsSelectRef.value.open(async (selectedList) => {
		loading.value = true
		try {
			// 选择商品并添加商品的回调
			await categoryItemSetApi({
				category_id: params.category_id,
				goods_ids: selectedList.map(it => it.id)
			})
			await getListData()
			notification({ message: '添加完成', type: 'success' })
		}
		finally {
			loading.value = false
		}
	})
}
const handleConfirmClick = () => { }
defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
