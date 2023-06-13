<template>
    <div class="">
         <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input
            v-model="formData.name"
            placeholder="文件夹名称"
            clearable
          ></el-input>
          <el-button
            @click="checkFriendLinkName"
            type="primary"
            round
            >检查</el-button
          >
        </el-col>
        <el-button type="success"  @click="toAdd" style="margin-left: -340px;">添加</el-button>
        </el-row>
        </el-card>
     
      <!-- 表格 -->
      <div class="table">
        <el-table :data="formData" style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="编号"
            width="150"
            align="center"
          />
          <el-table-column
            prop="name"
            label="文件夹名称'"
            width="120"
            align="center"
          />
     

    <el-table-column label="文件预览" width="200" align="center">
      <template #default="{ row }">
        <div v-if="isImage(row.logo)">
          <img :src="row.logo" alt="logo" style="width: 100px; height: 100px;" @click="previewImage(row.logo)" />
        </div>
        
          
        <div v-else-if="isPdf(row.logo)">
          <!-- <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.logo)}&embedded=true`" target="_blank" style="text-decoration: none;"> -->
            <a :href="row.logo" target="_blank" style="text-decoration: none;">
            <el-button type="success" @click="previewPdf(row.logo)">预览PDF文档</el-button>
          </a>
        </div>
        
        <div v-else-if="isWord(row.logo)">
          <!-- <a :href="row.logo" target="_blank" style="text-decoration: none;"> -->
          <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.logo)}&embedded=true`" target="_blank" style="text-decoration: none;">
            <el-button type="success" @click="previewWord(row.logo)">预览Word文档</el-button>
          </a>
        </div>
        <div v-else-if="isVideo(row.logo)">
          <a :href="row.logo" target="_blank" style="text-decoration: none;">
            <!-- <video src="row.logo" controls autoplay style="width: 500px;"></video> -->
            <el-button type="success" @click="previewVideo(row.logo)">预览视频</el-button>
          </a>
        </div>

        <div v-else-if="isExcel(row.logo)">
          <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.logo)}&embedded=true`" target="_blank" style="text-decoration: none;">
            <el-button type="success" @click="previewExcel(row.logo)">预览Excel表格</el-button>
          </a>
        </div>

        <div v-else-if="istxt(row.logo)">
          <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.logo)}&embedded=true`" target="_blank" style="text-decoration: none;">
            <!-- <a :href="row.logo" target="_blank" style="text-decoration: none;"> -->
            <el-button type="success" @click="previewExcel(row.logo)">预览txt文档</el-button>
          </a>
        </div>
        <div v-else-if="isPPT(row.logo)">
          <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.logo)}&embedded=true`" target="_blank" style="text-decoration: none;">
            <el-button type="success" @click="previewExcel(row.logo)">预览PPT</el-button>
          </a>
        </div>
        <div v-else>
          <a :href="row.logo" target="_blank" style="text-decoration: none;">
            <el-button type="success">预览未知文件</el-button>
          </a>
        </div>
      </template>
      
    </el-table-column>

          <el-table-column
            prop="url"
            label="文件路径"
            width="300"
            align="center"
          />
          <el-table-column label="是否激活" width="120" align="center">
            <template #default="{ row }">
                <el-tag v-if="row.enable == 0" >未激活</el-tag>
                <el-tag v-if="row.enable == 1" >激活</el-tag>
            </template>
        </el-table-column>
          
          <el-table-column fixed="right" label="操作" width="180" align="center">
            <template #default="scope">
              <el-button  @click="handleEdit(scope.row.id)"  type="primary"
                >编辑</el-button
              >
              <el-button

                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="friendLinkCount"
          :page-size="pageSize"
          class="mt-4"
          @current-change="handlePageChange"
        />

      </div>


      <!-- 表单 -->
      <el-dialog v-model="dialogFormVisible" title="添加/编辑">
        <el-form :model="folders">
            
          <el-form-item label="文件夹名称" :label-width="formLabelWidth">
            <el-input v-model="folders.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="预览" :label-width="formLabelWidth">
            <el-input v-model="folders.logo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="文件夹路径" :label-width="formLabelWidth">
            <el-input v-model="folders.url" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否激活" :label-width="formLabelWidth">
              <el-radio-group v-model="folders.enable">
                <el-radio :label="0">未激活</el-radio>
                <el-radio :label="1">激活</el-radio>
              </el-radio-group>
            </el-form-item>

        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="excute()"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  //模块引入
  import friendLink from "../../http/friendLink";
  import { defineComponent } from "vue";
  import { ElMessage } from 'element-plus';
  export default defineComponent({
  
    data() {
      return {
        formData: [],
        folders: {},
        dialogFormVisible: false,
        searchFolderId:[],
        formLabelWidth:100,
        previewUrl: '',
        previewModalVisible: false,
        FriendLinkData:[],
        friendLinkCount:0,
        pageSize: 5, // 每页显示的条数
        currentPage: 1, // 当前页码
      };
    },
    methods: {
  getFileExtension(url) {
      const fileExtension = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
      return fileExtension;
    },
    isImage(url) {
      const imageExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = this.getFileExtension(url);
      return imageExtensions.includes(fileExtension);
    },
    isPdf(url) {
      const pdfExtensions = ['pdf'];
      const fileExtension = this.getFileExtension(url);
      return pdfExtensions.includes(fileExtension);
    },
    isWord(url) {
      const wordExtensions = ['doc', 'docx'];
      const fileExtension = this.getFileExtension(url);
      return wordExtensions.includes(fileExtension);
    },
    istxt(url){
      const txtExtensions = ['txt'];
      const fileExtension = this.getFileExtension(url);
      return txtExtensions.includes(fileExtension);
    },
    isPPT(url) {
      const pptExtensions = ['ppt', 'pptx', 'pps', 'ppsx'];
      const fileExtension = this.getFileExtension(url);
      return pptExtensions.includes(fileExtension);
      },
    isExcel(url) {
      const excelExtensions = ['xls', 'xlsx'];
      const fileExtension = this.getFileExtension(url);
      return excelExtensions.includes(fileExtension);
    },
    isVideo(url) {
    const videoExtensions = ['mp4', 'avi', 'mkv','MP4']; 
    const fileExtension = this.getFileExtension(url);
    return videoExtensions.includes(fileExtension);
  },
    previewImage(url) {
    
      console.log("Preview Image:", url);
      alert("下载路径: " + url);
    },
    previewPdf(url) {
      console.log("Preview PDF:", url);
    },
    
    previewWord(url) {
      // 实现Word预览逻辑，例如使用Office Web Viewer或其他Word预览插件
      console.log("Preview Word:", url);
      // alert("下载路径: " + url);
    },
    previewExcel(url) {
      // 实现Excel预览逻辑，例如使用Office Web Viewer或其他Excel预览插件
      console.log("Preview Excel:", url);
      // alert("下载路径: " + url);
    },
    previewVideo(url) {
      // 实现Excel预览逻辑，例如使用Office Web Viewer或其他Excel预览插件
      console.log("Preview Video:", url);
      // alert("下载路径: " + url);
    },
  // 检查文件夹名是否重复
      checkFriendLinkName() {
  friendLink.checkFriendLinkName(this.formData.name).then((response) => {
    const message=response.msg

      if (message=='文件夹重复') {
        ElMessage({
          message: '文件夹重复',
          type: 'error'
        });
      } else {
        ElMessage({
          message: '该文件夹可添加',
          type: 'success'
        });
      }
  }
  )
},
  // 获取预览数量
    initFriendLinkData() {
        friendLink.all().then((res) => {
          this.FriendLinkData = res.data.folders;
          this.friendLinkCount = this.FriendLinkData.length;
        });
      },
    initData() {
        friendLink.all().then((res) => {
          this.FriendLinkData = res.data.folders,
          this.friendLinkCount = this.FriendLinkData.length;
          this.formData = this.getData(0, this.pageSize - 1);
        });
      },
      handlePageChange(page) {
        this.currentPage = page;
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize - 1;
        this.formData = this.getData(startIndex, endIndex);
    },
    getData(startIndex, endIndex) {
       // 根据起始索引和结束索引获取相应的数据
      return this.FriendLinkData.slice(startIndex, endIndex + 1);
    },
      //删除业务 id作参
      handleDelete(id) {
    
        ElMessageBox.confirm("你确定删除该行数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            friendLink.deleteById(id).then((res) => {
              if (res.success) {
                ElMessage({
                  type: "success",
                  message: "删除成功",
                });
                //刷新页面
                this.initData();
              } else {
                ElMessage({
                  type: "error",
                  message: "删除失败",
                });
              }
            });
          })
          .catch(() => {
            ElMessage({
              type: "warning",
              message: "取消删除",
            });
          });
      },
      //编辑-数据回显
      handleEdit(id) {
        //唤出编辑表单
        this.dialogFormVisible = true;
        //根据id查询 完成数据回显
        friendLink.queryById(id).then((res) => {
          this.folders = res.data.folder;
        });
      },
      toAdd() {
        this.dialogFormVisible = true;
        this.folders = {}
      },

      //执行编辑业务
      excute() {
        if (this.folders.id != undefined) {
          //编辑逻辑
          friendLink.updateById(this.folders).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "编辑成功",
              });
              //刷新页面
              this.initData();
            } else {
              ElMessage({
                type: "error",
                message: "编辑失败",
              });
            }
          });
          //关闭弹窗
          this.dialogFormVisible = false;
        } else {
          //添加逻辑
          console.log(this.folders);
          friendLink.add(this.folders).then(res => {
            if(res.success){
              ElMessage({
                type: "success",
                message: "编辑成功",
              });
              //刷新页面
              this.initData();
            }else{
              ElMessage({
                type: "error",
                message: "添加失败",
              });
            }
            this.dialogFormVisible = false;
          })
        }
      },
    },
    computed: {
    // 计算属性，返回动态绑定的 value 值
    valueForStatistic() {
      return this.friendLinkCount;
    },
  },
    mounted() {
      this.initData();
      this.initFriendLinkData();
      this.handlePageChange(1);
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .table {
    margin-top: 10px;
  }
  #search .el-input {
  width: 200px;
  margin-right: 10px;
}
  </style>