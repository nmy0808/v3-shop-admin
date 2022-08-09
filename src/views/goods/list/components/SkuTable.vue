<template>
	<el-table :data="goodsSkusCopy" v-if="goodsSkusCopy.length > 0" style="width: 100%" size="small"
		table-layout="auto"
	>
		<el-table-column label="商品规格" fixed align="center">
			<el-table-column :label="item" min-width="80px" fixed align="center" v-for="(item, index) in skusNames"
				:key="index">
				<template #default="{ row }">
					<span> {{ row.skus[index]?.value || '-' }}</span>
				</template>
			</el-table-column>
		</el-table-column>
		<el-table-column align="center" prop="pprice" label="销售价">
			<template #default="{ row }">
				<el-input-number size="small" v-model="row.pprice" :min="0" :precision="2"></el-input-number>
			</template>
		</el-table-column>
		<el-table-column align="center" prop="oprice" label="市场价">
			<template #default="{ row }">
				<el-input-number size="small" v-model="row.oprice" :min="0" :precision="2"></el-input-number>
			</template>
		</el-table-column>
		<el-table-column align="center" prop="cprice" label="成本价">
			<template #default="{ row }">
				<el-input-number size="small" v-model="row.cprice" :min="0" :precision="2"></el-input-number>
			</template>
		</el-table-column>
		<el-table-column align="center" prop="stock" label="库存">
			<template #default="{ row }">
				<el-input-number size="small" v-model="row.stock" :min="0"></el-input-number>
			</template>
		</el-table-column>
		<el-table-column align="center" prop="volume" label="体积">
			<template #default="{ row }">
				<el-input-number size="small" v-model="row.volume" :min="0"></el-input-number>
			</template>
		</el-table-column>
		<el-table-column align="center" prop="weight" label="重量">
			<template #default="{ row }">
				<el-input-number size="small" v-model="row.weight" :min="0"></el-input-number>
			</template>
		</el-table-column>
		<el-table-column align="center" prop="code" label="编码">
			<template #default="{ row }">
				<el-input class="w-30" size="small" v-model="row.code"></el-input>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import cloneDeep from 'lodash/cloneDeep'
import pick from 'lodash/pick'

const props = defineProps({
	goodsSkusCard: {
		type: Array,
		default: () => []
	},
	goodsSkus: {
		type: Array,
		default: () => []
	}
})
const goodsSkusCopy = ref([])


watch(() => props.goodsSkus, () => {
	goodsSkusCopy.value = cloneDeep(props.goodsSkus).map(item => {
		return {
			...item,
			pprice: parseFloat(item.pprice),
			oprice: parseFloat(item.oprice),
			cprice: parseFloat(item.cprice),
			stock: parseFloat(item.stock),
			volume: parseFloat(item.volume),
			weight: parseFloat(item.weight),
		}
	})
}, { immediate: true })

const skusNames = computed(() => {
	if (props.goodsSkusCard.length === 0) {
		return []
	}
	return cloneDeep(props.goodsSkusCard).map(it => it.name)
})

const getData = () => {
	return goodsSkusCopy.value.map(item => pick(item, ['pprice', 'oprice', 'cprice', 'stock', 'volume', 'weight', 'code', 'goods_id', 'image', 'skus']))
}
defineExpose({
	getData
})
</script>

<style scoped lang="scss">
</style>
