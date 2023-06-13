import instance from "./axios";
// 414090297@qq.com
//添加
const add = (data) => {
   return instance.request({
      url:'api/menu/add',
      method:'post',
      data
   })
}

//删除
const deleteById = (data) => {
   return instance.request({
      url: 'api/menu/delete',
      method: 'get',
      params: data
   })
}

//数据回显
const queryById = (data) => {
   return instance.request({
      url:'api/menu/one',
      method:'get',
      params:data
   })
}


const all = (data) => {
   return instance.request({
      url: 'api/menu/all', 
      method: 'get',
      params:data
   })
}

//编辑
const updateById = (data) => {
   return instance.request({
      url:'api/menu/edit',
      method:'post',
      data
   })
}



export default {
   all,
   deleteById,
   updateById,
   queryById,
   add
}