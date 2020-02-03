<template>
  <div>
    <div class="box-card tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="详情" name="0"></el-tab-pane>
        <el-tab-pane label="角色管理" name="1"></el-tab-pane>
        <el-tab-pane label="子部门" name="2"></el-tab-pane>
        <el-tab-pane label="分公司部门" name="3"></el-tab-pane>
      </el-tabs>
    </div>
    <template v-if="activeName==='0'">
      <detail />
    </template>
    <template v-if="activeName==='1'">
      <roleList type="detail" />
    </template>
    <template v-if="activeName==='2'">
      <childList type="detail" />
    </template>
    <template v-if="activeName==='3'">
      <areaDeptList type="detail" />
    </template>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
