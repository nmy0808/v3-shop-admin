<template>
	<NContainer v-loading="loading">
		<el-form ref="formRef" :model="formData" label-width="140px" size="default" @submit.prevent="handleSubmit">
			<div class="p-4 bg-gray-100 dark:bg-black/30 text-14px rounded-2px mb-4">基础设置</div>
			<el-form-item label="分销启用" prop="distribution_open">
				<el-radio-group v-model="formData.distribution_open">
					<el-radio :label="1">是</el-radio>
					<el-radio :label="0">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<div class="text-sm opacity-50 ml-46 mb-10 -mt-3">关闭分销功能后不会再产生新的分销佣金，商城端分销入口会关闭。</div>
			<el-form-item label="分销海报图" prop="spread_banners">
				<!-- imageSelectRef -->
				<!-- <NSelectImageDialog ref="imageSelectRef"></NSelectImageDialog> -->
				<NUploadMultiple v-model="formData.spread_banners" :customUpload="customUpload" :maxNum="5"></NUploadMultiple>
			</el-form-item>
			<div class="p-4 bg-gray-100 dark:bg-black/30  text-14px rounded-2px mb-4">返佣设置</div>
			<el-form-item label="一级返佣比例" prop="store_first_rebate">
				<el-input type="number" class="w-130px" v-model="formData.store_first_rebate" placeholder="">
					<template #append>%</template>
				</el-input>
			</el-form-item>
			<div class="text-sm opacity-50 ml-46 mb-10 -mt-3">订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%</div>
			<el-form-item label="二级返佣比例" prop="store_second_rebate">
				<el-input type="number" class="w-130px" v-model="formData.store_second_rebate" placeholder="">
					<template #append>%</template>
				</el-input>
			</el-form-item>
			<div class="text-sm opacity-50 ml-46 mb-10 -mt-3">订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%</div>
			<el-form-item label="自动返佣" prop="is_self_brokerage">
				<el-radio-group v-model="formData.is_self_brokerage">
					<el-radio :label="1">是</el-radio>
					<el-radio :label="0">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<div class="text-sm opacity-50 ml-46 mb-10 -mt-3">是否开启自购返佣（开启：分销员自己购买商品，享受一级返佣，上级享受二级返佣； 关闭：分销员自己购买商品没有返佣）</div>
			<div class="p-4 bg-gray-100 dark:bg-black/30  text-14px rounded-2px mb-4">结算设置</div>
			<el-form-item label="结算时间" prop="settlement_days">
				<el-input type="number" class="w-240px" v-model="formData.settlement_days" placeholder="">
					<template #prepend>订单完成后</template>
					<template #append>天</template>
				</el-input>
			</el-form-item>
			<div class="text-sm opacity-50 ml-46 mb-10 -mt-3">预估佣金结算后无法进行回收，请谨慎设置结算天数</div>
			<el-form-item label="佣金到账方式" prop="brokerage_method">
				<el-radio-group v-model="formData.brokerage_method">
					<el-radio label="hand">手动转账</el-radio>
					<el-radio label="wx">自动到微信零钱</el-radio>
				</el-radio-group>
			</el-form-item>
			<div class="text-sm opacity-50 ml-46 mb-10 -mt-3">佣金到账方式支持线下转账和微信零钱自动转账，手动转账更安全，自动转账更方便</div>

			<div class="my-10 mt-20 pl-10">
				<el-button type="" @click="handleReset">重置</el-button>
				<el-button type="primary" native-type="submit">保存</el-button>
			</div>
		</el-form>

	</NContainer>
</template>

<script setup>
import { ref } from 'vue';
import NSelectImageDialog from '@/components/nSelectImageDialog/index.vue';
import NUploadMultiple from '@/components/nUploadMultiple/index.vue';
import { distributionSettingInfoApi } from '@/api/model/agent';
import { uploadImageApi } from '@/api/model/upload';
import { notification } from '@/libs/elementPlus';
import cloneDeep from 'lodash/cloneDeep'

const formData = ref({
	distribution_open: 1,
	spread_banners: [],
	store_first_rebate: 0,
	store_second_rebate: 0,
	is_self_brokerage: 0,
	settlement_days: 0,
	brokerage_method: 'hand',
})

let formDataTemp = {}

const loading = ref(false)

const customUpload = async (file) => {
	// 1.自定义上传请求
	// 2.返回图片url即可
	const { data } = await uploadImageApi({ img: [file] })
	return data.url
}



const getSettingInfo = async () => {
	try {
		loading.value = true
		const { data } = await distributionSettingInfoApi()
		formDataTemp = cloneDeep(data)
		Object.keys(formData.value).forEach(key => {
			const value = data[key]
			key !== 'spread_banners' && (formData.value[key] = value)
		})
	}
	finally {
		loading.value = false

	}
}
getSettingInfo()

const handleReset = () => {
	Object.keys(formData.value).forEach(key => {
		const value = formDataTemp[key]
		formData.value[key] = value
		key === 'spread_banners' && (formData.value[key] = [])
	})
}
const handleSubmit = () => {
	getSettingInfo()
	notification({ message: '演示数据', type: 'success' })
}
</script>

<style scoped lang="scss">
</style>

