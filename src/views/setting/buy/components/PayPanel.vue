<template>
	<el-table :data="tableData" class="mb-8" border table-layout="auto">
		<el-table-column label="支付方式">
			<template #default="{ row }">
				<div class="flex">
					<NImage :src="row.img"></NImage>
					<div class="ml-2">
						<div class="font-bold">{{row.name}}</div>
						<div>{{row.desc}}</div>
					</div>
				</div>
			</template>
		</el-table-column>
		<el-table-column label="">
			<template #default="{ row }">
				<el-button type="primary" link size="small"
					@click="handleSetting(row.id)"
				>配置</el-button>
			</template>
		</el-table-column>
	</el-table>
	<AliDrawer ref="aliDrawerRef" :getListData="getListData"></AliDrawer>
	<WxDrawer ref="wxDrawerRef"></WxDrawer>
</template>

<script setup>
import { ref } from 'vue';
import zImg from '@/assets/imgs/alipay.png'
import wImg from '@/assets/imgs/wepay.png'
import AliDrawer from './AliDrawer.vue'
import WxDrawer from './WxDrawer.vue'

const props = defineProps({
	aliData: {
		type: Object,
		default: ()=> ({})
	},
	wxData: {
		type: Object,
		default: ()=> ({})
	},
	getListData: {
		type: Function,
		default: null
	}
})

const tableData = ref([
	{
		id:0,
		name: '支付宝支付',
		desc: '该系统支付即时到账接口',
		img: zImg
	},
	{
		id: 1,
		name: '微信支付',
		desc: '该系统支付微信网页支付和扫码支付',
		img: wImg
	}
])

const aliDrawerRef = ref(null)
const wxDrawerRef = ref(null)
const handleSetting = (id)=>{
	// 如果是阿里支付
	if(id === 0){
		aliDrawerRef.value.open({title: '支付宝支付配置', data: props.aliData})
	}else {
	// 如果是微信支付
		wxDrawerRef.value.open({title: '微信支付配置', data: props.wxData})
	}
}
</script>

<style scoped lang="scss">
</style>
