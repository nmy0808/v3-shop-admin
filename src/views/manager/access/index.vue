<template>
	<NContainer>
		<NActionHeader @create="handleCreate" @refresh="getListData" />
		<el-tree ref="treeRef" :data="list" :props="defaultProps" node-key="id" :default-expanded-keys="defaultExpandedKeys"
			:expand-on-click-node="false" v-loading="loading">
			<template #="{ data }">
				<el-tag v-if="data.menu === 1" size="small" effect="light">
					菜单
				</el-tag>
				<el-tag v-else type="info" size="small" effect="light">
					权限
				</el-tag>
				<span class="ml-2">{{ data.name }}</span>
				<el-switch class="ml-auto" v-model="data.status" :active-value="1" :inactive-value="0"
					@click="handleStatus(data)"></el-switch>
				<el-button class="ml-3"  :disabled="data.menu === 0" :type="data.menu === 0 ? 'info' : 'primary'" size="small"
					text @click="handlePushRule(data)">增加</el-button>
				<el-button class="!ml-0" type="primary" size="small" text @click="handleEdit(data)">修改</el-button>
				<el-button class="!ml-0" type="danger" size="small" text @click="handleDelete(data)">删除</el-button>
			</template>
		</el-tree>
		<ActionDrawer ref="actionDrawerRef" :ruleList="list" :getListData="getListData" />
	</NContainer>
</template>
<script>
</script>

<script setup>
import { computed, ref } from 'vue'
import { ruleListApi, ruleStatusApi, ruleDeleteApi } from '@/api/model/rule'
import { usePageAction } from '@/hooks/usePageAction'
import ActionDrawer from './components/ActionDrawer.vue'

const { loading, list, getListData, statusData, deleteData } = usePageAction({
	listDataApi: ruleListApi,
	statusDataApi: ruleStatusApi,
	deleteDataApi: ruleDeleteApi
})
const defaultProps = {
	children: 'child'
}

const treeRef = ref(null)
const defaultExpandedKeys = computed(() => {
	return list.value.map(it => it.id)
})
getListData()

const handleStatus = (row) => {
	statusData({ params: { id: row.id, status: row.status }, row })
}
const handleDelete = (row) => {
	deleteData(row)
}

const actionDrawerRef = ref(null)
const handleCreate = () => {
	actionDrawerRef.value.open({ title: '新增' })
}
const handlePushRule = (data) => {
	actionDrawerRef.value.open({
		title: '新增',
		data: { rule_id: data.id }
	})
}
const handleEdit = (data) => {
	actionDrawerRef.value.open({ title: '编辑', data: data })
}


</script>

<style scoped lang="scss">
:deep(.el-tree-node__content) {
	@apply py-6;
}
</style>

