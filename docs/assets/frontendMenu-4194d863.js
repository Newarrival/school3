import{S as f,_ as w,d as M,o as y,c as _,a as t,w as o,b as h,e as u}from"./index-77ab94be.js";import{E as d,a as E,b as C,c as B}from"./el-table-column-f3d31b50.js";import{a as D,E as I,b as k,c as F}from"./el-button-d66579c7.js";import{E as U}from"./el-message-box-e6138db0.js";/* empty css                   */const v=e=>f.request({url:"api/menu/add",method:"post",data:e}),$=e=>f.request({url:"api/menu/delete",method:"get",params:e}),L=e=>f.request({url:"api/menu/one",method:"get",params:e}),q=e=>f.request({url:"api/menu/all",method:"get",params:e}),T=e=>f.request({url:"api/menu/edit",method:"post",data:e}),m={all:q,deleteById:$,updateById:T,queryById:L,add:v};const N=M({data(){return{formData:[],frontendMenu:{},dialogFormVisible:!1}},methods:{initData(){m.all().then(e=>{this.formData=e.data.communities})},handleDelete(e){const l={id:e};U.confirm("你确定删除该行数据吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{m.deleteById(l).then(p=>{p.success?(d({type:"success",message:"删除成功"}),this.initData()):d({type:"error",message:"删除失败"})})}).catch(()=>{d({type:"warning",message:"取消删除"})})},handleEdit(e){this.dialogFormVisible=!0;const l={id:e};m.queryById(l).then(p=>{this.frontendMenu=p.data.frontendMenu})},toAdd(){this.dialogFormVisible=!0,this.frontendMenu={}},excute(){this.frontendMenu.id!=null?(m.updateById(this.frontendMenu).then(e=>{e.success?(d({type:"success",message:"编辑成功"}),this.initData()):d({type:"error",message:"编辑失败"})}),this.dialogFormVisible=!1):m.add(this.frontendMenu).then(e=>{e.success?(d({type:"success",message:"编辑成功"}),this.initData()):d({type:"error",message:"添加失败"}),this.dialogFormVisible=!1})}},mounted(){this.initData(1)}}),W={class:""},S={class:"table"},z={class:"dialog-footer"};function A(e,l,p,H,j,G){const r=D,a=B,b=E,i=I,s=k,g=F,c=C;return y(),_("div",W,[t(r,{type:"success",size:"small",onClick:e.toAdd},{default:o(()=>[u("添加")]),_:1},8,["onClick"]),h("div",S,[t(b,{data:e.formData,style:{width:"100%"}},{default:o(()=>[t(a,{fixed:"",prop:"id",label:"编号",width:"150",align:"center"}),t(a,{prop:"menuName",label:"前端菜单名称'",width:"120",align:"center"}),t(a,{prop:"menuUrl",label:"前端菜单访问HTML地址",width:"200",align:"center"}),t(a,{prop:"pid",label:"父ID",width:"120",align:"center"}),t(a,{prop:"menuSort",label:"排序",width:"120",align:"center"}),t(a,{prop:"description",label:"描述",width:"120",align:"center"}),t(a,{prop:"hasChildren",label:"是否有子菜单",width:"120",align:"center"}),t(a,{fixed:"right",label:"操作",width:"180",align:"center"},{default:o(n=>[t(r,{size:"small",onClick:V=>e.handleEdit(n.row.id)},{default:o(()=>[u("编辑")]),_:2},1032,["onClick"]),t(r,{size:"small",type:"danger",onClick:V=>e.handleDelete(n.row.id)},{default:o(()=>[u("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),t(c,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":l[8]||(l[8]=n=>e.dialogFormVisible=n),title:"添加/编辑"},{footer:o(()=>[h("span",z,[t(r,{onClick:l[6]||(l[6]=n=>e.dialogFormVisible=!1)},{default:o(()=>[u("取消")]),_:1}),t(r,{type:"primary",onClick:l[7]||(l[7]=n=>e.excute())},{default:o(()=>[u(" 确定 ")]),_:1})])]),default:o(()=>[t(g,{model:e.frontendMenu},{default:o(()=>[t(s,{label:"前端菜单名称","label-width":e.formLabelWidth},{default:o(()=>[t(i,{modelValue:e.frontendMenu.menuName,"onUpdate:modelValue":l[0]||(l[0]=n=>e.frontendMenu.menuName=n),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(s,{label:"前端菜单访问HTML地址","label-width":e.formLabelWidth},{default:o(()=>[t(i,{modelValue:e.frontendMenu.menuUrl,"onUpdate:modelValue":l[1]||(l[1]=n=>e.frontendMenu.menuUrl=n),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(s,{label:"父ID","label-width":e.formLabelWidth},{default:o(()=>[t(i,{modelValue:e.frontendMenu.pid,"onUpdate:modelValue":l[2]||(l[2]=n=>e.frontendMenu.pid=n),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(s,{label:"排序","label-width":e.formLabelWidth},{default:o(()=>[t(i,{modelValue:e.frontendMenu.menuSort,"onUpdate:modelValue":l[3]||(l[3]=n=>e.frontendMenu.menuSort=n),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(s,{label:"描述","label-width":e.formLabelWidth},{default:o(()=>[t(i,{modelValue:e.frontendMenu.description,"onUpdate:modelValue":l[4]||(l[4]=n=>e.frontendMenu.description=n),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(s,{label:"是否有子菜单","label-width":e.formLabelWidth},{default:o(()=>[t(i,{modelValue:e.frontendMenu.hasChildren,"onUpdate:modelValue":l[5]||(l[5]=n=>e.frontendMenu.hasChildren=n),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])])}const R=w(N,[["render",A],["__scopeId","data-v-1a46a120"]]);export{R as default};
