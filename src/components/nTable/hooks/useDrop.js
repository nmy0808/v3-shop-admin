import { ref, nextTick, onMounted } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import Sortable from 'sortablejs'

export default function ({ tableRef, emit, dataClone, props }) {
  const refreshKey = ref(1) // 解决排序后表格显示不正确的bug
  // 开启排序
  const rowDrop = () => {
    const tbody = tableRef.value?.$el.querySelector(
      '.el-table__body-wrapper tbody'
    )
    Sortable.create(tbody, {
      handle: '.move',
      animation: 300,
      ghostClass: 'ghost',
      onEnd({ newIndex, oldIndex }) {
        const tableData = dataClone.value
        const currRow = tableData.splice(oldIndex, 1)[0]
        tableData.splice(newIndex, 0, currRow)
        emit('dragSort', cloneDeep(tableData))
        // 解决排序后表格显示不正确的bug
        refreshKey.value += 1
        nextTick(() => {
          rowDrop()
        })
      }
    })
  }
  onMounted(() => {
    props.dragSort && rowDrop()
  })
  return {
    refreshKey,
    rowDrop
  }
}
