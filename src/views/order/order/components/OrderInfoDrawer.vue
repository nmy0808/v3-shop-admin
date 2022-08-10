<template>
	<div class="">
		<NDrawer v-model="isVisible" :title="currentTitle" :loading="loading" @cancel="isVisible = false"
			@confirm="handleSubmit">
			<el-card shadow="never" header="订单信息" v-if="currentData">
				<el-form label-width="80px" size="default">
					<el-form-item label="订单号" prop="name">
						{{ currentData.no }}
					</el-form-item>
					<el-form-item label="付款方式" prop="password">
						{{ currentData.payment_method === ALIPAY_TYPE ? '支付宝支付' : '未支付' }}
					</el-form-item>
					<el-form-item label="付款时间" prop="password">
						{{ getPaidTime() }}
					</el-form-item>
					<el-form-item label="创建时间" prop="password">
						{{ currentData.create_time }}
					</el-form-item>
				</el-form>
			</el-card>
			<el-card shadow="never" header="商品信息" class="mt-4" v-if="currentData">
				<template v-for="(item, index) in currentData.order_items" :key="index">
					<div>
						<div class="flex">
							<NAvatar :src="item.goods_item.cover" class="mr-4 w-20 h-20 rounded-2px"></NAvatar>
							<div>
								<div class="mb-2 text-12px">{{ item.goods_item.title }}</div>
								<el-tag size="small" v-if="item.goods_skus">{{ Object.values(item?.goods_skus?.skus).map(it =>
										it.value).join(', ')
								}}</el-tag>
								<div class="mt-2 ">
									<span class="text-red-500">
										&yen;{{ item.price }}
									</span>
									<span class="ml-2 text-sm text-gray-400">x {{ item.num }}</span>
								</div>
							</div>
						</div>
						<div class="mt-4">
							<span>成交价</span>
							<span class="ml-4 text-red-500">&yen;{{ item.price }}</span>
						</div>
					</div>
				</template>
			</el-card>
			<el-card shadow="never" header="收货信息" class="mt-4" v-if="currentData">
				<el-form label-width="80px" size="default">
					<el-form-item label="收货人" prop="name">
						{{ currentData.address.name }}
					</el-form-item>
					<el-form-item label="联系方式" prop="password">
						{{ currentData.address.phone }}
					</el-form-item>
					<el-form-item label="收货地址" prop="password">
						{{ `${currentData.address.province}${currentData.address.city}${currentData.address.district}` }}
					</el-form-item>
				</el-form>
			</el-card>
		</NDrawer>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { userCreateApi, userEditApi } from '@/api/model/user'
import { usePageAction } from '@/hooks/usePageAction'
import { ALIPAY_TYPE } from '@/constant/'
import { useDateFormat } from '@vueuse/core'



const props = defineProps({
	getListData: {
		type: Function,
		default: null
	}
})

const { createData, updateData, loading } = usePageAction({
	createDataApi: userCreateApi,
	updateDataApi: userEditApi
})

const isVisible = ref(false)


const currentTitle = ref('')

// 当前编辑对象 (新增状态为null)
let currentData = ref(null)

// 关闭时重置
watch(isVisible, () => {
	if (!isVisible.value) {
		currentData.value = null
	}
})


const open = ({ title, data }) => {
	currentTitle.value = title
	currentData.value = data
	isVisible.value = true
}

const handleSubmit = async (model) => {
	if (currentData.value) {
		await updateData({
			params: { ...model, id: currentData.value.id },
			callback: () => {
				isVisible.value = false
				props.getListData && props.getListData()
			}
		})
	} else {
		await createData({
			params: model,
			callback: () => {
				isVisible.value = false
				props.getListData && props.getListData()
			}
		})
	}
}
const getPaidTime = () => {
	const time = useDateFormat(currentData.value.paid_time * 1000, 'YYYY-MM-DD HH:mm:ss')
	return time.value
}
defineExpose({
	open
})
</script>

<style scoped lang="scss">
</style>
