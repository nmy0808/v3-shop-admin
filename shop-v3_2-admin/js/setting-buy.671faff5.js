"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[367],{63567:function(a,e,l){l.r(e),l.d(e,{default:function(){return y}});var u=l(66252),t=l(2262),n=l(17564),s=l(59052),i=l(7599),o=l(13440);const c=(0,u.Uk)("重置"),p=(0,u.Uk)("提交");var m={__name:"index",setup(a){const e=(0,t.iH)(null),l=(0,t.iH)("pay"),m=[{label:"支付设置",name:"pay"},{label:"购物设置",name:"buy"}],r=(0,t.iH)(null),y=(0,t.iH)(!1),v=async()=>{y.value=!0;const{data:a}=await(0,s.settingInfoApi)();r.value=a,n.buySchema.value.forEach((e=>{const l=e.prop;e.value=a[l]})),y.value=!1};v();const b=()=>{v()},d=async()=>{const a=await e.value.validate();a&&(v(),(0,i.t6)({message:"演示数据",type:"success"}))},w=()=>{e.value.resetFields()};return(a,s)=>{const i=(0,u.up)("el-tab-pane"),f=(0,u.up)("el-tabs"),k=(0,u.up)("NForm"),g=(0,u.up)("el-button"),h=(0,u.up)("NContainer"),D=(0,u.Q2)("loading");return(0,u.wy)(((0,u.wg)(),(0,u.j4)(h,null,{default:(0,u.w5)((()=>[(0,u.Wm)(f,{modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=a=>l.value=a),"tab-position":"top",onTabChange:b},{default:(0,u.w5)((()=>[((0,u.wg)(),(0,u.iD)(u.HY,null,(0,u.Ko)(m,((a,e)=>(0,u.Wm)(i,{key:e,label:a.label,name:a.name},null,8,["label","name"]))),64))])),_:1},8,["modelValue"]),"pay"===l.value?((0,u.wg)(),(0,u.j4)((0,t.SU)(o["default"]),{key:0,aliData:r.value?.alipay||{},wxData:r.value?.wxpay||{},getListData:v},null,8,["aliData","wxData"])):(0,u.kq)("",!0),"buy"===l.value?((0,u.wg)(),(0,u.j4)(k,{key:y.value,class:"mt-10",ref_key:"nFormRef",ref:e,schema:(0,t.SU)(n.buySchema),formOptions:{labelWidth:"150px"}},null,8,["schema"])):(0,u.kq)("",!0),"buy"===l.value?((0,u.wg)(),(0,u.iD)(u.HY,{key:2},[(0,u.Wm)(g,{type:"",onClick:w},{default:(0,u.w5)((()=>[c])),_:1}),(0,u.Wm)(g,{type:"primary",onClick:d},{default:(0,u.w5)((()=>[p])),_:1})],64)):(0,u.kq)("",!0)])),_:1})),[[D,y.value]])}}};const r=m;var y=r}}]);