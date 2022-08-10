<template>
	<div class="header">
		<el-button type="primary" size="small" @click="handleCreateMenu">新增分类</el-button>
		<el-button type="primary" size="small" @click="handleCreateImage" plain>上传图片</el-button>
	</div>
	<div class="content">
		<el-card class="select-slider" v-if="!first" v-loading="menusLoading" :body-style="{ padding: 0 }" shadow="never">
			<el-scrollbar>
				<div class="slider-item" :class="{ active: activeMenuId === item.id }" v-for="(item, index) in menuList"
					:key="index" @click="handleMenuClick(item)">
					<span>{{ item.name }}</span>
					<NIcon icon="edit" color="#409EFF" :size="14" style="margin-left: auto; margin-right: 4px"
						@click.stop="handleReNameMenu(item)"></NIcon>
					<NIcon icon="close" color="#409EFF" :size="14" @click.stop="handleRemoveMenu(item)"></NIcon>
				</div>
			</el-scrollbar>
		</el-card>

		<div class="select-content" v-loading="imageLoading">
			<el-card class="item" :class="{ 'cursor-pointer': isSelect ,selected: imageSelected.find(it => it.id === item.id) }"
				@click="handleSelectImage(item)" :body-style="{ padding: 0 }" shadow="never" v-for="(item, index) in imageList"
				:key="index">
				<NImage class="item-image" :src="item.url" lazy></NImage>
				<PreviewImage v-model="imageVisible" :src="imagePreviewUrl"></PreviewImage>
				<div class="item-mask">
					{{ item.name }}
				</div>
				<div class="item-action">
					<el-link class="item-link pr-2 text-sm" type="primary"  @click="handlePreviewImage(item)">浏览</el-link>
					<el-link class="item-link text-sm" type="primary"  @click="handleRenameImage(item)">重命名</el-link>
					<el-link class="item-link delete text-sm" type="danger"  @click="handleRemoveImage(item)">删除</el-link>
				</div>
			</el-card>
			<span style="width: 300px" v-for="(item, index) in 4" :key="index"></span>
			<!-- @size-change="handleSizeChange" @current-change="handleCurrentChange"  -->
		</div>
	</div>
	<div class="page-wrap" v-if="!menusLoading">
		<div class="slider-page" >
			<el-button type="primary" plain icon="el-icon-arrowLeft" @click="handleMenuPrevChange(-1)"
				:disabled="menuListPage.page === 1">
			</el-button>
			<el-button type="primary" plain icon="el-icon-arrowRight" @click="handleMenuNextChange(1)" :disabled="menuListPage.page ===
			Math.ceil(menusTotal / menuListPage.limit)">
			</el-button>
		</div>
		<el-pagination :page-sizes="[10, 20, 30]" v-model:current-page="imageListPage.page"
			v-model:page-size="imageListPage.limit" :total="imageListTotal" layout="total, sizes, prev, pager, next, jumper"
			@size-change="getImageListData" @current-change="getImageListData">
		</el-pagination>
		<MenuRenameDrawer ref="menuRenameDrawerRef" />
		<MenuImageDrawer ref="menuImageDrawerRef" :get-data="getImageListData" />
	</div>
	<!-- <template v-else>
		<div class="flex">
			<div>
				<el-skeleton  animated :rows="5" class="w-70"></el-skeleton>
			<el-skeleton  animated :rows="10" class="w-70 mt-5"></el-skeleton>
			</div>
			<div>
				<el-skeleton  animated :rows="10" class="w-230 ml-20 mt-30"></el-skeleton>
			</div>
		</div>
	</template> -->
</template>

<script setup>
import { imageMenusApi, imageListByIdApi } from '@/api/model/imageClass.js';
import { renameImageApi, removeImageByIdApi } from '@/api/model/image.js';
import { ref, watch } from 'vue'
import NIcon from '@/components/nIcon/index.vue'
import MenuRenameDrawer from './components/MenuRenameDrawer.vue'
import MenuImageDrawer from './components/MenuImageDrawer.vue'
import NImage from '@/components/nImage/index.vue'
import PreviewImage from './components/PreviewImage.vue'
import cloneDeep from 'lodash/cloneDeep'
import { confirm, notification, prompt } from '@/libs/elementPlus'

const props = defineProps({
	// selectedImages: { // 当前选中的
	// 	type: Array,
	// 	default: () => []
	// },
	isSelect: { // 开启选择图片
		type: Boolean,
		default: false
	},
	multiple: { // 多选图片
		type: Boolean,
		default: false
	},
	maxSelectSize: {
		type: Number,
		default: 6
	},
	imagePageLimit: { // 图片列表一次请求多少个数据
		type: Number,
		default: 10
	},
	menuPageLimit: { // 图片列表一次请求多少个数据
		type: Number,
		default: 10
	}
})

const emit = defineEmits(['select'])

