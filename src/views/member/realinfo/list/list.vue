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
          <div>
            {{ schema.title }}({{ page.totals }})
            <el-button-group v-if="count" class="ml20 buttonBox">
              <el-button
                v-for="(item,index) in count"
                :key="index"
                :class="{'actions': item.key === otherData.status}"
                size="mini"
                @click="statStatus(item.key)"
              >
                {{ item.name }}:
                <span class="remind">{{ item.value }}</span>
              </el-button>
            </el-button-group>
          </div>
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
          <el-table-column prop="id" label="记录ID" sortable="custom" width="100">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'user:member:realinfo_detail',display:true}"
                type="text"
                size="small"
                @click.native.prevent="$router.push(`/member/realinfo/authentication/${scope.row.id }`)"
              >{{ scope.row.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="member.id" label="会员ID" width="100">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'user:member:detail',display:true}"
                type="text"
                size="small"
                @click.native.prevent="$router.push(`/member/list/detail/${scope.row.member.id }`)"
              >{{ scope.row.member.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="member.mobile" label="手机" width="120"></el-table-column>
          <el-table-column
            prop="type.name"
            label="认证类型"
            column-key="type"
            :filters="type"
            :filter-multiple="false"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="certificateType"
            label="证件类型"
            column-key="certificateType"
            :filters="certificateType"
            :filter-multiple="false"
            width="150"
          >
            <template slot-scope="scope">{{ scope.row.certificate.type.name }}</template>
          </el-table-column>
          <el-table-column prop="certificate.no" label="证件号码" width="220"></el-table-column>
          <el-table-column prop="certificate.name" label="姓名/企业名称" width="150"></el-table-column>
          <el-table-column
            prop="status.name"
            label="状态"
            column-key="status"
            :filters="status"
            :filter-multiple="false"
            width="100"
          >
            <template slot-scope="scope">
              <span :class="statusClass(scope.row.status.key,'status')">{{ scope.row.status.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createDateTime" label="提交时间" sortable="createDate"></el-table-column>
          <el-table-column prop="certificate.expireTime" label="认证有效期">
            <template slot-scope="scope">
              <span
                v-if="scope.row.certificate && scope.row.certificate.expireTime"
              >{{ scope.row.certificate.expireTime }}</span>
              <span v-else>暂无</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'user:member:realinfo_detail'}"
                plain
                type="primary"
                size="mini"
                @click.native.prevent="$router.push(`/member/realinfo/authentication/${scope.row.id }`)"
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
