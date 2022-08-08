<template>
	<NContainer>
		<NActionHeader @refresh="getUserListData" >
			<template #left>
				<el-button type="primary" size="small" @click="handleCreate">新增</el-button>
				<el-button type="danger" size="small" @click="handleBatchDelete">删除</el-button>
			</template>
		</NActionHeader>
		<NTable table-layout="auto" ref="tableRef" :data="list" :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit"
			@selection-change="selectionChange">
			<!-- 规格值 -->
			<template #skus="{ row }">
				<el-tag v-for="(sku, index) in row.default.split(',')" :key="index" type="" size="small" effect="light">
					{{ sku }}
				</el-tag>
			</template>
			<!-- 状态 -->
			<template #status="{ row }">
				<el-switch v-model="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading" size="small"
					@click="handleStatusChange(row)" />
			</template>
			<template #action="{ row }">
				<el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
				<el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
			</template>
		</NTable>
		<ActionDrawer ref="actionDrawerRef" :getListData="getUserListData"></ActionDrawer>
	</NContainer>
</template>
<script>
import { ref } from 'vue'
import { tableOptions } from './config/tableOptions'
import { skuListApi, skuStatusApi, skuDeleteApi } from '@/api/model/skus'
import ActionDrawer from './components/ActionDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'

const useUserList = () => {
	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listDataApi: skuListApi,
			deleteDataApi: (row) => skuDeleteApi({ids: [row.id]}),
			statusDataApi: skuStatusApi
		})

	const handleStatusChange = async (row) => {
		statusData({
			params: { id: row.id, status: row.status },
			row
		})
	}



	return {
		list,
		loading,
		pageSearch,
		total,
		getUserListData: getListData,
		handleStatusChange,
		handleDelete: deleteData
	}
}

const useAction = () => {
	const actionDrawerRef = ref(null)

	const handleCreate = () => {
		actionDrawerRef.value.open({ title: '新增' })
	}
	const handleEdit = (data) => {
		actionDrawerRef.value.open({ title: '编辑', data })
	}
	return {
		actionDrawerRef,
		handleCreate,
		handleEdit,
	}
}

</script>

<script setup>

const {
	list,
	loading,
	pageSearch,
	total,
	handleStatusChange,
	getUserListData,
	handleDelete
} = useUserList()

getUserListData()

const { actionDrawerRef, handleCreate, handleEdit } = useAction()

let selected = []
const selectionChange = (list)=>{
	selected = list
}
const handleBatchDelete = ()=>{
	handleDelete({ids: selected.map(it=>it.id)})
}
</script>

<style scoped lang="scss">
</style>

