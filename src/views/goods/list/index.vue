<template>
	<NContainer>
		<el-tabs v-model="listSearchParams.tab" tab-position="top" @tab-change="handleTabClick">
			<el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name" />
		</el-tabs>

		<NSearchHeader class="mt-4" :schema="searchSchema" :showFold="true" @search="handleSearch"></NSearchHeader>
		<NActionHeader @create="handleCreate" @refresh="getUserListData" />
		<NTable table-layout="auto" ref="tableRef" :data="list" :options="tableOptionsCalc" :dragSort="false"
			:loading="loading" :total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
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
			<!-- 状态 -->
			<template #status="{ row }">
				<el-tag v-if="row.status == 1" type="success" size="small" effect="light">
					上架
				</el-tag>
				<el-tag v-else type="" size="small" effect="light">
					仓库
				</el-tag>
			</template>
			<!-- 审核状态 1:通过, 2:拒绝, 0:未审核 -->
			<template #ischeck="{ row }">
				<span v-if="row.ischeck === 1" class="text-green-500">通过</span>
				<span v-else-if="row.ischeck === 2" class="text-red-500">拒绝</span>
				<div v-else class="flex flex-col flex-wrap w-20 mx-auto relative -left-6px">
					<el-button class="!ml-0" type="success" size="small" plain @click="handleStatusChange(row, 1)"
						:loading="row.checkLoading">审核通过</el-button>
					<el-button class="!ml-0 mt-4" type="danger" size="small" plain @click="handleStatusChange(row, 2)"
						:loading="row.checkLoading">审核拒绝</el-button>
				</div>
			</template>
			<template #action="{ row }" v-if="listSearchParams.tab !== 'delete'">
				<el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
				<el-button type="primary" link size="small" @click="handleSkus(row)">商品规格</el-button>
				<el-button type="primary" link size="small" @click="handleBanner(row)">设置轮播图</el-button>
				<el-button type="primary" link size="small" @click="handleContent(row)">商品详情</el-button>
				<el-button type="danger" link size="small" @click="handleDelete({ ids: [row.id] })">删除</el-button>
			</template>
		</NTable>
		<ActionDrawer ref="actionDrawerRef" :getListData="getUserListData"></ActionDrawer>
		<SetBannerDrawer ref="setBannerDrawerRef" :getListData="getUserListData"></SetBannerDrawer>
		<SetContentDrawer ref="setContentDrawerRef" :getListData="getUserListData"></SetContentDrawer>
		<SetSkusDrawer ref="setSkusDrawerRef" :getListData="getUserListData"></SetSkusDrawer>
	</NContainer>
</template>
<script>
import { ref, computed, nextTick } from 'vue'
import { searchSchema } from './config/searchSchema'
import { tableOptions } from './config/tableOptions'
import { goodsListApi, goodsCheckApi, goodsBatchDeleteApi } from '@/api/model/goods'
import ActionDrawer from './components/ActionDrawer.vue'
import SetBannerDrawer from './components/SetBannerDrawer.vue'
import SetContentDrawer from './components/SetContentDrawer.vue'
import SetSkusDrawer from './components/SetSkusDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'
import { notification } from '@/libs/elementPlus'

const useList = () => {
	const listSearchParams = ref({
		title: '',
		category_id: '',
		tab: 'all'
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

	const handleSearch = (model) => {
		listSearchParams.value = { ...listSearchParams.value, ...model }
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

const useAction = () => {
	const actionDrawerRef = ref(null)

	const handleCreate = () => {
		actionDrawerRef.value.open({ title: '新增' })
	}
	const handleEdit = (data) => {
		actionDrawerRef.value.open({ title: '编辑', data })
	}

	const setBannerDrawerRef = ref(null)
	const handleBanner = (data) => {
		setBannerDrawerRef.value.open({ title: '编辑轮播图', data })
	}
	const setContentDrawerRef = ref(null)
	const handleContent = (data) => {
		setContentDrawerRef.value.open({ title: '编辑商品详情', data })
	}
	const setSkusDrawerRef = ref(null)
	const handleSkus = (data) => {
		setSkusDrawerRef.value.open({ title: '编辑商品规格', data })
	}
	return {
		actionDrawerRef,
		handleCreate,
		handleEdit,
		setBannerDrawerRef,
		handleBanner,
		setContentDrawerRef,
		handleContent,
		setSkusDrawerRef,
		handleSkus
	}
}

</script>

<script setup>

const {
	list,
	loading,
	pageSearch,
	total,
	listSearchParams,
	handleStatusChange,
	getUserListData,
	handleSearch,
	handleDelete
} = useList()


const { actionDrawerRef, handleCreate, handleEdit,
	setBannerDrawerRef, handleBanner,
	setContentDrawerRef, handleContent,
	setSkusDrawerRef, handleSkus } = useAction()

const tableOptionsCalc = ref(tableOptions.value)

const cates = ref([]) // 分类列表

getUserListData()
	.then(data => {
		cates.value = data.cates
	})
const tabOptions = [
	{ label: '全部', name: 'all' },
	{ label: '审核中', name: 'checking' },
	{ label: '出售中', name: 'saling' },
	{ label: '已下架', name: 'off' },
	{ label: '库存预警', name: 'min_stock' },
	{ label: '回收站', name: 'delete' },
]
// const actionTab = ref('all')
const handleTabClick = (v) => {
	pageSearch.value.page = 1
	list.value = []
	if (listSearchParams.value.tab == 'delete') {
		tableOptionsCalc.value = [...tableOptions.value].filter(it => it.prop !== 'ischeck')
	} else {
		tableOptionsCalc.value = [...tableOptions.value]
	}
	getUserListData()
}
</script>

<style scoped lang="scss">
</style>

