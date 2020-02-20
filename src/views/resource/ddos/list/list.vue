<template>
  <div>
    <div class="fatherBox">
      <div class="box-card tabBox">
        <el-tabs v-model="activeName" @tab-click="tabsClick">
          <el-tab-pane
            v-operatePriv="{priv:'resource:ddos:region:list'}"
            label="区域"
            name="resourceDdosRegion"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:ddos:region:line:list'}"
            label="线路"
            name="resourceDdosLine"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:ddos:ip:list'}"
            label="IP"
            name="resourceDdosIp"
          ></el-tab-pane>
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
