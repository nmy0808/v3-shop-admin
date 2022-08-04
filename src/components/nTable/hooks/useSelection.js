import cloneDeep from 'lodash/cloneDeep'

export default function ({ tableRef, emit }) {
  // 选中的row
  // const multipleSelection = ref<any[]>([])
  // 监听 多选选中
  const handleSelectionChange = (selection) => {
    emit('selectionChange', cloneDeep([...selection]))
  }
  // 设置选中row
  // const toggleRowSelection = (rows: any[], flag = true) => {
  //   rows.forEach((row) => {
  //     // 如果不填第二个参数, 会切换选中状态
  //     tableRef.value?.toggleRowSelection(row, flag)
  //   })
  // }

  // 清空选中状态
  const clearSelection = () => {
    tableRef.value?.clearSelection()
  }
  return {
    handleSelectionChange,
    clearSelection
  }
}
