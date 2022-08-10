<template>
	<NContainer>
		<el-tabs v-model="listSearchParams.tab" type="card" tab-position="top" @tab-change="handleTabClick">
			<el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name" />
		</el-tabs>
		<NSearchHeader class="my-4" :schema="searchSchema" :showFold="false"
			:formOptions="{ labelWidth: '60px', size: 'small', inline: true }" @search="handleSearch">
		</NSearchHeader>
		<NActionHeader>
			<template #left>
				<el-button type="danger" size="small" @click="handleBatchDelete">彻底删除</el-button>
			</template>
			<template #right>
				<el-button size="small" icon="el-icon-download" @click="handleDownload"></el-button>
				<el-button size="small" icon="el-icon-refresh" @click="getListData"></el-button>
			</template>
		</NActionHeader>
		<NTable table-layout="auto" ref="tableRef" :data="list" :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit"
			@selection-change="handleSelectChange">
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
				<div class="flex justify-end w-68">
					<!-- v-if="row.payment_method" -->
					<el-button type="primary"
						v-if='row.payment_method || listSearchParams.tab !== "all"'
					link size="small" @click="handleOrderInfo(row)">订单详情</el-button>
					<template v-if="listSearchParams.tab === 'all' || listSearchParams.tab === 'noship'">
						<el-button type="primary" link size="small" @click="handleOrderSend(row)">订单发货</el-button>
					</template>
					<template v-if="listSearchParams.tab === 'refunding'">
						<el-button type="primary" link size="small" @click="handleStatusChange(row, 1)">同意退款</el-button>
						<el-button type="primary" link size="small" @click="handleStatusChange(row, 0)">拒绝退款</el-button>
					</template>
				</div>
			</template>
		</NTable>
		<ActionDrawer ref="actionDrawerRef" :getListData="getListData"></ActionDrawer>
		<OrderInfoDrawer ref="orderInfoDrawerRef" :getListData="getListData"></OrderInfoDrawer>
	</NContainer>
</template>
<script>
import { ref } from 'vue'
import { searchSchema } from './config/searchSchema'
import { tableOptions } from './config/tableOptions'
import { orderListApi, orderStatusApi, orderBatchDeleteApi, orderExportApi } from '@/api/model/order'
import ActionDrawer from './components/ActionDrawer.vue'
import OrderInfoDrawer from './components/OrderInfoDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'
import { ALIPAY_TYPE } from '@/constant/'
import { saveAs } from 'file-saver';
import { notification, prompt, message as elMessage } from '@/libs/elementPlus'

const useList = () => {
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
		{ label: '已发货', name: 'shiped' },
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


	const selectedList = ref([])
	const handleSelectChange = (list) => {
		selectedList.value = [...list]
	}
	const handleBatchDelete = () => {
		deleteData({ ids: selectedList.value.map(it => it.id) })
	}

	const handleSearch = (model) => {
		listSearchParams.value = { ...listSearchParams.value, ...model }
		getListData()
	}

	const handleTabClick = async () => {
		getListData()
	}

	const handleDownload = async () => {
		const data = await orderExportApi({ ...listSearchParams.value })
		let url = window.URL.createObjectURL(new Blob([data]))
		let filename = (new Date()).getTime() + ".xlsx"
		saveAs(url, filename)
	}

	const handleStatusChange = async (row, agree) => {
		try {
			const params = {}
			params.id = row.id
			params.agree = agree
			let message = '同意退款操作完成'
			// 如果同意退款
			if (agree !== 1) {
				params.disagree_reason = await prompt({
					title: '拒绝退款',
					message: '请输入拒绝退款的理由',
					closeOnClickModal: false,
					closeOnPressEscape: false,
					beforeClose: (action, instance, done) => {
						const value = instance.inputValue?.trim()
						if (value) {
							return done()
						}
						elMessage({ message: '必须填写拒绝退款的理由', type: 'error' })
					}
				})
				// 如果拒绝退款
				message = '拒绝退款操作完成'
			}
			await orderStatusApi(params)
			notification({
				message,
				type: agree === 1 ? 'success' : 'error'
			})
		}
		catch (error) { }
		finally {
		}

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
		getListData: getListData,
		handleStatusChange,
		handleSearch,
		handleDelete: deleteData,
		handleTabClick,
		handleDownload
	}
}

const useAction = () => {
	const actionDrawerRef = ref(null)

	const handleOrderSend = (data) => {
		actionDrawerRef.value.open({ title: '订单发货', data })
	}


	const orderInfoDrawerRef = ref(null)
	const handleOrderInfo = (data) => {
		orderInfoDrawerRef.value.open({ title: '订单信息', data })
	}

	return {
		actionDrawerRef,
		handleOrderSend,
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
	getListData,
	handleSearch,
	handleDownload,
	handleTabClick,
	handleStatusChange
} = useList()

getListData()

const { actionDrawerRef, handleOrderSend, handleOrderInfo, orderInfoDrawerRef } = useAction()

</script>

<style scoped lang="scss">
</style>

