<template>
	<NDialog v-model="isVisible" title="商品选择">
		<template #header>
			<el-input v-model="listSearchParams.title" placeholder="商品名称"
				class="w-100 mr-2 mb-4 relative top-1px"
				clearable 
				size="small"
				@keyup.enter="handleSearch"
			></el-input>
			<el-button type="primary" size="small" @click="handleSearch" >搜索</el-button>
		</template>
		<template #content>
			<NTable table-layout="auto" ref="tableRef" :data="list" :options="tableOptions" :dragSort="false"
				:loading="loading" :total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit"
				@selectionChange="selectionChange">
				<!-- 会员 -->
				<template #info="{ row }">
					<div class="flex">
						<NAvatar :src="row.cover" class="rounded-10px w-30 h-30"></NAvatar>
						<div class="ml-4">
							<div class="text-xl font-semibold">{{ row.title }}</div>
							<div class="opacity-60">
								<span class="text-red-500 font-bold">&yen;{{ row.min_price }}</span>
								<el-divider direction="vertical"></el-divider>
								<span>&yen;{{ row.min_oprice }}</span>
							</div>
							<div>
								分类: {{ cates.find(it => it.id === row.category_id)?.name }}
							</div>
							<div>
								创建时间: {{ row.create_time }}
							</div>
						</div>
					</div>
				</template>
			</NTable>
		</template>
		<template #footer>
			<div class="mt-4 flex justify-end">
				<el-button type="" @click="isVisible = false">取消</el-button>
				<el-button type="primary" @click="handleConfirm">确定</el-button>
			</div>
		</template>
	</NDialog>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { goodsListApi, goodsCheckApi, goodsBatchDeleteApi } from '@/api/model/goods'
import { notification } from '@/libs/elementPlus/index.js';
import { usePageAction } from '@/hooks/usePageAction.js';
import { tableOptions } from './config/tableOptions'
const useList = () => {
	const listSearchParams = ref({
		title: '',
		category_id: '',
		tab: 'saling'
	})
	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listSearchParams,
			listDataApi: goodsListApi,
			deleteDataApi: goodsBatchDeleteApi,
			statusDataApi: goodsCheckApi
		})

	const handleStatusChange = async (row, ischeck) => {
		try {
			row.checkLoading = true
			const params = { id: row.id, ischeck }
			await goodsCheckApi(params)
			await getListData()
			notification({
				message: ischeck === 1 ? '已同意' : '已拒绝',
				type: 'success',
			})
		}
		finally {
			row.checkLoading = false
		}

	}

	const handleSearch = () => {
		getListData()
	}

	return {
		list,
		loading,
		pageSearch,
		total,
		listSearchParams,
		getUserListData: getListData,
		handleStatusChange,
		handleSearch,
		handleDelete: deleteData
	}
}

const {
	list,
	loading,
	pageSearch,
	total,
	listSearchParams,
	getUserListData,
	handleSearch,
} = useList()


const isVisible = ref(false)
let selecteDList = [] // 当前选中

let callback = null
const cates = ref([])
const open = (cb) => {
	callback = cb
	isVisible.value = true
	getUserListData()
		.then(data => {
			cates.value = data.cates
		})
}

const selectionChange = (values) => {
	selecteDList = values
}

const handleConfirm = () => {
	if (selecteDList.length > 0 && callback) {
		callback([...selecteDList])
	}
	isVisible.value = false
}

watch(isVisible, () => {
	if (!isVisible.value) {
		selecteDList = []
	}else{
		nextTick(()=>{
			const dialogBody = document.querySelector('.el-dialog__body')
			dialogBody.style.paddingTop = 0
		})
	}
})


defineExpose({
	open
})
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
	padding-top: 0 !important;
}
</style>
