"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[35],{37140:function(e,a,l){l.r(a),l.d(a,{getActionSchema:function(){return n}});var p=l(2262),s=l(93067),t=l(88607);const n=()=>{const e=(0,p.iH)([{type:"input",label:"快递单号",prop:"express_no",placeholder:"请输入快递单号",value:"",attrs:{clearable:!0},rules:(0,t.T3)("必须填写快递单号")},{type:"select",label:"快递公司",prop:"express_company",placeholder:"请选择快递公司",value:null,attrs:{clearable:!0},children:[],rules:(0,t.T3)("请选择快递公司")}]),a=async()=>{const{data:a}=await(0,s.expressCompanyListApi)({page:1});e.value.find((e=>"express_company"===e.prop)).children=a.list.map((e=>({type:"option",value:e.id,label:e.name})))};return a(),e}}}]);