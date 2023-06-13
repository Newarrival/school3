<template>
    <div class="">
         <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input
            v-model="formData.folderId"
            placeholder="文件夹ID"
            clearable
          ></el-input>
          <el-button
            @click="getFileInfoByFolder"
            type="primary"
            round
            >查询</el-button
          >
        

<!-- 
    <input type="file" @change="handleFileUpload" style="margin-left: 60px;">
    <el-button type="primary" @click="upload" style="margin-left: 30px;">
      上传<el-icon class="el-icon--right" ><Upload /></el-icon>
    </el-button> -->



        </el-col>
        <el-button type="success"  @click="toAdd" style="margin-left: -280px;">添加</el-button>
     
        
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
            label="文件名称'"
            width="120"
            align="center"
          />
          <el-table-column
            prop="size"
            label="文件大小'"
            width="120"
            align="center"
          />
        <el-table-column label="文件类型" width="120" align="center">
            <template #default="{ row }">
                <el-tag v-if="row.type == 0" >图片</el-tag>
                <el-tag v-if="row.type == 1" >视频</el-tag>
                <el-tag v-if="row.type == 2" >文档</el-tag>
                <el-tag v-if="row.type == 3" >表格</el-tag>
                <el-tag v-if="row.type == 4" >ppt</el-tag>
                <el-tag v-if="row.type == 5" >压缩包</el-tag>
                <el-tag v-if="row.type == 6" >其它文件</el-tag>
            </template>
        </el-table-column>
          <!-- <el-table-column
            prop="url"
            label="文件路径"
            width="300"
            align="center"
          /> -->
          <el-table-column label="文件预览" width="200" align="center">
      <template #default="{ row }">
        <div v-if="isImage(row.url)">
          <img :src="row.url" alt="url" style="width: 100px; height: 100px;" @click="previewImage(row.url)" />
        </div>
        
          
        <div v-else-if="isPdf(row.url)">
          <!-- <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.url)}&embedded=true`" target="_blank" style="text-decoration: none;"> -->
            <a :href="row.url" target="_blank" style="text-decoration: none;">
            <el-button type="success" @click="previewPdf(row.url)">预览PDF文档</el-button>
          </a>
        </div>
        
        <div v-else-if="isWord(row.url)">
          <!-- <a :href="row.url" target="_blank" style="text-decoration: none;"> -->
          <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.url)}&embedded=true`" target="_blank" style="text-decoration: none;">
            <el-button type="success" @click="previewWord(row.url)">预览Word文档</el-button>
          </a>
        </div>
        <div v-else-if="isVideo(row.url)">
          <a :href="row.url" target="_blank" style="text-decoration: none;">
            <!-- <video src="row.url" controls autoplay style="width: 500px;"></video> -->
            <el-button type="success" @click="previewVideo(row.url)">预览视频</el-button>
          </a>
        </div>

        <div v-else-if="isExcel(row.url)">
          <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.url)}&embedded=true`" target="_blank" style="text-decoration: none;">
            <el-button type="success" @click="previewExcel(row.url)">预览Excel表格</el-button>
          </a>
        </div>

        <div v-else-if="istxt(row.url)">
          <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.url)}&embedded=true`" target="_blank" style="text-decoration: none;">
            <!-- <a :href="row.url" target="_blank" style="text-decoration: none;"> -->
            <el-button type="success" @click="previewExcel(row.url)">预览txt文档</el-button>
          </a>
        </div>
        <div v-else-if="isPPT(row.url)">
          <a :href="`https://docs.google.com/viewer?url=${encodeURIComponent(row.url)}&embedded=true`" target="_blank" style="text-decoration: none;">
            <el-button type="success" @click="previewExcel(row.url)">预览PPT</el-button>
          </a>
        </div>
        <div v-else>
          <a :href="row.url" target="_blank" style="text-decoration: none;">
            <el-button type="success">预览未知文件</el-button>
          </a>
        </div>
      </template>
      </el-table-column>

          <el-table-column
            prop="folderId"
            label="文件夹ID"
            width="120"
            align="center"
          />
          <!-- <el-table-column
            prop="createTime"
            label="创建时间"
            width="120"
            align="center"
          />
          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="120"
            align="center"
          /> -->
          <el-table-column
            prop="description"
            label="描述"
            width="120"
            align="center"
          />
         
          <el-table-column fixed="right" label="操作" width="180" align="center">
            <template #default="scope">
              <el-button type="primary" @click="handleEdit(scope.row.id)"
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
          :total="fileCount"
          :page-size="pageSize"
          class="mt-4"
          @current-change="handlePageChange"
        />

      </div>
      <!-- 表单 -->
      <el-dialog v-model="dialogFormVisible" title="添加/编辑">
        <el-form :model="fileInfo">
            
          <el-form-item label="文件名称" :label-width="formLabelWidth">
            <el-input v-model="fileInfo.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="文件大小" :label-width="formLabelWidth">
            <el-input v-model="fileInfo.size" autocomplete="off" />
          </el-form-item>
          <!-- <el-form-item label="文件类型" :label-width="formLabelWidth">
            <el-input v-model="fileInfo.type" autocomplete="off" />
          </el-form-item> -->
          <el-form-item label="文件类型" :label-width="formLabelWidth">
            <el-radio-group v-model="fileInfo.type">
              <el-radio :label="0">图片</el-radio>
              <el-radio :label="1">视频</el-radio>
              <el-radio :label="2">文档</el-radio>
              <el-radio :label="3">表格</el-radio>
              <el-radio :label="4">PPT</el-radio>
              <el-radio :label="5">压缩包</el-radio>
              <el-radio :label="6">其他文件</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文件夹ID" :label-width="formLabelWidth">
            <el-input v-model="fileInfo.folderId" autocomplete="off" />
          </el-form-item>
          <!-- <el-form-item label="文件路径" :label-width="formLabelWidth">
            <el-input v-model="fileInfo.url" autocomplete="off" />
          </el-form-item> -->
         <el-form-item label="文件上传" :label-width="formLabelWidth">
            <input type="file" @change="handleFileUpload" style="margin-left: 60px;">
            
            <el-button type="primary" @click="upload" style="margin-left: 30px;">
            上传<el-icon class="el-icon--right" ><Upload /></el-icon>
            </el-button>
          </el-form-item>

          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="fileInfo.description" autocomplete="off" />
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
  import fileInfo from "../../http/fileInfo";
  import { defineComponent } from "vue";
  import { Upload } from '@element-plus/icons-vue'
  
  export default defineComponent({
    data() {
      return {
        formData: [],
        fileInfo: {},
        dialogFormVisible: false,
        searchFolderId:[],
        selectedFile: null,
        fileUrl:null,
        formLabelWidth:80,
        fileData:[],
        fileCount:0,
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
         //   获取文件数
         initFileData() {
        fileInfo.all().then((res) => {
          this.fileData = res.data.fileInfos;
          this.fileCount=this.fileData.length;
        });
      },
      initData() {
        fileInfo.all().then((res) => {
          this.fileData = res.data.fileInfos;
        this.fileCount = this.fileData.length;
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
      return this.fileData.slice(startIndex, endIndex + 1);
    },
   
      handleFileUpload(event) {
        console.log(event.target.files);
      this.selectedFile = event.target.files[0];
      
    }, 

// upload() {
//   if (!this.selectedFile) {
//     // 没有选择文件，不执行上传操作
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', this.selectedFile);

//   fileInfo.cosUploadFile(formData)
//     .then(response => {
//       this.fileUrl = response.data.filePath;
//       console.log(this.fileUrl);
//       this.fileInfo.url = this.fileUrl; // 将 fileUrl 赋值给 fileInfo.url

//       // 添加文件信息到 fileInfo 数组
//       fileInfo.add(this.fileInfo)
//         .then(res => {
//           if (res.success) {
//             alert("访问路径为：" + this.fileUrl);
//             // 上传成功后刷新数据
//             this.initData();
//           } else {
//             // 添加失败的处理逻辑
//             console.error("添加文件信息失败");
//           }
//         })
//         .catch(error => {
//           console.error("添加文件信息出错:", error);
//         });
//     })
//     .catch(error => {
//       console.error("文件上传失败:", error);
//     });
// },
upload() {
  if (!this.selectedFile) {
    // 没有选择文件，不执行上传操作
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  fileInfo.cosUploadFile(formData)
    .then(response => {
      this.fileUrl = response.data.filePath;
      console.log(this.fileUrl);
      this.fileInfo.url = this.fileUrl; // 将 fileUrl 赋值给 fileInfo.url
    })
    .catch(error => {
      console.error("文件上传失败:", error);
    });
},
      //执行编辑业务
excute() {
  if (this.fileInfo.id != undefined) {
    // 编辑逻辑
    fileInfo.updateById(this.fileInfo).then((res) => {
      if (res.success) {
        ElMessage({
          type: "success",
          message: "编辑成功",
        });
        // 刷新页面
        this.initData();
      } else {
        ElMessage({
          type: "error",
          message: "编辑失败",
        });
      }
    });
    // 关闭弹窗
    this.dialogFormVisible = false;
  } else {
    // 添加逻辑
    if (!this.fileInfo.url) {
      // 没有上传文件路径，不执行添加操作
      return;
    }
    fileInfo.add(this.fileInfo).then(res => {
      if (res.success) {
        ElMessage({
          type: "success",
          message: "添加成功",
        });
        // 刷新页面
        this.initData();
      } else {
        ElMessage({
          type: "error",
          message: "添加失败",
        });
      }
      this.dialogFormVisible = false;
    })
  }
}
,

getFileInfoByFolder() {
      fileInfo.getFileInfoByFolderId(this.formData.folderId).then((response) => {
        
        if(!this.formData.folderId){
            this.initData()
        }else{
            this.formData = response.data.fileInfos
        }
      });
    },
    
      //删除业务 id作参
      handleDelete(id) {
        //封装数据对象
        const data={id}
        ElMessageBox.confirm("你确定删除该行数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            fileInfo.deleteById(data).then((res) => {
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
        fileInfo.queryById(id).then((res) => {
          this.fileInfo = res.data.fileInfo;
        });
      },
      toAdd() {
        this.dialogFormVisible = true;
        this.fileInfo = {}
      },


      
    },
    computed: {
    // 计算属性，返回动态绑定的 value 值
    valueForStatistic() {
      return this.fileCount;
    },
  },
    mounted() {
      this.initData();
      this.initFileData();
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