"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[580],{54005:function(a,e,t){t.r(e),t.d(e,{default:function(){return D}});var l=t(66252),n=t(2262),s=t(3577),i=t(44295),r=t(16132),o=t(91056),u=t(88456),d=t(4984);const c={class:"flex"},p={class:"ml-4"},S={class:"text-base font-semibold"},g={class:"opacity-60"},h=(0,l.Uk)("编辑"),m=(0,l.Uk)("删除"),U=()=>{const a=(0,n.iH)({keyword:""}),{loading:e,list:t,pageSearch:l,total:s,getListData:i,deleteData:r,statusData:u}=(0,d.F)({listSearchParams:a,listDataApi:o.managerListApi,deleteDataApi:o.managerDeleteApi,statusDataApi:o.managerStatusApi}),c=async a=>{u({params:{id:a.id,status:a.status},row:a})},p=e=>{a.value=e,i()};return{list:t,loading:e,pageSearch:l,total:s,getUserListData:i,handleStatusChange:c,handleSearch:p,handleDelete:r}},w=()=>{const a=(0,n.iH)(null),e=()=>{a.value.open({title:"新增"})},t=e=>{a.value.open({title:"编辑",data:e})};return{actionDrawerRef:a,handleCreate:e,handleEdit:t}};var f={__name:"index",setup(a){const{list:e,loading:t,pageSearch:o,total:d,handleStatusChange:f,getUserListData:k,handleSearch:D,handleDelete:v}=U();k();const{actionDrawerRef:C,handleCreate:_,handleEdit:b}=w();return(a,U)=>{const w=(0,l.up)("NSearchHeader"),y=(0,l.up)("NActionHeader"),z=(0,l.up)("NAvatar"),A=(0,l.up)("el-switch"),W=(0,l.up)("el-button"),L=(0,l.up)("NTable"),R=(0,l.up)("NContainer");return(0,l.wg)(),(0,l.j4)(R,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{schema:(0,n.SU)(i.searchSchema),showFold:!0,onSearch:(0,n.SU)(D)},null,8,["schema","onSearch"]),(0,l.Wm)(y,{onCreate:(0,n.SU)(_),onRefresh:(0,n.SU)(k)},null,8,["onCreate","onRefresh"]),(0,l.Wm)(L,{"table-layout":"auto",ref:"tableRef",data:(0,n.SU)(e),options:(0,n.SU)(r.tableOptions),dragSort:!1,loading:(0,n.SU)(t),total:(0,n.SU)(d),currentPage:(0,n.SU)(o).page,"onUpdate:currentPage":U[0]||(U[0]=a=>(0,n.SU)(o).page=a),pageSize:(0,n.SU)(o).limit,"onUpdate:pageSize":U[1]||(U[1]=a=>(0,n.SU)(o).limit=a)},{user:(0,l.w5)((({row:a})=>[(0,l._)("div",c,[(0,l.Wm)(z,{src:a.avatar},null,8,["src"]),(0,l._)("div",p,[(0,l._)("div",S,(0,s.zw)(a.username||a.nickname),1),(0,l._)("div",g,"ID: "+(0,s.zw)(a.id),1)])])])),status:(0,l.w5)((({row:a})=>[(0,l.Wm)(A,{modelValue:a.status,"onUpdate:modelValue":e=>a.status=e,"active-value":1,"inactive-value":0,loading:a.statusLoading,size:"small",onClick:e=>(0,n.SU)(f)(a)},null,8,["modelValue","onUpdate:modelValue","loading","onClick"])])),action:(0,l.w5)((({row:a})=>[(0,l.Wm)(W,{type:"primary",link:"",size:"small",onClick:e=>(0,n.SU)(b)(a)},{default:(0,l.w5)((()=>[h])),_:2},1032,["onClick"]),(0,l.Wm)(W,{type:"danger",link:"",size:"small",onClick:e=>(0,n.SU)(v)(a)},{default:(0,l.w5)((()=>[m])),_:2},1032,["onClick"])])),_:1},8,["data","options","loading","total","currentPage","pageSize"]),(0,l.Wm)(u["default"],{ref_key:"actionDrawerRef",ref:C,getListData:(0,n.SU)(k)},null,8,["getListData"])])),_:1})}}};const k=f;var D=k}}]);