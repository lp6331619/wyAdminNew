<template>
  <div>
    <div class="fatherBox">
      <div class="box-card tabBox">
        <el-tabs v-model="activeName" @tab-click="tabsClick">
          <el-tab-pane
            v-operatePriv="{priv:'resource:idc:region:list'}"
            label="区域"
            name="resourceIdcRegion"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:idc:line:list'}"
            label="线路"
            name="resourceIdcLine"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:idc:room:list'}"
            label="机房"
            name="resourceIdcRoom"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:idc:ip_zone:list'}"
            label="IP分组"
            name="resourceIdcIpzone"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:idc:ip:list'}"
            label="IP"
            name="resourceIdcIp"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:idc:cidr:list'}"
            label="IP段"
            name="resourceIdcCidr"
          ></el-tab-pane>
          <el-tab-pane
            v-operatePriv="{priv:'resource:idc:cabinet:list'}"
            label="机柜"
            name="resourceIdcCabinet"
          ></el-tab-pane>
          <el-tab-pane v-operatePriv="{priv:'resource:idc:device:list'}" label="设备" name="device"></el-tab-pane>
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
