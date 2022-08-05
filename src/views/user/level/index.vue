<template>
	<NContainer>
		<NActionHeader @create="handleCreate" @refresh="getListData" />
		<NTable  table-layout="auto"	 ref="tableRef" :data="list" :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
			<!-- 状态 -->
			<template #status="{ row }">
				<el-switch v-model="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading"
					size="small"
					@click="handleStatusChange(row)" />
			</template>
			<template #action="{ row }">
				<el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
				<el-button type="danger" link size="small" @click="handleDelete({id:row.id})">删除</el-button>
			</template>
		</NTable>
		<ActionDrawer ref="actionDrawerRef" :getListData="getListData"></ActionDrawer>
	</NContainer>
</template>
<script>
import { ref } from 'vue'
import { tableOptions } from './config/tableOptions'
import { userLevelListApi, userLevelStatusApi, userLevelDeleteApi } from '@/api/model/userLevel'
import ActionDrawer from './components/ActionDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'

const useUserList = () => {


	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listDataApi: userLevelListApi, 
			deleteDataApi: userLevelDeleteApi,
			statusDataApi: userLevelStatusApi
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
		getListData,
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
	getListData,
	handleDelete
} = useUserList()

getListData()

const { actionDrawerRef, handleCreate, handleEdit } = useAction()

</script>

<style scoped lang="scss">
</style>

