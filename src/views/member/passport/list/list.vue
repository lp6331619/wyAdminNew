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
          :export-excel="exportExcel"
          @emitData="emitData($event)"
        />
      </el-card>
      <el-card class="box-card pt0">
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
          @sort-change="sortTable"
          @filter-change="filterTag"
        >
          <el-table-column prop="id" label="通行证ID" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'user:passport:update',display:true}"
                type="text"
                size="small"
                @click.native.prevent="common.openWindow(`/member/passport/update/${scope.row.id }`)"
              >{{ scope.row.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="通行证"></el-table-column>
          <el-table-column prop="member.id" label="会员 ID" width="150">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.member"
                v-operatePriv="{priv:'user:member:detail',display:true}"
                type="text"
                size="small"
                @click.native.prevent="common.openWindow(`/member/list/detail/${scope.row.member.id }`)"
              >
                {{ scope.row.member.mobile }}
                <br />
                {{ scope.row.member.name }}
              </el-button>
              <span v-else>暂无</span>
            </template>
          </el-table-column>
          <el-table-column prop="wyId" label="WYID" width="100">
            <template slot-scope="scope">{{ scope.row.wyId?scope.row.wyId:'暂无' }}</template>
          </el-table-column>

          <el-table-column
            prop="status.name"
            label="状态"
            column-key="status"
            :filters="status"
            :filter-multiple="false"
            width="120"
          >
            <template slot-scope="scope">
              <span :class="statusColor(scope.row.status.key,'status')">{{ scope.row.status.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mergeStatus.name"
            label="合并状态"
            column-key="mergeStatus"
            :filters="mergeStatus"
            :filter-multiple="false"
            width="120"
          >
            <template slot-scope="scope">
              <span
                :class="statusColor(scope.row.mergeStatus.key,'mergeStatus')"
              >{{ scope.row.mergeStatus.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mergeDateTime" label="合并时间" sortable="mergeDateTime"></el-table-column>
          <el-table-column prop="syncDateTime" label="同步时间" sortable="syncDateTime">
            <template slot-scope="scope">
              <span>{{ scope.row.syncDateTime ? scope.row.syncDateTime :' 暂无 ' }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'user:passport:update'}"
                plain
                type="primary"
                size="mini"
                @click.native.prevent="common.openWindow(`/member/passport/update/${scope.row.id }`)"
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
