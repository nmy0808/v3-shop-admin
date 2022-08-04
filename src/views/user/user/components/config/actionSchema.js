import { ref } from 'vue'
import { userLevelListApi } from '@/api/model/userLevel'
import { getRequiredRule, usernameRule, nicknameRule, passwordRule, emailRule, phoneRule } from '@/utils/rules'

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
			type: 'input',
			label: '昵称',
			prop: 'nickname',
			placeholder: '请输入昵称',
			value: '',
			attrs: {
				clearable: true
			},
			rules: nicknameRule
		},
		{
			type: 'upload',
			label: '头像',
			prop: 'avatar',
			value: '',
			customUpload: async (file) => {
				// 1.自定义上传请求
				// 2.返回图片url即可
				return 'https://images.unsplash.com/photo-1657299156185-6f5de6da0996?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
			}
		},
		{
			type: 'select',
			label: '会员等级',
			prop: 'user_level_id',
			placeholder: '请选择会员等级',
			value: null,
			attrs: {
				clearable: true
			},
			children: [], 
			rules: getRequiredRule('请选择会员等级')
		},
		{
			type: 'input',
			label: '手机',
			prop: 'phone',
			placeholder: '请输入手机号',
			value: '',
			attrs: {
				clearable: true
			},
			rules: phoneRule
		},
		{
			type: 'input',
			label: '邮箱',
			prop: 'email',
			placeholder: '请输入邮箱',
			value: '',
			attrs: {
				clearable: true
			},
			rules: emailRule
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

		// 获取会员等级列表数据
		const getUserLevelListData = async () => {
			const { data } = await userLevelListApi({ page: 1 })
			actionSchema.value[4].children = data.list.map(it => {
				return {
					type: 'option',
					value: it.id,
					label: it.name
				}
			})
		}
		getUserLevelListData()
	return actionSchema
}


