<template>
  <el-row class="flex w-full px-4">
    <template v-for="(item, index) in 4" :key="index">
      <el-col :span="6">
        <el-card shadow="never" class="!mb-0 mt-4 mr-5">
          <div class="flex">
            <div class="flex items-center justify-center w-14 h-14 m4-2 rounded-full">
              <el-skeleton>
                <template #template>
                  <el-skeleton-item variant="rect" class="w-14" />
                </template>
              </el-skeleton>
            </div>
            <div class="ml-3">
              <el-skeleton>
                <template #template>
                  <el-skeleton-item variant="rect" class="w-10" />
                </template>
              </el-skeleton>
							<el-skeleton>
                <template #template>
                  <el-skeleton-item variant="rect" class="w-20" />
                </template>
              </el-skeleton>
            </div>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<script setup></script>

<style scoped lang="scss"></style>
