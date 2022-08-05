<template>
	<NContainer>
		<NSearchHeader :schema="searchSchema" :showFold="true" @search="handleSearch"></NSearchHeader>
		<NActionHeader @create="handleCreate" @refresh="getUserListData" />
		<NTable border ref="tableRef" :data="list" :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
			<!-- 会员 -->
			<template #user="{ row }">
				<div class="flex">
					<NAvatar :src="row.avatar"></NAvatar>
					<div class="ml-4">
						<div class="text-base font-semibold">{{ row.username || row.nickname }}</div>
						<div class="opacity-60">ID: {{ row.id }}</div>
					</div>
				</div>
			</template>
			<!-- 状态 -->
			<template #status="{ row }">
				<el-switch v-model="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading"
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
import { searchSchema } from './config/searchSchema'
import { tableOptions } from './config/tableOptions'
import { userListApi, userStatusApi, userDeleteApi } from '@/api/model/user'
import defaultAvatar from '/public/img/avatar3.gif'
import ActionDrawer from './components/ActionDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'

const useUserList = () => {
	const listSearchParams = ref({
		keyword: '',
		user_level_id: ''
	})

	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listSearchParams,
			listDataApi: userListApi, 
			deleteDataApi: userDeleteApi,
			statusDataApi: userStatusApi
		})

	const handleStatusChange = async (row) => {
		statusData({
			params: { id: row.id, status: row.status },
			row
		})
	}

	const handleSearch = (model) => {
		listSearchParams.value = model
		getListData()
	}

	return {
		list,
		loading,
		pageSearch,
		total,
		getUserListData: getListData,
		handleStatusChange,
		handleSearch,
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
	handleSearch,
	handleDelete
} = useUserList()

getUserListData()

const { actionDrawerRef, handleCreate, handleEdit } = useAction()

</script>

<style scoped lang="scss">
</style>

