
export default function ({ props, emit }) {
  const handleSizeChange = (value) => {
    emit('update:pageSize', value)
    props.getData && props.getData()
  }
  const handleCurrentChange = (value) => {
    emit('update:currentPage', value)
    props.getData && props.getData()
  }
  return {
    handleSizeChange,
    handleCurrentChange
  }
}
