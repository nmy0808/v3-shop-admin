<template>
	<NContainer>
		<NActionHeader @create="handleCreate" @refresh="getUserListData" />
		<NTable  table-layout="auto"	 ref="tableRef" :data="list" :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
			<!-- 会员 -->
			<template #name="{ row }">
				<div class="w-120 pl-6 py-4 ">
					<div class="h-7 font-bold">
						{{row.name}}
					</div>
					<div class=" mt-2">
					 <span class="opacity-60">{{row.start_time}} - {{row.end_time}}</span>
					</div>
				</div>
			</template>
			<!-- 状态 -->
			<template #status="{ row }">
				<el-tag
					v-if="row.status === 1"
					type=""
					effect="light">
					开启
				</el-tag>
				<el-tag
					v-else
					type="info"
					effect="light">
					关闭
				</el-tag>
			</template>
				<!-- 优惠 -->
			<template #value="{ row }">
				<el-tag v-if="row.type === 0 " type="danger" size="small"  effect="light" >
					{{ `优惠 ¥${row.value} 元` }}
				</el-tag>
				<el-tag v-else type="" size="small"  effect="light" >
					{{ `折扣 ${row.value} 折`  }}
				</el-tag>
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
import { couponListApi, couponStatusApi, couponDeleteApi } from '@/api/model/coupon'
import ActionDrawer from './components/ActionDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'

const useUserList = () => {


	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listDataApi: couponListApi,
			deleteDataApi: couponDeleteApi,
			statusDataApi: couponStatusApi
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
	getUserListData,
	handleDelete
} = useUserList()

getUserListData()

const { actionDrawerRef, handleCreate, handleEdit } = useAction()

</script>

<style scoped lang="scss">
</style>

