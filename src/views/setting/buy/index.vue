<template>
	<NContainer v-loading="loading">
		<el-tabs v-model="tabAction" tab-position="top" @tab-change="handleTabClick">
			<el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name" />
		</el-tabs>
			<PayPanel
			 	v-if="tabAction === 'pay'"
				:aliData="currentData?.alipay || {}"
				:wxData="currentData?.wxpay || {}"
				:getListData="getData"
			></PayPanel>
			<NForm v-if="tabAction === 'buy'" :key="loading" class="mt-10" ref="nFormRef" :schema="buySchema" :formOptions="{labelWidth: '150px'}" ></NForm>
			<template v-if="tabAction === 'buy'">
				<el-button type="" @click="handleReset">重置</el-button>
				<el-button type="primary" @click="handleSubmit">提交</el-button>
		</template>
	</NContainer>
</template>

<script setup>
import { ref } from 'vue';
import { buySchema } from './config/formSchema'
import { settingInfoApi } from '@/api/model/sysconfig'
import { notification } from '@/libs/elementPlus';
import PayPanel from './components/PayPanel'

const nFormRef = ref(null)
const tabAction = ref('pay')
const tabOptions = [
	{ label: '支付设置', name: 'pay' },
	{ label: '购物设置', name: 'buy' },
]
const currentData = ref(null)
const loading = ref(false)
const getData = async ()=>{
	loading.value = true
	const {data}  =await settingInfoApi()
	currentData.value = data
	// ..
	buySchema.value.forEach(it=>{
		const prop = it.prop
		it.value = data[prop]
	})
	loading.value = false
}

getData()

const handleTabClick = () => {
	getData()
 }

const handleSubmit = async ()=>{
	const flag = await nFormRef.value.validate()
	if(flag){
		// const model = nFormRef.value.getModel()
		getData()
		notification({ message: '演示数据', type: 'success' })
	}
}
const handleReset = ()=>{
	nFormRef.value.resetFields()
}


</script>

<style scoped lang="scss">
</style>

