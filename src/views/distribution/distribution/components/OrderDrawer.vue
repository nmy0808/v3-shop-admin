<template>
	<div class="">
		<NDrawer v-model="isVisible" :title="currentTitle" :loading="loading" @cancel="handleCancel"
			@confirm="handleConfirm" :showConfirmBtn="false" cancelBtnText="关闭">
			<el-form ref="formRef" :model="listSearchParams" label-width="80px" size="small" @submit.prevent="handleSubmit">
				<el-form-item label="时间选择" prop="type" placeholder="请输入关键词">
					<el-radio-group v-model="listSearchParams.type">
						<el-radio label="all" border class="!mr-2">全部</el-radio>
						<el-radio label="today" border class="!mr-2">今天</el-radio>
						<el-radio label="yesterday" border class="!mr-2">昨天</el-radio>
						<el-radio label="last7days" border class="!mr-2">最近7天</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="开始时间" prop="starttime" placeholder="请输入起始时间">
					<!--
							format:       指定输入框的格式
							value-format: 指定绑定值的格式
							格式:         'x' / 'YYYY-MM-DD' / 'YYYY/MM/DD' / 'YYYY年 MM月 DD日' 等等...
						 -->
					<el-date-picker v-model="listSearchParams.starttime" type="date" placeholder="选择日期" format="YYYY年 MM月 DD日"
						value-format="YYYY-MM-DD" />
				</el-form-item>

				<el-form-item label="结束时间" prop="endtime" placeholder="请输入结束时间">
					<el-date-picker v-model="listSearchParams.endtime" type="date" placeholder="选择日期" format="YYYY年 MM月 DD日"
						value-format="YYYY-MM-DD" />
				</el-form-item>
				<el-form-item label="用户类型" prop="level">
					<el-radio-group v-model="listSearchParams.level">
						<el-radio label="0" border class="!mr-2">全部</el-radio>
						<el-radio label="1" border class="!mr-2">一级推广</el-radio>
						<el-radio label="2" border class="!mr-2">二级推广</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="" native-type="reset">重置</el-button>
					<el-button type="primary" native-type="submit">搜索</el-button>
				</el-form-item>
			</el-form>
			<!--  后端暂无接口, 先占位吧 -->
			<el-table :data="[]" size="small">
				<el-table-column label="订单号"></el-table-column>
				<el-table-column label="用户名|昵称|手机"></el-table-column>
				<el-table-column label="时间"></el-table-column>
				<el-table-column label="返佣金额"></el-table-column>
			</el-table>
		</NDrawer>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePageAction } from '@/hooks/usePageAction'
import { notification } from '@/libs/elementPlus';

const props = defineProps({

})

const isVisible = ref(false)
const loading = ref(false)

const actionSchema = ref([])
const currentTitle = ref('')
let currentEditData = null

// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		listSearchParams.value = {
			keyword: '',
			type: 'all',
			starttime: null,
			endtime: null,
			level: '0',
			user_id: null,
		}
	}
})

const listSearchParams = ref({
	keyword: '',
	type: 'all',
	starttime: null,
	endtime: null,
	level: '0',
	user_id: null,
})


const open = ({ title, data }) => {
	currentTitle.value = title
	listSearchParams.value.id = data.id
	currentEditData = data
	if (data) {
	}
	isVisible.value = true
}


const handleSubmit = async () => {
	// console.log(listSearchParams.value)
}
const handleCancel = () => {
	isVisible.value = false
}
const handleConfirm = () => {
	isVisible.value = false
}

// loading.value = false
// isVisible.value = false
defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
