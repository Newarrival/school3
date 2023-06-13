import instance from "./axios";
// 414090297@qq.com
//添加
const add = (data) => {
   return instance.request({
      url:'api/file-info/add',
      method:'post',
      data
   })
}

//删除
const deleteById = (data) => {
   return instance.request({
      url: 'api/file-info/delete',
      method: 'get',
      params:data
   })
}

//数据回显
const queryById = (id) => {
   return instance.request({
      url:'api/file-info/one/'+id,
      method:'get',
   })
}


const all = (data) => {
   return instance.request({
      url: 'api/file-info/all', 
      method: 'get',
      params:data
   })
}

//编辑
const updateById = (data) => {
   return instance.request({
      url:'api/file-info/edit',
      method:'post',
      data
   })
}

//编辑
const getFileInfoByFolderId = (id) => {
    return instance.request({
       url:'api/file-info/folder/'+id,
       method:'get',
    })
 }
 const cosUploadFile = (data) => {
   return instance.request({
      url:'api/upload/file',
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
   getFileInfoByFolderId,
   cosUploadFile
}