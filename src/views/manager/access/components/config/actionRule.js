import { getRequiredRule } from '@/utils/rules'
export const menuRules = {
	name: getRequiredRule('必须填写菜单名称'),
	icon: '', // （menu为1必填）
	frontpath: getRequiredRule('必须填写前端路由规则')
}
export const ruleRules = {
	rule_id: getRequiredRule('必须选择上级菜单'),
	name: getRequiredRule('必须填写权限名称'),
	condition: getRequiredRule('必须填写后端规则'),
	method: getRequiredRule('必须选择请求方式'),
}