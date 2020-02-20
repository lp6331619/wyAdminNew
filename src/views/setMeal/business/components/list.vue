<template>
  <div>
    <el-card class="box-card">
      <SearchList
        :prepare-data="prepare"
        :search-data="searchForm"
        :search-list-data="formType"
        :operate-priv="operatePrivBox"
        :other-data="otherData"
        @emitData="emitData($event)"
      />
    </el-card>
    <el-card v-if="schema" class="box-card pt0">
      <div slot="header" class="header flex">
        <div>{{ schema.title }} ({{ page.totals }})</div>
        <el-button
          v-operatePriv="{priv:'business:combo:create'}"
          type="primary"
          size="mini"
          @click="common.openWindow(`/combo/business/detail/99999`,{scene:'create'})"
        >创建</el-button>
      </div>
      <el-table
        v-if="listData"
        ref="multipleTable"
        v-loading="loading"
        :data="listData.data"
        style="width: 100%"
        @sort-change="sortTable"
      >
        <el-table-column prop="id" :label="schema.output.id" width="200"></el-table-column>
        <el-table-column prop="name" :label="schema.output.name">
          <template slot-scope="scope">{{ scope.row.name ? scope.row.name : '暂无' }}</template>
        </el-table-column>
        <el-table-column
          prop="stat.createDateTime"
          :label="schema.output.stat.createDateTime"
          width="200"
          sortable="custom"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-operatePriv="{priv:'business:combo:detail'}"
              plain
              type="primary"
              size="mini"
              @click="common.openWindow(`/combo/business/detail/${scope.row.id }`,{scene:'detail'})"
            >管理</el-button>
          </template>
        </el-table-column>
      </el-table>
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
.popover {
  text-align: center;
  ul {
    margin: 0;
  }
  li {
    line-height: 40px;
    cursor: pointer;
    &:hover {
      background: #f6f6f6;
    }
  }
}
</style>
