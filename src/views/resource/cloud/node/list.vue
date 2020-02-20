<template>
  <div>
    <div class="fatherBox">
      <el-card class="box-card">
        <div class="flex">
          <el-tabs v-model="activeName" tab-position="left" @tab-click="tabsClick">
            <el-tab-pane v-operatePriv="{priv:'resource:cloud:node:list'}" label="节点" name="node"></el-tab-pane>
            <el-tab-pane
              v-operatePriv="{priv:'resource:cloud:node:line:list'}"
              label="线路"
              name="line"
            ></el-tab-pane>
            <el-tab-pane
              v-operatePriv="{priv:'resource:cloud:node:image:list'}"
              label="镜像"
              name="image"
            ></el-tab-pane>
            <el-tab-pane
              v-operatePriv="{priv:'resource:cloud:node:disk_type:list'}"
              label="磁盘类型"
              name="diskType"
            ></el-tab-pane>
            <el-tab-pane
              v-operatePriv="{priv:'resource:cloud:node:cpu_mem:list'}"
              label="cpu内存"
              name="cpuMem"
            ></el-tab-pane>
          </el-tabs>
          <div class="w100">
            <router-view />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
.flex {
  justify-content: flex-start;
}
.el-tabs {
  width: 120px;
}
.w100 {
  width: 100%;
}
</style>
