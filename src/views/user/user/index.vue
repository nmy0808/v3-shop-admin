<template>
	<NContainer>
		<NSearchHeader :schema="searchSchema" :showFold="true" @search="handleSearch"></NSearchHeader>
		<NActionHeader @create="handleCreate" @refresh="getUserListData"/>
		<NTable border ref="tableRef" :data="list" :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
			<!-- 会员 -->
			<template #user="{ row }">
				<div class="flex">
					<NImage class="w-14 h-14 rounded-full" :src="row.avatar || defaultAvatar" fit="cover"></NImage>
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
import { ref, watch } from 'vue'
import { searchSchema } from './config/searchSchema'
import { tableOptions } from './config/tableOptions'
import { userListApi, userStatusApi, userDeleteApi } from '@/api/model/user'
import { notification, confirm } from '@/libs/elementPlus'
import defaultAvatar from '@/assets/imgs/default.jpeg'
import ActionDrawer from './components//ActionDrawer.vue'

function useUserList({searchSearch}) {
	const loading = ref(false)

	const list = ref([])

	const pageSearch = ref({
		page: 1,
		limit: 10
	})

	const total = ref(0)

	const getUserListData = async () => {
		try {
			loading.value = true
			const { data } = await userListApi({
				page: pageSearch.value.page,
				limit: pageSearch.value.limit,
				keyword:searchSearch.value.keyword,
				user_level_id:searchSearch.value.user_level_id
			})
			list.value = data.list
			total.value = data.totalCount
		}
		finally {
			loading.value = false
		}
	}

	const handleStatusChange = async (row) => {
		try {
			row.statusLoading = true
			await userStatusApi({ id: row.id, status: row.status })
			notification({ message: row.status ? '已开启' : '已关闭', type: row.status ? 'success' : 'error' })
		}
		catch (error) {
			const status = row.status
			if (status === 1) {
				row.status = 0
			} else {
				row.status = 1
			}
		}
		finally {
			row.statusLoading = false
		}
	}

	watch(() => pageSearch, getUserListData, { deep: true })

	return {
		list,
		loading,
		pageSearch,
		total,
		getUserListData,
		handleStatusChange
	}
}

function useAction(getUserListData) {
	const actionDrawerRef = ref(null)
	const handleCreate = () => {
		actionDrawerRef.value.open({ title: '新增' })
	}
	const handleEdit = (data) => {
		actionDrawerRef.value.open({ title: '编辑', data })
	}
	const handleDelete = async (data) => {
		const flag = await confirm({ messgae: '确定删除?' })
		if (flag) {
			await userDeleteApi({ id: data.id })
			await getUserListData()
			notification({ message: '已删除', type: 'success' })
		}
	}
	return {
		actionDrawerRef,
		handleCreate,
		handleEdit,
		handleDelete
	}
}

</script>

<script setup>

const searchSearch = ref({
	keyword: '',
	user_level_id:''
})
const handleSearch = (model) => {
	searchSearch.value = model
	getUserListData()
}

const {
	list,
	loading,
	pageSearch,
	total,
	handleStatusChange,
	getUserListData
} = useUserList({
	searchSearch
})

getUserListData()

const { actionDrawerRef, handleCreate, handleEdit, handleDelete } = useAction(getUserListData)

</script>

<style scoped lang="scss">
</style>

