import instance from "./axios";
// 414090297@qq.com
//添加
const add = (data) => {
   return instance.request({
      url:'api/folder/add',
      method:'post',
      data
   })
}

//删除
const deleteById = (id) => {
   return instance.request({
      url: 'api/folder/delete/'+id,
      method: 'get',
   })
}

//数据回显
const queryById = (id) => {
   return instance.request({
      url:'api/folder/one/'+id,
      method:'get',
   })
}

const queryByname = (name) => {
   return instance.request({
      url:'api/folder/query/'+name,
      method:'get',
   })
}


const all = (data) => {
   return instance.request({
      url: 'api/folder/all', 
      method: 'get',
      params:data
   })
}

//编辑
const updateById = (data) => {
   return instance.request({
      url:'api/folder/edit',
      method:'post',
      data
   })
}



export default {
   all,
   deleteById,
   updateById,
   queryById,
   add,
   queryByname
}