<template>
	<teleport to='body'>
		<div
			 v-show="isVisible" 
			 class='fixed left-0 top-0 right-0 bottom-0
			 flex items-center justify-center bg-black/50
			 z-index-9999'>
			<div class='w-1200px h-600px bg-white p-10 rounded-2px'>
				<div class='relative -top-14px text-xl'>选择规格</div>
				<div class="content mt-4">
					<el-card class="select-slider" v-loading="menusLoading" :body-style="{ padding: 0 }" 
						shadow="never">
						<el-scrollbar>
							<!-- :class="{ active: activeMenuId === item.id }" -->
							<div
								v-for="item in list" :key="item.id" @click="handleMenuClick(item)"
								class="slider-item" 
								:class="{ active: currentItem?.id === item.id }"
								>
								<span>{{ item.name }}</span>
							</div>
						</el-scrollbar>
					</el-card>
					<el-scrollbar height="448px">
						<div class="select-content">
							<el-card class="item" :class="{ selected: selectedDefaultValueList.find(it => it === item) }"
								@click="handleSelect(item)" :body-style="{ padding: 0 }" shadow="never" 
								v-for="(item, index) in currentDefaultValuesCalc"
								:key="index">
								{{item}}
							</el-card>
							<!-- <span style="width: 300px" v-for="(item, index) in 4" :key="index"></span> -->
							<!-- @size-change="handleSizeChange" @current-change="handleCurrentChange"  -->
						</div>
					</el-scrollbar>
				</div>
				<div class="page-wrap">
					<div class="slider-page ml-14">
						<el-button type="primary" plain icon="el-icon-arrowLeft" @click="handleMenuPrevChange(-1)">
						</el-button>
						<el-button type="primary" plain icon="el-icon-arrowRight" @click="handleMenuNextChange(1)">
						</el-button>
					</div>
					<div>
						<el-button @click="isVisible = false">取消</el-button>
						<el-button type="primary" @click="handleConfirm">确定</el-button>
					</div>
				</div>
			</div>
		</div>
	</teleport>

</template>

<script setup>
// import { imageMenusApi, imageListByIdApi } from '@/api/model/imageClass.js';
import { skuListApi, skuStatusApi, skuDeleteApi } from '@/api/model/skus'
import { ref, watch,computed } from 'vue'
import NIcon from '@/components/nIcon/index.vue'
import cloneDeep from 'lodash/cloneDeep'
import { confirm, notification, prompt } from '@/libs/elementPlus'
import { usePageAction } from '@/hooks/usePageAction'

const props = defineProps({

})

const emit = defineEmits(['select'])

const isVisible = ref(false)
const menusLoading = ref(false)
const currentItem = ref(null)

const selectedDefaultValueList = ref([])


const { loading, list, pageSearch, total, getListData, deleteData, statusData } =
		usePageAction({
			listDataApi: skuListApi,
			deleteDataApi: (row) => skuDeleteApi({ids: [row.id]}),
			statusDataApi: skuStatusApi
		})

// 当前tags
const currentDefaultValuesCalc = computed(()=>{
	if(currentItem.value ){
		return currentItem.value.default.split(',')
	}else {
		return []
	}
})
const handleStatusChange = async (row) => {
	statusData({
		params: { id: row.id, status: row.status },
		row
	})
}


let callBack = null
const open = (cb) => {
	callBack = cb
	getListData().then(_=>{
		currentItem.value = list.value?.[0] || null
		isVisible.value = true
	})
 }

const handleMenuClick = (item) => { 
	currentItem.value = item
	selectedDefaultValueList.value = []
}
const handleSelect = (defaultValue) => {
	const index = selectedDefaultValueList.value.findIndex(it => it === defaultValue)
	if(index === -1){
		selectedDefaultValueList.value.push(defaultValue)
	}else {
		selectedDefaultValueList.value.splice(index, 1)
	}
 }
const handleMenuPrevChange = () => { }
const handleMenuNextChange = () => { }
const handleConfirm = ()=>{
	const params = {}
	params.name = currentItem.value.name
	params.value = [...selectedDefaultValueList.value]
	if(callBack && params.value.length > 0){
		callBack && callBack(params)
	}
	isVisible.value = false
}

watch(isVisible, ()=>{
	if(!isVisible.value){
		currentItem.value = null
		selectedDefaultValueList.value = []
		callBack = null
	}
})

defineExpose({ open })

</script>

<style scoped lang="scss">
.header {
	margin-bottom: 10px;
}

.content {
	display: flex;

	.select-slider {
		width: 200px;
		height: 448px;
		margin-bottom: 20px;

		.slider-item {
			display: flex;
			align-items: center;
			height: 45px;
			padding: 0 10px;
			cursor: pointer;
			user-select: none;
			transition: all 0.3s;
			font-size: 14px;

			&:hover {
				color: var(--el-color-primary);
			}

			&.active {
				background: #edf4ff;
				color: var(--el-color-primary);
			}

		}
	}

	.select-content {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		justify-content: space-evenly;

		.item {
			position: relative;
			// width: 300px;
			// height: 214px;
			padding: 4px 10px;
			margin: 10px;
			margin-top: 4px;
			cursor: pointer;

			&.selected {
				outline: 1px solid var(--el-color-primary);
			}

			.item-image {
				width: 100%;
				height: 170px;
			}

			.item-mask {
				position: absolute;
				left: 0;
				right: 0;
				top: 140px;
				height: 30px;
				line-height: 30px;
				color: white;
				text-indent: 1em;
				background: rgba(0, 0, 0, 0.5);
			}

			.item-action {
				display: flex;
				justify-content: flex-end;

				.item-link {
					margin: 10px 0;

					&.delete {
						margin-left: 8px;
						margin-right: 8px;
					}
				}
			}
		}
	}
}

.page-wrap {
	display: flex;
	justify-content: space-between;
	// margin-top: 20px;

	.slider-page {
		display: flex;
		justify-content: center;
	}
}
</style>
