<template>
    <div class="">
        <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input
            v-model="formData.name"
            placeholder="文件夹名称"
            clearable
          ></el-input>
          <el-button
            @click="getFileInfoByFolder"
            type="primary"
            round
            >查询</el-button
          >


        </el-col>

        <el-button type="success"  @click="toAdd" style="margin-left: -520px;">添加</el-button>
        
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
          <el-table-column label="图标" width="200" align="center">
            <template #default="{ row }">
            <img :src="row.icon" alt="图标" v-if="row.icon" style="width: 100px; height: 100px;" />
            </template>
        </el-table-column>
          <el-table-column
            prop="pid"
            label="父ID"
            width="120"
            align="center"
          />
          <el-table-column label="状态" width="120" align="center">
            <template #default="{ row }">
                <el-tag v-if="row.status == true" >公开</el-tag>
                <el-tag v-if="row.status == false" >会员</el-tag>
            </template>
        </el-table-column>
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
          :total="folderCount"
          :page-size="pageSize"
          class="mt-4"
          @current-change="handlePageChange"
        />

      </div>
      <!-- 表单 -->
      <el-dialog v-model="dialogFormVisible" title="添加/编辑">
        <el-form :model="folder">
            
          <el-form-item label="文件夹名称" :label-width="formLabelWidth">
            <el-input v-model="folder.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="图标" :label-width="formLabelWidth">
            <el-input v-model="folder.icon" autocomplete="off" />
          </el-form-item>
          <el-form-item label="父ID" :label-width="formLabelWidth">
            <el-input v-model="folder.pid" autocomplete="off" />
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio-group v-model="folder.status">
              <el-radio :label="true">公开</el-radio>
              <el-radio :label="false">会员</el-radio>
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
  import folder from "../../http/folder";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        formData: [],
        folder: {},
        dialogFormVisible: false,
        formLabelWidth:120,
        folderData:[],
        folderCount:0,
        pageSize: 5, // 每页显示的条数
        currentPage: 1, // 当前页码
      };
    },
    methods: {
      getFileInfoByFolder() {
      folder.queryByname(this.formData.name).then((response) => {
        
        if(!this.formData.name){
            this.initData()
        }else{
            this.formData = response.data.folders
        }
      });
    },
      //   获取文件夹数
      initFolderData() {
        folder.all().then((res) => {
          this.folderData = res.data.folders;
          this.folderCount=this.folderData.length;
        });
      },
    initData() {
        folder.all().then((res) => {
          this.folderData = res.data.folders,
          this.folderCount = this.folderData.length;
          this.formData = this.getData(0, this.pageSize - 1);
        });
      },
      handlePageChange(page) {
        this.currentPage = page;
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize - 1;
        this.formData = this.formData = this.getData(startIndex, endIndex);
    },
    getData(startIndex, endIndex) {
       // 根据起始索引和结束索引获取相应的数据
      return this.folderData.slice(startIndex, endIndex + 1);
    },
      //删除业务 id作参
      handleDelete(id) {
        //封装数据对象
        ElMessageBox.confirm("你确定删除该行数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            folder.deleteById(id).then((res) => {
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
        folder.queryById(id).then((res) => {
          this.folder = res.data.folder;
        });
      },
      toAdd() {
        this.dialogFormVisible = true;
        this.folder = {}
      },

      //执行编辑业务
      excute() {
        if (this.folder.id != undefined) {
          //编辑逻辑
          folder.updateById(this.folder).then((res) => {
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
          folder.add(this.folder).then(res => {
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
      return this.folderCount;
    },
  },
    mounted() {
      this.initData();
      this.initFolderData();
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