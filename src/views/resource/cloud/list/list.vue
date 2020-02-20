<template>
  <div>
    <div class="fatherBox">
      <div class="box-card tabBox">
        <el-tabs v-model="activeName" @tab-click="tabsClick">
          <el-tab-pane v-operatePriv="{priv:'resource:cloud:node:list'}" label="节点" name="node"></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:cloud:node:disk_type:list'}"
            label="磁盘类型"
            name="diskType"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:os:version:list'}"
            label="操作系统版本"
            name="version"
          ></el-tab-pane>
          <el-tab-pane v-operatePriv="{priv:'resource:cloud:ip:list'}" label="IP" name="ip"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="sonBox">
      <router-view />
    </div>
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
</style>
