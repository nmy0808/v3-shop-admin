<template>
	<NContainer v-loading="loading">
		<el-form :model="currentData" @submit.prevent="handleSubmit">
			<el-form-item label="物流查询key" prop="ship" :rules="getRequiredRule('物流查询key不能为空')">
				<el-input v-model="currentData.ship"></el-input>
			</el-form-item>
			<el-form-item class="mt-10">
				<el-button type="" @click="handleReset">重置</el-button>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</NContainer>
</template>

<script setup>
import { settingInfoApi } from '@/api/model/sysconfig';
import { notification } from '@/libs/elementPlus';
import { ref, watch } from 'vue';
import { getRequiredRule } from '@/utils/rules'

const loading = ref(false)
const currentData = ref({})
let currentDataCopy = {}


const getData = async () => {
	loading.value = true
	const { data } = await settingInfoApi()
	currentData.value = data
	currentDataCopy = {...data}
	loading.value = false
}
getData()

const handleReset = ()=>{
	console.log(currentDataCopy)
currentData.value = currentDataCopy
}
const handleSubmit = (e) => {
	getData()
	notification({ message: '演示数据', type: 'success' })
}
</script>

<style scoped lang="scss">
</style>

