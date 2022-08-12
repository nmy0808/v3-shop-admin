<template>
  <el-row :gutter="20">
    <template v-for="(item, index) in 4" :key="index">
      <el-col :span="12" :md="6" :offset="0">
        <el-card shadow="never">
          <div class="flex justify-between">
            <div class="opacity-70">
              <el-skeleton animated class="w-20">
                <template #template>
                  <el-skeleton-item variant="rect" />
                </template>
              </el-skeleton>
            </div>
            <el-skeleton animated class="w-10">
              <template #template>
                <el-skeleton-item variant="rect" />
              </template>
            </el-skeleton>
          </div>
          <div>
            <el-divider class="m-0 my-6"></el-divider>
            <div class="text-20px font-bold">
              <el-skeleton animated class="w-20">
                <template #template>
                  <el-skeleton-item variant="rect" />
                </template>
              </el-skeleton>
            </div>
            <el-divider class="m-0 my-6"></el-divider>
          </div>
          <div class="flex justify-between">
            <div class="opacity-70">
              <el-skeleton animated class="w-30">
                <template #template>
                  <el-skeleton-item variant="rect" />
                </template>
              </el-skeleton>
            </div>
            <el-skeleton animated class="w-10">
              <template #template>
                <el-skeleton-item variant="rect" />
              </template>
            </el-skeleton>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
  <el-row :gutter="20">
    <template v-for="(item, index) in 8" :key="index">
      <el-col :span="6" :md="3" :offset="0" class="cursor-pointer">
        <el-card shadow="never" class="flex justify-center">
          <div class="flex justify-center">
            <el-skeleton animated class="w-10">
              <template #template>
                <el-skeleton-item variant="rect" />
              </template>
            </el-skeleton>
          </div>
          <div class="flex justify-center mt-1">
            <el-skeleton animated class="w-10">
              <template #template>
                <el-skeleton-item variant="rect" />
              </template>
            </el-skeleton>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24" :md="12" :offset="0">
      <el-card shadow="never" class="h-140">
        <div class="flex justify-between mb-4">
          <el-skeleton animated class="w-20">
            <template #template>
              <el-skeleton-item variant="rect" />
            </template>
          </el-skeleton>
          <div class="flex w-70 justify-between">
            <el-skeleton animated class="w-20">
              <template #template>
                <el-skeleton-item variant="rect" />
              </template>
            </el-skeleton>
            <el-skeleton animated class="w-20">
              <template #template>
                <el-skeleton-item variant="rect" />
              </template>
            </el-skeleton>
            <el-skeleton animated class="w-20">
              <template #template>
                <el-skeleton-item variant="rect" />
              </template>
            </el-skeleton>
          </div>
        </div>
        <el-divider></el-divider>
        <!-- Echarts -->
        <el-skeleton animated :rows="5" class="mt-20"></el-skeleton>
      </el-card>
    </el-col>
    <el-col :span="24" :md="12" :offset="0">
      <el-card shadow="never">
        <div class="flex justify-between mb-4">
          <el-skeleton animated class="w-30">
            <template #template>
              <el-skeleton-item variant="rect" />
            </template>
          </el-skeleton>
          <el-skeleton animated class="w-20">
            <template #template>
              <el-skeleton-item variant="rect" />
            </template>
          </el-skeleton>
        </div>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <!-- 商铺及商品提示 -->
          <template v-for="(item, index) in 4" :key="index">
            <el-col :span="6">
              <div
                class="flex flex-col justify-center items-center bg-gray-100 dark:bg-black/10 h-30"
              >
                <el-skeleton animated class="w-10">
									<template #template>
										<el-skeleton-item variant="rect" />
										<el-skeleton-item variant="rect" class="mt-2" />
									</template>
         			 </el-skeleton>
              </div>
            </el-col>
          </template>
        </el-row>
      </el-card>
      <el-card shadow="never">
        <div class="flex justify-between mb-4">
          <el-skeleton animated class="w-30">
            <template #template>
              <el-skeleton-item variant="rect" />
            </template>
          </el-skeleton>
          <el-skeleton animated class="w-20">
            <template #template>
              <el-skeleton-item variant="rect" />
            </template>
          </el-skeleton>
        </div>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <!-- 交易提示提示 -->
          <template v-for="(item, index) in 4" :key="index">
            <el-col :span="6">
              <div
                class="flex flex-col justify-center items-center bg-gray-100 dark:bg-black/10 h-30"
              >
                 <el-skeleton animated class="w-10">
									<template #template>
										<el-skeleton-item variant="rect" />
										<el-skeleton-item variant="rect" class="mt-2" />
									</template>
         			 </el-skeleton>
              </div>
            </el-col>
          </template>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup></script>

<style scoped lang="scss"></style>
