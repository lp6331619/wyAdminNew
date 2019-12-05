<template>
  <div>
    <el-card class="box-card">
      <SearchList
        :prepare-data="prepare"
        :search-data="searchForm"
        :search-list-data="formType"
        :operate-priv="operatePrivBox"
        @emitData="emitData($event)"
      />
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员列表</span>
        <el-button class="fr ml10" size="mini" type="primary">用户关联申请</el-button>
        <el-button class="fr ml10" size="mini" type="primary">创建用户</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
.btn {
  padding: 3px 0;
}
</style>