const menuListPage = ref({
	page: 1,
	limit: 10
})

const activeMenuId = ref(null)
const menuList = ref([])
const menusTotal = ref(0)
const renameVisible = ref(false)
let first = ref(true)
const menusLoading = ref(false)
const skeleton = ref(true) // 骨架屏
const getMenusData = async () => {
	try {
		menusLoading.value = true
		const { data } = await imageMenusApi({ page: menuListPage.value.page, limit: props.menuPageLimit })
		menuList.value = data.list
		menusTotal.value = data.totalCount
		first.value && (activeMenuId.value = menuList.value[0].id)
		first.value = false
	}
	finally {
		menusLoading.value = false
	}
}

const handleMenuPrevChange = async (value) => {
	const page = menuListPage.value.page + value
	if (page < 1) {
		return
	} else {
		menuListPage.value.page = page
		await getMenusData()
		activeMenuId.value = menuList.value[0].id
	}
}
const handleMenuNextChange = async (value) => {
	const page = menuListPage.value.page + value
	if (menusTotal.value < page * menuListPage.value.limit - menuListPage.value.limit) {
		return
	} else {
		menuListPage.value.page = page
		await getMenusData()
		activeMenuId.value = menuList.value[0].id
	}
}
const menuRenameDrawerRef = ref(null)

const handleCreateMenu = () => {
	menuRenameDrawerRef.value.open({})
	renameVisible.value = true
}

const handleReNameMenu = (menuItem) => {
	menuRenameDrawerRef.value.open({ data: cloneDeep(menuItem) })
	renameVisible.value = true
}

const handleRemoveMenu = async (menuItem) => {
	const flag = await confirm({ message: '确定删除?' })
	flag && notification({ message: '演示数据', type: 'success' })
}

const menuImageDrawerRef = ref(null)

const handleCreateImage = () => {
	menuImageDrawerRef.value.open(activeMenuId.value)
}

const imageListPage = ref({
	page: 1,
	limit: props.imagePageLimit
})
const imageList = ref([])
const imageListTotal = ref(0)
const imageLoading = ref(false)
const imageSelected = ref([]) // 当前选中图片
const getImageListData = async () => {
	try {
		imageLoading.value = true
		const { data } = await imageListByIdApi({ id: activeMenuId.value, page: imageListPage.value.page, limit: imageListPage.value.limit })
		imageList.value = data.list
		imageListTotal.value = data.totalCount
	}
	finally {
		imageLoading.value = false
	}
}

getMenusData()

// 监听菜单点击, 刷新右侧列表
watch(activeMenuId, () => {
	if (activeMenuId.value) {
		getImageListData()
	}
}, { immediate: true })

const handleMenuClick = (item) => {
	activeMenuId.value = item.id
}

const imageVisible = ref(false)
const imagePreviewUrl = ref('')
const handlePreviewImage = (imageItem) => {
	imagePreviewUrl.value = imageItem.url
	imageVisible.value = true
}

const handleRenameImage = async (imageItem) => {
	try {
		const value = await prompt({ message: '重命名', inputValue: imageItem.name })
		await renameImageApi({ id: imageItem.id, name: value })
		await getImageListData()
		notification({ message: '重命名完成', type: 'success' })
	}
	catch (error) { }
}
const handleRemoveImage = async (imageItem) => {
	try {
		const flag = await confirm({ message: '确定删除吗?' })
		if (flag) {
			await removeImageByIdApi({ ids: [imageItem.id] })
			await getImageListData()
			notification({ message: '删除成功', type: 'success' })
		}
	}
	catch (error) { }
}
// 选择图片, 并判断是否多选
const handleSelectImage = (imageItem) => {
	if (!props.isSelect) return
	const index = imageSelected.value.findIndex(it => it.id === imageItem.id)
	// 如果当前是选中
	if (index === -1) {
		if (props.maxSelectSize === imageSelected.value.length) {
			notification({ message: `最多只能选择${props.maxSelectSize}张图片`, type: 'warning' })
			return
		}
		if (props.multiple) {
			imageSelected.value.push(imageItem)
		} else {
			imageSelected.value = [imageItem]
		}
	} else {
		// 如果当前是取消选中
		imageSelected.value.splice(index, 1)
	}
	emit('select', [...imageSelected.value])
	// emit('update:selectedImages', [...imageSelected.value])
}


// 清空选中图片
const clearSelected = ()=>{
	imageSelected.value = []
}

defineExpose({ clearSelected })

</script>

<style scoped lang="scss">
.header {
	margin-bottom: 10px;
}

.content {
	display: flex;

	.select-slider {
		width: 200px;
		min-height: 448px;
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
		min-height: 448px;
		.item {
			position: relative;
			width: 300px;
			height: 214px;
			margin-bottom: 20px;

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
		width: 198px;
	}
}
</style>
