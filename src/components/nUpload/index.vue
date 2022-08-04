<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import NIcon from '@/components/nIcon/index.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  customUpload: {
    type: Function,
    default: null
  },
  imgType: {
    type: Array,
    default: () => ['image/jpeg']
  },
  maxSize: {
    type: Number,
    default: 1024 * 1024 * 2
  },
  typeErrorMessage: {
    type: String,
    default: '上传文件格式不正确'
  },
  sizeErrorMessage: {
    type: String,
    default: '上传文件格式大小超出限制'
  }
})

const emit = defineEmits(['update:modelValue'])

const imgUrl = ref('')

watch(
  () => props.modelValue,
  () => {
    imgUrl.value = props.modelValue
  },
  { deep: true, immediate: true }
)

watch(imgUrl, () => {
  emit('update:modelValue', imgUrl.value)
})

const fileRef = ref(null)

const handleUploadClick = () => {
  fileRef.value?.click()
}

const handleUpload = async (file) => {
  if (!props.customUpload) {
    return console.error('上传组件缺少配置customUpload')
  }
  const url = await props.customUpload(file)
  imgUrl.value = url
}

const handleChange = () => {
  const files = fileRef.value.files
  const file = files[0]
  if (files.length > 1 || files.length === 0) {
    ElMessage.error('只能上传一张文件')
    return false
  }
  if (!props.imgType.includes(file.type)) {
    ElMessage.error(props.typeErrorMessage)
    return false
  }
  if (file.size > props.maxSize) {
    ElMessage.error(props.sizeErrorMessage)
    return false
  }
  handleUpload(file)
}
</script>

<template>
  <div>
    <input
      type="file"
      ref="fileRef"
      @change="handleChange"
      style="display: none"
    />
    <div @click="handleUploadClick" class="upload-main">
      <NIcon v-if="!imgUrl" icon="plus" :size="20" color="#cccccc"></NIcon>
      <el-image
        v-if="imgUrl"
        style="width: 100px; height: 100px"
        :src="imgUrl"
        :fit="'cover'"
      />
      <div v-if="imgUrl" class="close-box">
        <NIcon
          class="icon-close"
          icon="close"
          :size="12"
          color="white"
          @click.stop="imgUrl = ''"
        ></NIcon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  .close-box {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    border: 1px solid #cccccc;
  }
}
</style>
<script>
export default {
  name: 'NUpload'
}
</script>
