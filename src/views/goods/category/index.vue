<template>
	<NContainer v-loading="loading">
		<NActionHeader @create="handleCreate" @refresh="getListData" />
		<el-tree :data="list" :props="{ label: 'name', value: 'id' }">
			<template #default="{ data }">
				<div class="flex justify-between w-full text-base">
					<div>{{ data.name }}</div>
					<div class="flex w-220px justify-between">
						<el-button class="" type="primary" link size="small" @click="handleRecommend(data)">推荐产品</el-button>
						<el-switch v-model="data.status"
							:active-value="1" :inactive-value="0" size="small"
							@click="handleStatusChange(data)"
							/>
						<el-button type="primary" link size="small" @click="handleEdit(data)">修改</el-button>
						<el-button type="danger" link size="small" @click="handleDelete({ id: [data.id] })">删除</el-button>
					</div>
				</div>
			</template>
		</el-tree>
		<ActionDrawer ref="actionDrawerRef" :getListData="getListData"></ActionDrawer>
		<RecommendDrawer ref="recommendDrawerRef" @refreshList="getListData"></RecommendDrawer>
	</NContainer>
</template>
<script>
import { ref } from 'vue'
import { categoryListApi, categoryStatusApi, categoryDeleteApi } from '@/api/model/category'
import ActionDrawer from './components/ActionDrawer.vue'
import RecommendDrawer from './components/RecommendDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'

const useUserList = () => {


	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listDataApi: categoryListApi,
			deleteDataApi: categoryDeleteApi,
			statusDataApi: categoryStatusApi
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
		getListData: getListData,
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

	const recommendDrawerRef = ref(null)
	const handleRecommend = async (row)=>{
		recommendDrawerRef.value.open({
			title:'关联产品',
			params: { category_id: row.id }
		})
	}
	return {
		actionDrawerRef,
		handleCreate,
		handleEdit,
		recommendDrawerRef,
		handleRecommend
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

const { actionDrawerRef, recommendDrawerRef, handleCreate, handleEdit, handleRecommend } = useAction()


</script>

<style scoped lang="scss">
:deep(.el-tree-node__content){
	padding-top: 22px;
	padding-bottom: 16px;
}
</style>

