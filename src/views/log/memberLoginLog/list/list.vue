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
      <el-card class="box-card pt0" v-if="listData.data && schema">
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
          <el-table-column prop="id" :label="schema.output.id" width="100"></el-table-column>
          <el-table-column prop="memberId" :label="schema.output.memberId" width="100"></el-table-column>
          <el-table-column prop="memberName" :label="schema.output.memberName" width="100"></el-table-column>
          <el-table-column prop="loginName" :label="schema.output.loginName" width="150"></el-table-column>
          <el-table-column prop="loginIp" :label="schema.output.loginIp"></el-table-column>
          <el-table-column prop="loginDateTime" :label="schema.output.loginDateTime" width="200"></el-table-column>
          <el-table-column prop="orgUserId" :label="schema.output.orgUserId" width="100"></el-table-column>
          <el-table-column prop="orgUserName" :label="schema.output.orgUserName"></el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'log:member_login_log'}"
                plain
                type="primary"
                size="mini"
                @click="common.openWindow(`/log/memberLoginLog/detail/${scope.row.id}`)"
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
