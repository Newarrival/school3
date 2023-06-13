<template>
      <div id="app">
        <div class="center-container">
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="folderCount">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                文件夹数量
                <el-tooltip
                  effect="dark"
                  content="该数据来源于校园管理系统"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>相比昨天</span>
              <span class="green">
                24%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value=fileCount>
            <template #title>
              <div style="display: inline-flex; align-items: center">
                文件数量
                <el-tooltip
                  effect="dark"
                  content="该数据来源于校园管理系统"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>相比昨天</span>
              <span class="red">
                12%
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value=friendLinkCount title="该数据来源于校园管理系统">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                文件预览数
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>相比昨天</span>
              <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
              
              </el-icon>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
</div>
</div>
<div class="echart" id="mychart" :style="myChartStyle"></div>
  </template>
  
  <script >
  import * as echarts from "echarts";
  import {
    ArrowRight,
    CaretBottom,
    CaretTop,
    Warning,
  } from '@element-plus/icons-vue'
  import folder from "../../http/folder";
  import { defineComponent } from 'vue';
  import friendLink from "../../http/friendLink";
  import fileInfo from "../../http/fileInfo";
  export default defineComponent({
    data() {
      return {
        folderData: [], 
        folderCount: 0, 
        FriendLinkData:[],
        friendLinkCount:0,
        fileData:[],
        fileCount:0,
        xData: ["文件夹数", "文件数量", "文件预览数"], //横坐标
        yData: [], //数据
        myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
      };
    },
    methods: {
        // 获取文件夹数量
    initFolderData() {
      folder.all().then((res) => {
        this.folderData = res.data.folders;
        this.folderCount = this.folderData.length; // 更新 folderCount 的值
        this.updateYData();
      });
    },
            // 获取预览数量
    initFriendLinkData() {
        friendLink.all().then((res) => {
          this.FriendLinkData = res.data.folders;
          this.friendLinkCount = this.FriendLinkData.length;
          this.updateYData();
        });
      },
    //   获取文件数
      initFileData() {
        fileInfo.all().then((res) => {
          this.fileData = res.data.fileInfos;
          this.fileCount=this.fileData.length;
          this.updateYData();
        });
      },
       // 更新 yData 数组
    updateYData() {
      this.yData = [this.folderCount, this.fileCount, this.friendLinkCount];
      console.log(this.yData)
      console.log(this.yData.length)
      this.initEcharts();
    },
  
      initEcharts() {
      if (this.yData.length > 0) {
    // 基本柱状图
    const option = {
      xAxis: {
        data: this.xData
      },
      yAxis: {},
      series: [
        {
          type: "bar", //形状为柱状图
          data: this.yData,
          label: {
            show: true, // 显示数据标签
            position: "top" // 数据标签位置，可以是 "top", "right", "bottom", "left", "inside" 或具体的坐标 [x, y]
          }
        },
      ]
    };
    const myChart = echarts.init(document.getElementById("mychart"));
    myChart.setOption(option);
    //随着屏幕大小调节图表
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
},

  },
  mounted() {
      this.initEcharts();
      this.initFolderData();
      this.initFriendLinkData();
      this.initFileData();
      
  },
})
  
  </script>

<style>
.center-container {
  display: flex;
  justify-content: center;
}
</style>
