import { getRequiredRule } from '@/utils/rules'

export default {
	name: getRequiredRule('规格名称不能为空'),
	default: getRequiredRule('规格值不能为空')
}