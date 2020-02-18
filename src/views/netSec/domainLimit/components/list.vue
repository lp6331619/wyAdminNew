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
    <el-card class="box-card pt0">
      <div class="header flex">
        <div>
          产品总数 ({{ count }})
        </div>
        <div>
          <el-button
            v-operatePriv="{priv:'net_sec:domain_limit:global_list'}"
            size="mini"
            type="primary"
            class="fr ml10"
            @click="onGoSetting()"
          >
            全局域名限制默认设置
          </el-button>
        </div>
      </div>
      <el-table
        v-if="listData"
        ref="multipleTable"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :data="listData"
        @filter-change="onFilterChange"
      >
        <el-table-column prop="member" label="所属会员">
          <template slot-scope="scope">
            {{ scope.row.member.mobile }}
            <div>{{ scope.row.member.name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="产品类型">
        </el-table-column>
        <el-table-column prop="no" label="产品编号">
        </el-table-column>
        <el-table-column
          prop="status.name"
          label="产品状态"
          :filters="status"
          :filter-multiple="false"
          column-key="status"
        >
          <template slot-scope="scope">
            <div>
              <span :class="getClass(scope.row.status.key)">{{ scope.row.status.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="roomName" label="机房名字">
          <template slot-scope="scope">
            <div>
              <div>{{ scope.row.roomName || "-" }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="ips" label="关联IP">
          <template slot-scope="scope">
            <div>
              <el-tooltip v-if="scope.row.ips.length > 1" class="item" effect="dark" :content="scope.row.ips.join(',')" placement="right-end">
                <div>{{ scope.row.ips[0] }} + </div>
              </el-tooltip>
              <div v-else>{{ scope.row.ips.length > 0 ? scope.row.ips[0] : "-" }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="domainNums" label="已提交数（个）">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                v-operatePriv="{priv:'net_sec:domain_limit:update'}"
                plain
                type="primary"
                size="mini"
                @click="onGoEdit(scope.row)"
              >编辑</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox flex pt20">
        <div></div>
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
import listJs from './list.js'
export default listJs
</script>

<style lang="scss" scoped>
</style>
