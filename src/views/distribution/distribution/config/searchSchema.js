import { ref } from 'vue'
import { userLevelListApi } from '@/api/model/userLevel'
export const searchSchema = ref([
	{
		type: 'input',
		label: '订单编号',
		prop: 'no',
		placeholder: '请输入订单编号',
		value: '',
		attrs: {
			clearable: true,
			style: {
				width: '200px',
				marginRight: '1000px'
			}
		}
	},
	{
		type: 'input',
		label: '收货人',
		prop: 'name',
		placeholder: '请输入收货人',
		value: '',
		attrs: {
			clearable: true,
			style: {
				width: '200px'
			}
		}
	},
	{
		type: 'input',
		label: '手机号',
		prop: 'phone',
		placeholder: '请输入收货人手机号',
		value: '',
		attrs: {
			clearable: true,
			style: {
				width: '200px'
			}
		}
	},
	{
		type: 'date-picker',
		label: '开始时间',
		prop: 'starttime',
		placeholder: '选择开始时间',
		value: '',
		attrs: {
			format:"YYYY年 MM月 DD日",
			valueFormat:"YYYY-MM-DD",
			clearable: true,
			style: {
				width: '200px'
			}
		}
	},
	{
		type: 'date-picker',
		label: '结束时间',
		prop: 'endtime',
		placeholder: '选择结束时间',
		value: '',
		attrs: {
			format:"YYYY年 MM月 DD日",
			valueFormat:"YYYY-MM-DD",
			clearable: true,
			style: {
				width: '200px'
			}
		}
	},
])
{/* <el-date-picker v-model="listSearchParams.starttime" type="date" placeholder="选择开始时间" format="YYYY年 MM月 DD日"
			value-format="YYYY-MM-DD" @change="handleDateChange" /> */}
// 获取会员等级列表数据
const getUserLevelListData = async () => {
	const { data } = await userLevelListApi({ page: 1 })
	searchSchema.value[1].children = data.list.map(it => {
		return {
			type: 'option',
			value: it.id,
			label: it.name
		}
	})
}
getUserLevelListData()
