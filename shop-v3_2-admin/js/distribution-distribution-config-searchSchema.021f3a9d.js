"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[473],{98378:function(e,a,t){t.r(a),t.d(a,{searchSchema:function(){return r}});var l=t(2262),p=t(95257);const r=(0,l.iH)([{type:"input",label:"订单编号",prop:"no",placeholder:"请输入订单编号",value:"",attrs:{clearable:!0,style:{width:"200px",marginRight:"1000px"}}},{type:"input",label:"收货人",prop:"name",placeholder:"请输入收货人",value:"",attrs:{clearable:!0,style:{width:"200px"}}},{type:"input",label:"手机号",prop:"phone",placeholder:"请输入收货人手机号",value:"",attrs:{clearable:!0,style:{width:"200px"}}},{type:"date-picker",label:"开始时间",prop:"starttime",placeholder:"选择开始时间",value:"",attrs:{format:"YYYY年 MM月 DD日",valueFormat:"YYYY-MM-DD",clearable:!0,style:{width:"200px"}}},{type:"date-picker",label:"结束时间",prop:"endtime",placeholder:"选择结束时间",value:"",attrs:{format:"YYYY年 MM月 DD日",valueFormat:"YYYY-MM-DD",clearable:!0,style:{width:"200px"}}}]),i=async()=>{const{data:e}=await(0,p.userLevelListApi)({page:1});r.value[1].children=e.list.map((e=>({type:"option",value:e.id,label:e.name})))};i()}}]);