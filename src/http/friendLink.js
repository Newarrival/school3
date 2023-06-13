import instance from "./axios";
// 414090297@qq.com
//添加
const add = (data) => {
   return instance.request({
      url:'api/friendlink/add',
      method:'post',
      data
   })
}

//删除
//删除
const deleteById = (id) => {
    return instance.request({
       url: 'api/friendlink/delete/'+id,
       method: 'get',
    })
 }

//数据回显
const queryById = (id) => {
   return instance.request({
      url:'api/friendlink/one/'+id,
      method:'get',
   })
}


const all = (data) => {
   return instance.request({
      url: 'api/friendlink/all', 
      method: 'get',
      params:data
   })
}

//编辑
const updateById = (data) => {
   return instance.request({
      url:'api/friendlink/edit',
      method:'post',
      data
   })
}

//编辑
const checkFriendLinkName = (name) => {
    return instance.request({
       url:'api/friendlink/check/'+name,
       method:'get',
    })
 }


export default {
   all,
   deleteById,
   updateById,
   queryById,
   add,
   checkFriendLinkName
}