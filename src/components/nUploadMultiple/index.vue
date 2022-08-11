<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import NIcon from '@/components/nIcon/index.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: ()=>[]
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
  maxNum: { // 文件数量
    type: Number,
    default: 1
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

const emit = defineEmits(['update:modelValue','upload-success'])

const imgUrl = ref([])

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
  imgUrl.value.push(url)
}

const handleChange = () => {
  const files = fileRef.value.files
	if ((props.modelValue.length + files.length) > props.maxNum ) {
		ElMessage.error(`最多上传${props.maxNum}张文件`)
		return false
	}
	let handleFns = []
	Array.from(files).forEach(file => {
		if (!props.imgType.includes(file.type)) {
			ElMessage.error(props.typeErrorMessage)
			handleFns = []
			return false
		}
		if (file.size > props.maxSize) {
			ElMessage.error(props.sizeErrorMessage)
			handleFns = []
			return false
		}
		handleFns.push(handleUpload(file))
	})
	Promise.all(handleFns)
	.then(_=>{
		emit('upload-success')
	})
	fileRef.value.value = null
}
</script>

<template>
  <div class="upload-multiple">
    <input
      type="file"
      ref="fileRef"
      @change="handleChange"
      style="display: none"
			:multiple="maxNum > 1"
    />
    <div class="upload-main" v-for="(img, index) in imgUrl" :key="index" >
      <el-image
        v-if="img"
        style="width: 100px; height: 100px"
        :src="img"
        :fit="'cover'"
      />
      <div v-if="img" class="close-box">
        <NIcon
          class="icon-close"
          icon="close"
          :size="12"
          color="white"
          @click.stop="imgUrl.splice(index,1)"
        ></NIcon>
      </div>
    </div>
		<!-- 单独增加图片 -->
		<div
			@click="handleUploadClick" class="upload-main"
				v-if="(modelValue.length) < maxNum">
      <NIcon icon="plus" :size="20" color="#cccccc"></NIcon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-multiple {
	display: flex;
}
.upload-main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
	margin-right: 10px;
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
