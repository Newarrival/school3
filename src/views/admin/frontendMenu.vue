<template>
    <div class="">
      <el-button type="success" size="small" @click="toAdd">添加</el-button>
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
            prop="menuName"
            label="前端菜单名称'"
            width="120"
            align="center"
          />
          <el-table-column
            prop="menuUrl"
            label="前端菜单访问HTML地址"
            width="200"
            align="center"
          />
          <el-table-column
            prop="pid"
            label="父ID"
            width="120"
            align="center"
          />
          <el-table-column
            prop="menuSort"
            label="排序"
            width="120"
            align="center"
          />
          <el-table-column
            prop="description"
            label="描述"
            width="120"
            align="center"
          />
          <el-table-column
            prop="hasChildren"
            label="是否有子菜单"
            width="120"
            align="center"
          />
         
          <el-table-column fixed="right" label="操作" width="180" align="center">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row.id)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
  
  
      <!-- 表单 -->
      <el-dialog v-model="dialogFormVisible" title="添加/编辑">
        <el-form :model="frontendMenu">
          <el-form-item label="前端菜单名称" :label-width="formLabelWidth">
            <el-input v-model="frontendMenu.menuName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="前端菜单访问HTML地址" :label-width="formLabelWidth">
            <el-input v-model="frontendMenu.menuUrl" autocomplete="off" />
          </el-form-item>
          <el-form-item label="父ID" :label-width="formLabelWidth">
            <el-input v-model="frontendMenu.pid" autocomplete="off" />
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input v-model="frontendMenu.menuSort" autocomplete="off" />
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="frontendMenu.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="是否有子菜单" :label-width="formLabelWidth">
            <el-input v-model="frontendMenu.hasChildren" autocomplete="off" />
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
  import frontendMenu from "../../http/frontendMenu";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        formData: [],
        frontendMenu: {},
        dialogFormVisible: false,
      };
    },
    methods: {
    initData() {
        frontendMenu.all().then((res) => {
          this.formData = res.data.communities
        });
      },
      //删除业务 id作参
      handleDelete(id) {
        //封装数据对象
        const data = { id };
        ElMessageBox.confirm("你确定删除该行数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            frontendMenu.deleteById(data).then((res) => {
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
        const data = { id };
        frontendMenu.queryById(data).then((res) => {
          this.frontendMenu = res.data.frontendMenu;
        });
      },
      toAdd() {
        this.dialogFormVisible = true;
        this.frontendMenu = {}
      },
      //执行编辑业务
      excute() {
        if (this.frontendMenu.id != undefined) {
          //编辑逻辑
          frontendMenu.updateById(this.frontendMenu).then((res) => {
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
          frontendMenu.add(this.frontendMenu).then(res => {
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
    mounted() {
      this.initData(1);
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .table {
    margin-top: 10px;
  }
  </style>