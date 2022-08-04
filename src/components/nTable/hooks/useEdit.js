import { ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

export default function ({ dataClone, props, validate, emit }) {
  // 行: 当前激活编辑的行的索引 $index
  const activeRowIndex = ref(-1)

  // 单元格:当前激活编辑的单元格的唯一id  ( $index + column.id )
  const activeColEditId = ref(-1)

  // 行: 根据行索引激活当前行的编辑状态
  const activeRowEditByIndex = (index) => {
    // 先恢复初始data数据
    dataClone.value = cloneDeep(props.data)
    activeColEditId.value = -1
    activeRowIndex.value = index
  }

  // 单元格: 点击单元格编辑
  const handleActiveEdit = (scope) => {
    // 先恢复初始data数据
    dataClone.value = cloneDeep(props.data)
    activeRowIndex.value = -1
    activeColEditId.value = scope.$index + scope.column.id
  }

  // 单元格: 点击单元格确认编辑
  const handleConfirm = async (scope) => {
    await validate()
    activeColEditId.value = -1
    activeRowIndex.value = -1
    const index = scope.$index
    const row = cloneDeep(scope.row)
    const oldRow = cloneDeep(props.data[index])
    const payload = {
      row,
      oldRow,
      index,
      data: cloneDeep(dataClone.value)
    }
    const flag = isEqual(row, oldRow)
    // 只有修改了数据, 才会触发事件
    if (!flag) {
      emit('confirm', payload)
      return payload
    } else {
      return null
    }
  }

  // 行 和 单元格: 点击取消编辑
  const handleCancel = () => {
    activeColEditId.value = -1
    activeRowIndex.value = -1
    // 恢复初始data数据
    dataClone.value = cloneDeep(props.data)
  }
  // 行: 确定当前行编辑
  const confirmRowEdit = async () => {
    await validate()
    const $index = activeRowIndex.value
    const row = dataClone.value[$index]
    const scope = { $index, row }
    return handleConfirm(scope)
  }
  const resetFields = () => (dataClone.value = cloneDeep(props.data))
  return {
    activeRowIndex,
    activeColEditId,
    activeRowEditByIndex,
    handleActiveEdit,
    handleConfirm,
    handleCancel,
    confirmRowEdit,
    resetFields
  }
}
