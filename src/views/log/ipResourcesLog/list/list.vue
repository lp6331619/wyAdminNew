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
      </div>
      <el-table
        v-if="listData"
        ref="multipleTable"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :data="listData.data"
      >
        <el-table-column prop="id" :label="schema.output.id" width="100"></el-table-column>
        <el-table-column prop="resource" :label="schema.output.resource" width="130"></el-table-column>
        <el-table-column prop="startTime" :label="schema.output.startTime" width="160"></el-table-column>
        <el-table-column
          prop="ownerInfo"
          :label="`${schema.output.ownerInfo.id}/${schema.output.ownerInfo.name}`"
          width="200"
        >
          <template slot-scope="scope">{{ scope.row.ownerInfo.id }} / {{ scope.row.ownerInfo.name }}</template>
        </el-table-column>
        <el-table-column
          prop="ownerInfo.mobile"
          :label="schema.output.ownerInfo.mobile"
          width="110"
        ></el-table-column>
        <el-table-column prop="ownerInfo.email" :label="schema.output.ownerInfo.email" width="180"></el-table-column>
        <el-table-column prop="opUser.ip" :label="schema.output.opUser.ip" width="100"></el-table-column>
        <el-table-column prop="opUser.summary" :label="schema.output.opUser.summary" width="200"></el-table-column>
        <el-table-column prop="note" :label="schema.output.note"></el-table-column>
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
