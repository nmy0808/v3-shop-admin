<template>
  <div class="md:m-4">
		<Skeleton v-if="loading"></Skeleton>
    <template v-else>
			<el-row :gutter="20">
      <template v-for="(item, index) in panelsInfo" :key="index">
        <el-col :span="12" :md="6" :offset="0">
          <el-card shadow="never">
            <div class="flex justify-between">
              <div class="opacity-70">{{ item.title }}</div>
              <el-tag :type="item.unitColor">{{ item.unit }}</el-tag>
            </div>
            <div>
              <el-divider class="m-0 my-6"></el-divider>
              <div class="text-20px font-bold">
								<NCountTo :duration="duration" :value="item.value"></NCountTo>
							</div>
              <el-divider class="m-0 my-6"></el-divider>
            </div>
            <div class="flex justify-between">
              <div class="opacity-70">{{ item.subTitle }}</div>
              <div class="flex">
								{{item.subValue}}
							</div>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="20">
      <template v-for="(item, index) in menusOptions" :key="index">
        <el-col
          :span="6"
          :md="3"
          :offset="0"
          class="cursor-pointer"
          @click="$router.push({ path: item.path })"
        >
          <el-card shadow="never" class="flex justify-center">
            <div class="flex justify-center">
              <NIcon :icon="item.icon" :size="20" :color="item.color"></NIcon>
            </div>
            <div class="text-center">{{ item.title }}</div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24" :md="12" :offset="0">
        <el-card shadow="never" class="h-140" v-loading="orderInfoLoading">
          <div class="flex justify-between mb-4">
            <div class="text-xl">订单统计</div>
            <div>
              <el-tag
                class="cursor-pointer"
                type=""
                size="small"
                :effect="currentOrderType === 'month' ? 'dark' : 'light'"
                @click="handleOrderTabChange('month')"
                >近1个月</el-tag
              >
              <el-tag
                class="cursor-pointer"
                type=""
                size="small"
                :effect="currentOrderType === 'week' ? 'dark' : 'light'"
                @click="handleOrderTabChange('week')"
                >近1周</el-tag
              >
              <el-tag
                class="cursor-pointer"
                type=""
                size="small"
                :effect="currentOrderType === 'hour' ? 'dark' : 'light'"
                @click="handleOrderTabChange('hour')"
                >近24小时</el-tag
              >
            </div>
          </div>
          <el-divider></el-divider>
          <!-- Echarts -->
          <ScEcharts ref="echartsRef" :option="orderInfoCalc" height='300px'></ScEcharts>
        </el-card>
      </el-col>
      <el-col :span="24" :md="12" :offset="0">
        <el-card shadow="never">
          <div class="flex justify-between mb-4">
            <div class="text-xl">店铺及商品提示</div>
            <el-tag type="danger" size="small" effect="light">店铺及商品提示</el-tag>
          </div>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <!-- 商铺及商品提示 -->
            <template v-for="(item, index) in shopAndGoodsInfo.goods" :key="index">
              <el-col :span="6">
                <div
                  class="flex flex-col justify-center items-center bg-gray-100 dark:bg-black/10 h-30"
                >
                  <div class="text-2xl"><NCountTo :duration="duration" :value="item.value" :fixed="0"></NCountTo></div>
                  <div class="mt-2 opacity-70">{{ item.label }}</div>
                </div>
              </el-col>
            </template>
          </el-row>
        </el-card>
        <el-card shadow="never">
          <div class="flex justify-between mb-4">
            <div class="text-xl">交易提示</div>
            <el-tag type="danger" size="small" effect="light"
              >需要立即处理的交易订单</el-tag
            >
          </div>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <!-- 交易提示提示 -->
            <template v-for="(item, index) in shopAndGoodsInfo.order" :key="index">
              <el-col :span="6">
                <div
                  class="flex flex-col justify-center items-center bg-gray-100 dark:bg-black/10 h-30"
                >
                  <div class="text-2xl"><NCountTo :duration="duration" :value="item.value" :fixed="0"></NCountTo></div>
                  <div class="mt-2 opacity-70">{{ item.label }}</div>
                </div>
              </el-col>
            </template>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
		</template>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  statistics1InfoApi,
  statistics2InfoApi,
  statistics3InfoApi,
} from "@/api/model/statistics";
import ScEcharts from "@/components/scEcharts/index.vue";
import { menus as menusOptions } from "./config";
import Skeleton from './components/Skeleton.vue'

const loading = ref(false);
const panelsInfo = ref([]);
const shopAndGoodsInfo = ref([]);
const orderInfo = ref({});
const  duration = ref(1.2)
const orderInfoCalc = computed(() => {
  if (Object.keys(orderInfo.value).length > 0) {
    return {
      xAxis: {
				type: "category",
        data: orderInfo.value.x,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: orderInfo.value.y,
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };
  }
  return {};
});

const currentOrderType = ref("month");
// const panelsInfoLoading = ref(false)
// const shopAndGoodsInfoLoading = ref(false)
const orderInfoLoading = ref(false)

const statistics1InfoData = async () => {
  panelsInfo.value = (await statistics1InfoApi()).data.panels;
};
const statistics1Info2Data = async () => {
  shopAndGoodsInfo.value = (await statistics2InfoApi()).data;
};

const statistics1Info3Data = async () => {
	orderInfoLoading.value = true
	try {
  	orderInfo.value = (await statistics3InfoApi({ type: currentOrderType.value })).data;
	}
	finally {
		orderInfoLoading.value = false
	}
};

const handleOrderTabChange = (tabIndex) => {
  currentOrderType.value = tabIndex;
  statistics1Info3Data();
};

const getData = async () => {
  loading.value = true;
  Promise.all([
    statistics1InfoData(),
    statistics1Info2Data(),
    statistics1Info3Data(),
  ]).finally((_) => {
    loading.value = false;
  });
};


getData();
</script>

<style scoped lang="scss"></style>
