<template>
	<el-row class="flex w-full px-4" >
		<template v-for="(item, index) in statisticsData" :key="index">
			<el-col :span="6">
				<el-card shadow="never" class="!mb-0 mt-4 mr-5">
					<div class="flex">
						<div class="flex items-center justify-center w-14 h-14 m4-2  rounded-full"
							:style="{ background: item.bg }"
						>
							<NIcon :icon="item.icon" color="white" class="relative top-1px" :size="20"></NIcon>
						</div>
						<div class="ml-3">
							<div class="font-bold text-xl">	{{item.value}}</div>
							<div class="mt-1 opacity-60">	{{item.label}}</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</template>
<!--
		<el-col :span="6">
			<el-card shadow="never" class="!mb-0 mt-4 mr-5">1
			</el-card>
		</el-col>
			<el-col :span="6">
			<el-card shadow="never" class="!mb-0 mt-4 mr-5">1
			</el-card>
		</el-col>
			<el-col :span="6">
			<el-card shadow="never" class="!mb-0 mt-4">1
			</el-card>
		</el-col> -->
	</el-row>
	<NContainer>
		<el-form ref="formRef"  class="my-4" :model="listSearchParams" label-width="80px" size="small" inline @submit.prevent="handleSearch">
			<el-form-item label="时间选择" prop="name" placeholder="请输入关键词">
				<el-radio-group v-model="listSearchParams.type">
					<el-radio label="all" border class="!mr-2">全部</el-radio>
					<el-radio label="today" border class="!mr-2">今天</el-radio>
					<el-radio label="yesterday" border class="!mr-2">昨天</el-radio>
					<el-radio label="last7days" border class="!mr-2">最近7天</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="开始时间" prop="starttime" placeholder="请输入起始时间">
				<el-date-picker v-model="listSearchParams.starttime" type="date" placeholder="选择日期" format="YYYY年 MM月 DD日"
					value-format="YYYY-MM-DD" />
			</el-form-item>

			<el-form-item label="结束时间" prop="name" placeholder="请输入结束时间">
				<el-date-picker v-model="listSearchParams.endtime" type="date" placeholder="选择日期" format="YYYY年 MM月 DD日"
					value-format="YYYY-MM-DD" />
			</el-form-item>
			<el-form-item label="关键词" prop="keyword" placeholder="请输入关键词">
				<el-input v-model="listSearchParams.keyword"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="" native-type="reset">重置</el-button>
				<el-button type="primary" native-type="submit">搜索</el-button>
			</el-form-item>
		</el-form>
			<NTable  table-layout="auto"	 ref="tableRef" :data="list"
			 :options="tableOptions" :dragSort="false" :loading="loading"
			:total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
			<!-- 会员 -->
			<template #user-info="{ row }">
				<div class="flex items-center">
					<NAvatar :src="row.avatar"></NAvatar>
					<div class="ml-6">
						<div class="text-base font-semibold">用户: {{ row.username || row.nickname }}</div>
						<div class="text-base font-semibold">昵称: {{ row.nickname || '哈罗~'}}</div>
						<div class="text-base font-semibold">姓名: {{ row.name || '王冬梅' }}</div>
						<div class="text-base font-semibold">电话: {{ row.phone || 13109787787 }}</div>
					</div>
				</div>
			</template>

			<template #action="{ row }">
				<el-button type="primary" link size="small" @click="handlePeopleList(row)">推广人</el-button>
				<el-button type="primary" link size="small" @click="handleOrderList(row)">推广订单</el-button>
			</template>
		</NTable>
		<PeopleDrawer ref="peopleDrawerRef"/>
		<OrderDrawer ref="orderDrawerRef"/>
	</NContainer>
</template>
<script setup>
import { ref } from 'vue'
import { tableOptions } from './config/tableOptions'
import { agentListApi, statisticsApi } from '@/api/model/agent'
import PeopleDrawer from './components/PeopleDrawer.vue'
import OrderDrawer from './components/OrderDrawer.vue'
import { usePageAction } from '@/hooks/usePageAction'
import { notification, prompt, message as elMessage } from '@/libs/elementPlus'

const useUserList = () => {
	const listSearchParams = ref({
		day: 1,
		starttime: null,
		endtime: null,
		keyword:'',
		type: 'all'
	})

	const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listSearchParams,
			listDataApi: agentListApi,
		})

	const handleStatusChange = async (row) => {
		statusData({
			params: { id: row.id, status: row.status },
			row
		})
	}

	const handleSearch = () => {
		// listSearchParams.value = model
		getListData()
	}

	return {
		list,
		loading,
		pageSearch,
		listSearchParams,
		total,
		getUserListData: getListData,
		handleStatusChange,
		handleSearch,
		handleDelete: deleteData
	}
}

const useAction = () => {
	const peopleDrawerRef = ref(null)

	const handleCreate = () => {
		peopleDrawerRef.value.open({ title: '推广人列表' })
	}
	const handlePeopleList = (data) => {
		peopleDrawerRef.value.open({ title: '推广订单列表', data })
	}

	const orderDrawerRef = ref(null)

	const handleOrderList = (data) => {
		orderDrawerRef.value.open({ title: '推广订单列表', data })
	}

	return {
		peopleDrawerRef,
		handleCreate,
		handlePeopleList,
		orderDrawerRef,
		handleOrderList
	}
}
const formData = ref({
	day: 1,
	starttime: null,
	endtime: null,
	keyword:'',
	type: 'all'
})

const {
	list,
	loading,
	pageSearch,
	listSearchParams,
	total,
	handleStatusChange,
	getUserListData,
	handleSearch,
	handleDelete
} = useUserList()

getUserListData()

const { peopleDrawerRef, handleCreate, handlePeopleList, orderDrawerRef, handleOrderList } = useAction()
const statisticsData = ref([])
const colors = [{bg: '#5E97F9', icon: 'User'},{bg: '#F38938', icon: 'Cellphone'}, {bg: '#47CE8D', icon: 'Money'},{bg:'#787BF7', icon: 'MessageBox'}]
const getStatisticsData = async ()=>{
	const {data} = await statisticsApi()
	statisticsData.value = data.panels.map((it,index)=>{
		return {
			...it,
			...colors[index]
		}
	})
	console.log(data)
}

getStatisticsData()


</script>

<style scoped lang="scss">
</style>

