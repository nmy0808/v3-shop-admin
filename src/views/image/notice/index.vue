<template>
	<NContainer>
		<NActionHeader @create="handleCreate" @refresh="getListData" />
		<NTable stripe table-layout="auto"	 ref="tableRef" :data="list"
			 :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
			<template #action="{ row }">
				<el-button type="primary" link size="small" @click="handleEdit(row)">修改</el-button>
						<el-button type="danger" link size="small" @click="handleDelete({ id: [row.id] })">删除</el-button>
			</template>
		</NTable>
		<ActionDrawer ref="actionDrawerRef" :getListData="getListData"></ActionDrawer>
	</NContainer>
</template>
<script>
import { ref } from 'vue'
import { noticeListApi, noticeDeleteApi } from '@/api/model/notice'
import ActionDrawer from './components/ActionDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'
import { tableOptions } from './config/tableOptions'
const useUserList = () => {
	const { loading, list, pageSearch, total, getListData, deleteData } =
		usePageAction({
			listDataApi: noticeListApi,
			deleteDataApi: noticeDeleteApi,
		})
	return {
		list,
		loading,
		pageSearch,
		total,
		getListData: getListData,
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

const { actionDrawerRef, recommendDrawerRef, handleCreate, handleEdit } = useAction()


</script>

<style scoped lang="scss">
:deep(.el-tree-node__content) {
	padding-top: 22px;
	padding-bottom: 16px;
}
</style>

