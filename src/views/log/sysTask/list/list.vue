<template>
  <div>
    <div v-if="!isDetail" class="fatherBox">
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
      <el-card v-if="listData.data && schema" class="box-card pt0">
        <div slot="header" class="header flex">
          <div>{{ schema.title }} ({{ page.totals }})</div>
        </div>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          :data="listData.data"
        >
          <el-table-column prop="id" :label="schema.output.id" width="70"></el-table-column>
          <el-table-column
            prop="resInfo.moduleName"
            :label="schema.output.resInfo.moduleName"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="resInfo.typeName"
            :label="schema.output.resInfo.typeName"
            width="80"
          ></el-table-column>
          <el-table-column prop="resInfo.id" :label="schema.output.resInfo.id" width="70"></el-table-column>
          <el-table-column prop="resInfo.name" :label="schema.output.resInfo.name"></el-table-column>
          <el-table-column prop="actionName" :label="schema.output.actionName" width="100"></el-table-column>
          <el-table-column prop="startDateTime" :label="schema.output.startDateTime" width="160"></el-table-column>
          <el-table-column prop="endDateTime" :label="schema.output.endDateTime" width="160"></el-table-column>
          <el-table-column prop="status.name" :label="schema.output.status.name" width="100"></el-table-column>
          <el-table-column prop="summary" :label="schema.output.summary" width="100"></el-table-column>
          <el-table-column prop="opUser.summary" :label="schema.output.opUser.summary"></el-table-column>
          <el-table-column prop="opUser.ip" :label="schema.output.opUser.ip"></el-table-column>

          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'log:sys_task'}"
                plain
                type="primary"
                size="mini"
                @click="common.openWindow(`/log/sysTask/detail/${scope.row.id}`)"
              >详情</el-button>
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
    <div v-else class="sonBox">
      <router-view />
    </div>
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
