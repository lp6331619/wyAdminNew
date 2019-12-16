<template>
  <div>
    <div class="box-card tabBox">
      <el-tabs v-model="activeName" @tab-click="tabsClick">
        <el-tab-pane label="账号信息" name="0"></el-tab-pane>
        <el-tab-pane label="产品统计" name="1"></el-tab-pane>
        <el-tab-pane label="联系信息" name="2"></el-tab-pane>
        <el-tab-pane label="实名认证" name="3"></el-tab-pane>
        <el-tab-pane label="登录日志" name="4"></el-tab-pane>
        <el-tab-pane label="操作日志" name="5"></el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="activeName==='0'">
      <el-card class="box-card">
        <div slot="header" class="header flex">会员列表</div>
        <account :detail-data="detailBox" @getData="assemblyGetData" @tabsClick="tabsClick" />
      </el-card>

      <RemarkCard />
    </div>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
