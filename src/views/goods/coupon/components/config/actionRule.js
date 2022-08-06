import { getRequiredRule } from '@/utils/rules'

export default {
	name: getRequiredRule('请输入优惠券名称'),
	start_time: getRequiredRule('请选择优惠券活动时间范围'),
	end_time: getRequiredRule('请选择优惠券活动时间范围'),
	desc: getRequiredRule('请输入优惠券描述内容')
}