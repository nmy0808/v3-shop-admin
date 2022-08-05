import { ref } from 'vue'
import { managerListApi } from '@/api/model/manager'
import { uploadImageApi } from '@/api/model/upload'
import { getRequiredRule, usernameRule, passwordRule } from '@/utils/rules'

export const getActionSchema = ()=>{
	 const actionSchema = ref([
		{
			type: 'input',
			label: '用户名',
			prop: 'username',
			placeholder: '请输入用户名',
			value: '',
			attrs: {
				clearable: true
			},
			rules: usernameRule
		},
		{
			type: 'input',
			label: '密码',
			prop: 'password',
			placeholder: '请输入密码',
			value: '',
			attrs: {
				clearable: true
			},
			rules: passwordRule
		},
		{
			type: 'upload',
			label: '头像',
			prop: 'avatar',
			value: '',
			customUpload: async (file) => {
				// 1.自定义上传请求
				// 2.返回图片url即可
				const {data} =await uploadImageApi({img: [file]})
				return data.url
			}
		},
		{
			type: 'select',
			label: '所属管理员',
			prop: 'role_id',
			placeholder: '请选择所属管理员',
			value: null,
			attrs: {
				clearable: true
			},
			children: [],
			rules: getRequiredRule('请选择所属管理员')
		},
		{
			type: 'switch',
			label: '状态',
			prop: 'status',
			value: 1,
			attrs: {
				activeValue: 1,
				inactiveValue: 0
			}
		},
	])

		// 获取所属管理员列表
	const getManagerListData = async () => {
			const { data } = await managerListApi({ page: 1 })
			actionSchema.value.find(it => it.prop === 'role_id').children = data.roles.map(it => {
				return {
					type: 'option',
					value: it.id,
					label: it.name
				}
			})
		}
		getManagerListData()

	return actionSchema
}


