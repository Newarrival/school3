<template>
    <div class="layout">
      <div class="sidebar">
        <!-- 侧边栏内容 -->
        <el-menu
  active-text-color="#ffd04b"
  background-color="#545c64"
  class="el-menu-vertical-demo"
  default-active="2"
  text-color="#fff"
>
  <el-sub-menu index="1" >
    <template #title>
      <el-icon><location /></el-icon>
      <span>文件管理</span>
    </template>
    <el-menu-item index="1-1">
      <router-link to="/folder" class="custom-menu">文件夹管理</router-link>
    </el-menu-item>
    <el-menu-item index="1-2">
      <router-link to="/fileInfo" class="custom-menu">文件管理</router-link>
    </el-menu-item>
    <el-menu-item index="1-3">
      <router-link to="/friendLink" class="custom-menu">文件预览</router-link>
    </el-menu-item>
    <el-menu-item index="1-4">
      <router-link to="/tj" class="custom-menu">文件统计</router-link>
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item index="4">
    <el-icon><setting /></el-icon>
    <span>未开发功能</span>
  </el-menu-item>
</el-menu>

      </div>
      <div class="content">
        <!-- 内容区域 -->
        <div class="content">
  <router-view></router-view>
</div>

      </div>
    </div>
  </template>
  <style scoped>
  .layout {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 200px;
    background-color: #fff;
    height: 100%;
  }
  
  .content {
    flex-grow: 1;
    padding: 20px;
  }
  .custom-menu {
  color: #fff; /* 设置字体颜色为白色 */
  text-decoration: none; /* 移除下划线 */
}


.el-menu-vertical-demo {
  height: 100%;
}

  </style>