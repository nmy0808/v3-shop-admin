<template>
	<NContainer v-loading="loading">
		<el-tabs v-model="tabAction" tab-position="top" @tab-change="handleTabClick">
			<el-tab-pane v-for="(item, index) in tabOptions" :key="index" :label="item.label" :name="item.name" />
		</el-tabs>
			<NForm v-if="tabAction === 'registry'" class="mt-10" ref="nFormRef" :schema="registrySchema" :formOptions="{labelWidth: '150px'}" ></NForm>
			<NForm v-if="tabAction === 'upload'" class="mt-10" ref="nFormRef" :schema="uploadSchema" :formOptions="{labelWidth: '150px'}" ></NForm>
			<NForm v-if="tabAction === 'api'" class="mt-10" ref="nFormRef" :schema="apiSchema" :formOptions="{labelWidth: '150px'}" ></NForm>
			<el-button type="" @click="handleReset">重置</el-button>
			<el-button type="primary" @click="handleSubmit">提交</el-button>
			<el-checkbox-group>
			</el-checkbox-group>
	</NContainer>
</template>

<script setup>
import { ref } from 'vue';
import { registrySchema, uploadSchema, apiSchema } from './config/formSchema'
import { settingInfoApi } from '@/api/model/sysconfig'
import { notification } from '@/libs/elementPlus';

const nFormRef = ref(null)
const tabAction = ref('registry')
const tabOptions = [
	{ label: '注册与访问', name: 'registry' },
	{ label: '上传设置', name: 'upload' },
	{ label: 'Api安全', name: 'api' }
]
const loading = ref(false)
const getData = async ()=>{
	loading.value = true
	const {data}  =await settingInfoApi()
	registrySchema.value.forEach((item)=>{
			const value = data[item.prop]
			if(item.prop === 'password_encrypt'){
				item.value = value.split(',')
			}else{
				item.value = value
			}
	})
	uploadSchema.value.forEach((item)=>{
		if(item.prop === 'upload_method'){
			item.value= data['upload_method']
		}else{
			const prop = item.prop
			const value = data['upload_config'][prop]
			item.value = value
		}
	})
	apiSchema.value.forEach((item)=>{
			const prop = item.prop
			const value = data[prop]
			if(item.prop === prop){
				item.value = value
			}
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

