<template>
  <div>
    <el-card class="box-card">
      <SearchList
        :prepare-data="prepare"
        :search-data="searchForm"
        :search-list-data="formType"
        :operate-priv="operatePrivBox"
        :other-data="otherData"
        :export-excel="exportExcel"
        @emitData="emitData($event)"
      />
    </el-card>
    <el-card v-loading="loading" class="box-card pt0">
      <div slot="header" class="header flex">
        <div>日志列表 ({{ page.totals }})</div>
      </div>
      <OpList v-if="listData" :list-data="listData" />
      <div class="pageBox flex pt20">
        <el-pagination
          v-if="page && page.options"
          background
          :total="page.totals"
          :current-page="page.curPage"
          :page-sizes="page.options.customPageSize"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
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
.countData {
  font-size: 14px;
}
.orange,
.blue {
  font-size: 16px;
  font-weight: bold;
}
</style>
