<template>
	<NContainer>
		<el-tabs v-model="listSearchParams.tab" type="card" tab-position="top" @tab-change="handleTabClick">
			<el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name" />
		</el-tabs>
		<!--
					format:       指定输入框的格式
					value-format: 指定绑定值的格式
					格式:         'x' / 'YYYY-MM-DD' / 'YYYY/MM/DD' / 'YYYY年 MM月 DD日' 等等...
				 -->
		<!-- <el-date-picker v-model="listSearchParams.starttime" type="date" placeholder="选择开始时间" format="YYYY年 MM月 DD日"
			value-format="YYYY-MM-DD" @change="handleDateChange" /> -->
		<NSearchHeader class="my-4" :schema="searchSchema" :showFold="false"
			:formOptions="{ labelWidth: '60px', size: 'small', inline: true }" @search="handleSearch">
		</NSearchHeader>
		<NActionHeader>
			<template #left>
				<el-button type="danger" size="small" @click="handleBatchDelete">彻底删除</el-button>
			</template>
			<template #right>
				<el-button size="small" icon="el-icon-download" @click="getUserListData"></el-button>
				<el-button size="small" icon="el-icon-refresh" @click="getUserListData"></el-button>
			</template>
		</NActionHeader>
		<NTable table-layout="auto" ref="tableRef" :data="list" :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit"
				@selection-change="handleSelectChange"
			>
			<!-- 商品 -->
			<template #goods-info="{ row }">
				<div class="flex items-center">
					<div>
						<div class="w-20 inline-block">订单号:</div>
						<div>{{ row.no }}</div>
					</div>
					<el-divider class="mx-6" direction="vertical"></el-divider>
					<div>
						<div class="w-20 inline-block">下单时间:</div>
						<div>{{ row.create_time }}</div>
					</div>
				</div>
				<!-- <el-divider class="my-2" direction="horizontal"></el-divider> -->
				<div class="flex items-center mt-4">
					<NAvatar :src="row?.order_items[0]?.goods_item?.cover" class="rounded-1px w-10 h-10" />
					<div class="ml-4 color-primary">
						{{ row?.order_items[0]?.goods_item?.title }}
					</div>
				</div>
			</template>
			<!-- 买家 -->
			<template #user="{ row }">
				<div>
					<div>{{ row.user.username }}</div>
					<div>(用户id: {{ row.user.id }})</div>
				</div>
			</template>
			<!-- 交易状态 -->
			<template #status-info="{ row }">
				<div>
					<span class="mr-2">付款状态:</span>
					<el-tag class="w-30" v-if="row.payment_method === ALIPAY_TYPE" type="" size="small" effect="light">支付宝支付
					</el-tag>
					<!-- <el-tag v-else-if="row.payment_method === WXPAY_TYPE" type="" size="small" effect="dark">
						微信支付
					</el-tag> -->
					<el-tag class="w-30" v-else type="info" size="small" effect="light">未支付</el-tag>
				</div>
				<div class="mt-2">
					<span class="mr-2">发货状态:</span>
					<el-tag class="w-30" v-if="row.ship_status === 'pending'" type="info" size="small" effect="light">未发货</el-tag>
					<el-tag class="w-30" v-else type="success" size="small" effect="light">已发货</el-tag>
				</div>
				<div class="mt-2">
					<span class="mr-2">收货状态:</span>
					<el-tag class="w-30" v-if="row.refund_status === 'pending'" type="info" size="small" effect="light">未收货
					</el-tag>
					<el-tag class="w-30" v-else type="success" size="small" effect="light">已收货</el-tag>
				</div>
			</template>
			<template #action="{ row }">
				<div class="flex justify-end w-38">
					<el-button v-if="row.payment_method === ALIPAY_TYPE" type="primary" link size="small"
						@click="handleOrderInfo(row)">订单详情</el-button>
					<el-button type="primary" link size="small" @click="handleDelete(row)">订单发货</el-button>
				</div>
			</template>
		</NTable>
		<ActionDrawer ref="actionDrawerRef" :getListData="getUserListData"></ActionDrawer>
		<OrderInfoDrawer ref="orderInfoDrawerRef" :getListData="getUserListData"></OrderInfoDrawer>
	</NContainer>
</template>
<script>
import { ref } from 'vue'
import { searchSchema } from './config/searchSchema'
import { tableOptions } from './config/tableOptions'
import { orderListApi, orderStatusApi, orderBatchDeleteApi } from '@/api/model/order'
import ActionDrawer from './components/ActionDrawer.vue'
import OrderInfoDrawer from './components/OrderInfoDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'
import { ALIPAY_TYPE } from '@/constant/'
const useUserList = () => {
	const listSearchParams = ref({
		no: '',
		tab: 'all',
		starttime: null,
		endtime: null,
		name: '',
		phone: '',
	})
	const tabOptions = [
		{ label: '全部', name: 'all' },
		{ label: '待支付', name: 'nopay' },
		{ label: '待发货', name: 'noship' },
		{ label: '待收货', name: 'shiped' },
		{ label: '已收货', name: 'received' },
		{ label: '已完成', name: 'finish' },
		{ label: '已关闭', name: 'closed' },
		{ label: '退款中', name: 'refunding' }
	]
	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listSearchParams,
			listDataApi: orderListApi,
			deleteDataApi: orderBatchDeleteApi,
			statusDataApi: orderStatusApi
		})

	const handleStatusChange = async (row) => {
		statusData({
			params: { id: row.id, status: row.status },
			row
		})
	}
	const selectedList = ref([])
	const handleSelectChange = (list)=>{
		selectedList.value = [...list]
	}
	const handleBatchDelete = () => {
		deleteData({ ids: selectedList.value.map(it => it.id)})
	 }

	const handleSearch = (model) => {
		listSearchParams.value = { ...listSearchParams.value, ...model }
		getListData()
	}

	const handleTabClick = async () => {
		getListData()
	}




	return {
		tabOptions,
		listSearchParams,
		list,
		loading,
		pageSearch,
		total,
		handleSelectChange,
		handleBatchDelete,
		getUserListData: getListData,
		handleStatusChange,
		handleSearch,
		handleDelete: deleteData,
		handleTabClick
	}
}

const useAction = () => {
	const actionDrawerRef = ref(null)

	const handleCreate = () => {
		actionDrawerRef.value.open({ title: '新增' })
	}


	const orderInfoDrawerRef = ref(null)
	const handleOrderInfo = (data) => {
			orderInfoDrawerRef.value.open({ title: '订单信息', data })
		}
	return {
		actionDrawerRef,
		handleCreate,
		handleOrderInfo,
		orderInfoDrawerRef
	}
}

</script>

<script setup>

const {
	tabOptions,
	listSearchParams,
	list,
	loading,
	pageSearch,
	total,
	handleSelectChange,
	handleBatchDelete,
	handleStatusChange,
	getUserListData,
	handleSearch,
	handleDelete,
	handleTabClick,
} = useUserList()

getUserListData()

const { actionDrawerRef, handleCreate, handleOrderInfo , orderInfoDrawerRef} = useAction()

</script>

<style scoped lang="scss">
</style>

