<template>
	<NContainer>
		<NActionHeader @create="handleCreate" @refresh="getUserListData" />
		<NTable  table-layout="auto"	 ref="tableRef" :data="list" :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
			<!-- 状态 -->
			<template #status="{ row }">
				<el-switch v-model="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading"
					size="small"
					@click="handleStatusChange(row)" />
			</template>
			<template #action="{ row }">
				<el-button type="primary" link size="small" @click="handlePermission(row)">配置权限</el-button>
				<el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
				<el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
			</template>
		</NTable>
		<ActionDrawer ref="actionDrawerRef" :getListData="getUserListData"></ActionDrawer>
		<SetPermissionDrawer ref="setPermissionDrawerRef"
		 :getListData="getUserListData"></SetPermissionDrawer>
	</NContainer>
</template>
<script>
import { ref } from 'vue'
import { tableOptions } from './config/tableOptions'
import { roleListApi, roleStatusApi, roleDeleteApi } from '@/api/model/role'
import ActionDrawer from './components/ActionDrawer.vue'
import SetPermissionDrawer from './components/SetPermissionDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'

const useRoleList = () => {

	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listDataApi: roleListApi, 
			deleteDataApi: roleDeleteApi,
			statusDataApi: roleStatusApi
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
	const setPermissionDrawerRef = ref(null)

	const handleCreate = () => {
		actionDrawerRef.value.open({ title: '新增' })
	}
	const handleEdit = (data) => {
		actionDrawerRef.value.open({ title: '编辑', data })
	}
	const handlePermission = (data) => { 
		setPermissionDrawerRef.value.open({ title: '配置权限', data })
	}

	return {
		actionDrawerRef,
		setPermissionDrawerRef,
		handleCreate,
		handleEdit,
		handlePermission
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
} = useRoleList()

getUserListData()

const { actionDrawerRef, setPermissionDrawerRef, handleCreate, handleEdit, handlePermission } = useAction()

</script>

<style scoped lang="scss">
</style>

