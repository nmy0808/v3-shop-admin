<template>
	<NContainer>
		<NSearchHeader :schema="searchSchema" :showFold="true" @search="handleSearch">
			<template #right>
				<el-button size="small" icon="el-icon-refresh" @click="getListData"></el-button>
			</template>
		</NSearchHeader>
		<NTable table-layout="auto" row-key="id" ref="tableRef" :data="list" :options="tableOptions" :dragSort="false"
			:loading="loading" :total="total" v-model:currentPage="pageSearch.page" v-model:pageSize="pageSearch.limit">
			<template #expand="{ row }">
				<div class="flex pl-23">
					<NAvatar :src="row.user.avatar"></NAvatar>
					<div class="ml-4 flex-1">
						<div>
							<span>{{ row.user.username }}</span>
							<span class="ml-2 opacity-60">2011-11-11</span>
						</div>
						<div class="mb-2">{{ row.review.data }}</div>
						<el-image v-for="(item, index) in row.review.image" :key="index" :src="item" class="w-30 h-30"></el-image>
						<template v-for="(item, index) in row.extra" :key="index">
							<div class="flex justify-between bg-gray-100 mt-4 mr-4 rounded-4px p-4 dark:bg-black/40">
								<div>
									<div class="text-xl">{{ !item.isuser ? "客服" : "客户" }}</div>
									<div class="mt-2" v-if="!item.edit">{{ item.data }}</div>
									<el-input v-else class="mt-2 w-1000px" v-model="item.data" :rows="4" type="textarea"
										placeholder="说点什么吧~" :disabled="item.editLoading">
									</el-input>
								</div>
								<el-button v-show="!item.edit" type="primary" size="small" @click="item.edit = true">修改</el-button>
								<div class="w-50 flex justify-end" v-show="item.edit">
									<el-button type="" size="small" @click="item.edit = false" :loading="item.editLoading">取消</el-button>
									<el-button type="success" size="small" @click="handleReviewChange(row, item, item.data)"
										:loading="item.editLoading">保存</el-button>
								</div>
							</div>
						</template>
					</div>
				</div>
			</template>
			<!-- 商品 -->
			<template #goods_info="{ row }">
				<div class="flex">
					<NAvatar class="rounded-2px" :src="row.goods_item.cover"></NAvatar>
					<div class="ml-4">
						<div class="text-base font-semibold mt-4">{{ row.goods_item.title }}</div>
					</div>
				</div>
			</template>
			<!-- 评价信息 -->
			<template #comment="{ row }">
				<div>用户: {{ row.user.username || row.user.nickname }}</div>
				<el-rate v-model="row.rating" disabled text-color="#ff9900" />
			</template>
			<!-- 状态 -->
			<template #status="{ row }">
				<el-switch v-model="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading" size="small"
					@click="handleStatusChange(row)" />
			</template>
		</NTable>
		<ActionDrawer ref="actionDrawerRef" :getListData="getListData"></ActionDrawer>
	</NContainer>
</template>
<script>
import { ref } from "vue";
import { searchSchema } from "./config/searchSchema";
import { tableOptions } from "./config/tableOptions";
import {
	goodsCommentListApi,
	goodsCommentStatusApi,
	goodsCommentReviewApi,
} from "@/api/model/goodsComment";
import ActionDrawer from "./components/ActionDrawer.vue";
import { usePageAction } from "@/hooks/usePageAction";
import { notification } from "@/libs/elementPlus";

const useUserList = () => {
	const listSearchParams = ref({
		keyword: "",
		user_level_id: "",
	});

	const {
		loading,
		list,
		pageSearch,
		total,
		getListData,
		deleteData,
		statusData,
	} = usePageAction({
		listSearchParams,
		listDataApi: goodsCommentListApi,
		statusDataApi: goodsCommentStatusApi,
	});

	const handleStatusChange = async (row) => {
		statusData({
			params: { id: row.id, status: row.status },
			row,
		});
	};

	const handleSearch = (model) => {
		listSearchParams.value = model;
		getListData();
	};

	const handleReviewChange = async (row, extraItem, data) => {
		const params = {};
		params.id = row.id;
		params.data = extraItem.data;
		extraItem.editLoading = true
		await goodsCommentReviewApi(params);
		extraItem.editLoading = false
		notification({ message: "提交完成", type: "success" });
		extraItem.edit = false;
	};

	return {
		list,
		loading,
		pageSearch,
		total,
		getListData: getListData,
		handleStatusChange,
		handleSearch,
		handleDelete: deleteData,
		handleReviewChange,
	};
};

const useAction = () => {
	const actionDrawerRef = ref(null);

	const handleCreate = () => {
		actionDrawerRef.value.open({ title: "新增" });
	};
	const handleEdit = (data) => {
		actionDrawerRef.value.open({ title: "编辑", data });
	};

	return {
		actionDrawerRef,
		handleCreate,
		handleEdit,
	};
};
</script>

<script setup>
const {
	list,
	loading,
	pageSearch,
	total,
	handleStatusChange,
	getListData,
	handleSearch,
	handleReviewChange,
} = useUserList();

getListData();

const { actionDrawerRef, handleCreate, handleEdit } = useAction();
</script>

<style scoped lang="scss">
</style>
