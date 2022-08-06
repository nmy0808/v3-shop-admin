<template>
	<div class="">
		<NDrawer v-model="isVisible" :title="currentTitle" :loading="loading" @confirm="handleSubmit"
			@cancel="isVisible = false">
			<el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" size="default">
				<el-form-item label="优惠券名称" prop="name">
					<el-input v-model="formData.name" placeholder="请输入优惠券名称"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-radio-group v-model="formData.type">
						<el-radio :label="0" size="small" border>满减</el-radio>
						<el-radio :label="1" size="small" border>折扣</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="formData.type === 0 ? '面值' : '打折'" prop="value">
					<el-input-number class="mr-2" v-model="formData.value" :min="0" :precision="2"></el-input-number>
					{{ formData.type === 0 ? ' 元' : ' 折' }}
				</el-form-item>
				<el-form-item label="发行量" prop="total">
					<el-input-number v-model="formData.total" :min="0"></el-input-number>
				</el-form-item>
				<el-form-item label="最低使用价格" prop="min_price">
					<el-input-number class="mr-2" v-model="formData.min_price" :min="0" :precision="2"></el-input-number> 元
				</el-form-item>
				<el-form-item label="排序" prop="order">
					<el-input-number v-model="formData.order" :min="0">
					</el-input-number>
				</el-form-item>
				<el-form-item label="活动时间" prop="end_time" class="w-200">
					<el-date-picker v-model="timeRange" type="datetimerange" range-separator="-" start-placeholder="起始时间"
						end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" value-format="x" 
						@change="handleDateChange">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="描述" prop="desc">
					<el-input v-model="formData.desc" type="textarea" :rows="5" placeholder="请输入优惠券描述"></el-input>
				</el-form-item>
			</el-form>
		</NDrawer>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { couponCreateApi, couponEditApi } from '@/api/model/coupon'
import { usePageAction } from '@/hooks/usePageAction'
import rules from './config/actionRule'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})

const { createData, updateData, loading } = usePageAction({
	createDataApi: couponCreateApi,
	updateDataApi: couponEditApi
})

const isVisible = ref(false)

const currentTitle = ref('')


const formData = ref({
	name: '',
	type: 0,
	value: 0,
	total: 0,
	min_price: 0,
	start_time: null,
	end_time: null,
	order: 0,
	desc: ''
})


// 默认值需与value-format格式相匹配, 否则不显示默认值
const timeRange = ref([])

const handleDateChange = (time) => {
	if (!time) time = []
	formData.value.start_time = time[0]
	formData.value.end_time = time[1]
}


const open = ({ title, data }) => {
	currentTitle.value = title
	if (data) {
		formData.value = cloneDeep({
			...data,
			value: parseFloat(data.value),
			min_price: parseFloat(data.min_price)
		})
	}
	timeRange.value = [formData.value.start_time, formData.value.end_time]
	isVisible.value = true
}
const formRef = ref(null)
const handleSubmit = async () => {
	formRef.value.validate(async valid => {
		if (valid) {
			const params = { ...formData.value }
			params.start_time = new Date(params.start_time).getTime()
			params.end_time = new Date(params.end_time).getTime()
			if (formData.value.id) {
				await updateData({
					params,
					callback: () => {
						isVisible.value = false
						props.getListData && props.getListData()
					}
				})
			} else {
				await createData({
					params,
					callback: () => {
						isVisible.value = false
						props.getListData && props.getListData()
					}
				})
			}
		}
	})
}

// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		formData.value = {
			name: '',
			type: 0,
			value: 0,
			total: 0,
			min_price: 0,
			start_time: null,
			end_time: null,
			order: 0,
			desc: ''
		}
	}
})
defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
