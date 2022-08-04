export default function ({ formRef }) {
  // 验证当前行
  function validate() {
    let formRefList = []
    const promiseList= []
    if (Array.isArray(formRef.value)) {
      formRefList = formRef.value
    } else {
      formRef.value && formRefList.push(formRef.value)
    }
    formRefList.forEach((formRef) => {
      const promise = new Promise((resolve, reject) => {
        formRef.validate((valid) => {
          if (valid) {
            resolve(valid)
          } else {
            reject(valid)
          }
        })
      })
      promiseList.push(promise)
    })

    return new Promise((resolve, reject) => {
      Promise.all(promiseList).then((_) => {
        resolve(true)
      })
    })
  }
  return {
    validate
  }
}
