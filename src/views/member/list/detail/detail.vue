<template>
  <div>
    <div class="box-card tabBox">
      <el-tabs v-model="activeName" @tab-click="tabsClick">
        <el-tab-pane v-operatePriv="{priv:'user:member:detail'}" label="账号信息" name="0"></el-tab-pane>
        <el-tab-pane v-operatePriv="{priv:'user:member:product_counter'}" label="产品统计" name="1"></el-tab-pane>
        <el-tab-pane v-operatePriv="{priv:'user:member:detail'}" label="联系信息" name="2"></el-tab-pane>
        <el-tab-pane v-operatePriv="{priv:'user:member:realinfo_detail'}" label="实名认证" name="3"></el-tab-pane>
        <el-tab-pane v-operatePriv="{priv:'log:member_login_log'}" label="登录日志" name="4"></el-tab-pane>
        <el-tab-pane v-operatePriv="{priv:'log:op_log'}" label="操作日志" name="5"></el-tab-pane>
      </el-tabs>
    </div>
    <template v-if="activeName==='0'">
      <account :detail-data="detailBox" @getData="assemblyGetData" @tabsClick="tabsClick" />
      <RemarkCard
        v-operatePriv="{priv:'user:member:note_list'}"
        :remark-urls="remarkUrls"
        :user-id="userId"
      />
    </template>
    <template v-if="activeName==='1'">
      <product />
    </template>
    <template v-if="activeName==='2'">
      <contactBox :detail-box="detailBox" @getData="assemblyGetData" />
    </template>
    <template v-if="activeName==='3'">
      <realname />
    </template>
    <template v-if="activeName==='4'">
      <enterlog />
    </template>
    <template v-if="activeName==='5'">
      <OpList module="user" :disabled="['opObject','module']" />
    </template>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
