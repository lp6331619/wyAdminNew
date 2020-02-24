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
          {{ schema.title }} ({{ page.totals }})
          <el-button-group v-if="count" class="ml20 buttonBox">
            <el-button
              v-for="(item, index) in count"
              :key="index"
              :class="item.key === otherData.auditStatus ? 'actions' : ''"
              size="mini"
              @click="onAuditStatus(item.key)"
            >
              {{ item.name }}:
              <span class="remind">{{ item.value }}</span>
            </el-button>
          </el-button-group>
        </div>
        <div>
          <el-button
            v-operatePriv="{priv:'net_sec:domain_white_list:detail'}"
            size="mini"
            type="primary"
            class="fr ml10"
            @click="onGoEdit()"
          >
            添加白名单
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
        @selection-change="onSelectChange"
        @filter-change="onFilterChange"
      >
        <el-table-column type="selection" :selectable="onSelection" width="55"></el-table-column>
        <el-table-column prop="member" label="所属会员" width="100">
          <template slot-scope="scope">
            {{ scope.row.member.mobile }}
            <div>{{ scope.row.member.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="typeInfo.name"
          label="产品类型"
          :filters="type"
          :filter-multiple="false"
          column-key="type"
        ></el-table-column>
        <el-table-column prop="assetNo" label="产品编号">
          <template slot-scope="scope">
            <div>{{ scope.row.prodInfo.no }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="domain" label="域名"></el-table-column>
        <el-table-column prop="ips" label="订单关联IP">
          <template slot-scope="scope">
            <div>
              <el-tooltip v-if="scope.row.ips.length > 1" class="item" effect="dark" :content="scope.row.ips.join(',')" placement="right-end">
                <div>{{ scope.row.ips[0] }} +</div>
              </el-tooltip>
              <div v-else>{{ scope.row.ips.length > 0 ? scope.row.ips[0] : "-" }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createUser" label="提交人"></el-table-column>
        <el-table-column
          prop="auditStatus.name"
          label="审核状态"
          :filters="auditStatus"
          :filter-multiple="false"
          column-key="auditStatus"
        ></el-table-column>
        <el-table-column
          prop="status.name"
          label="导入防火墙状态"
          :filters="status"
          :filter-multiple="false"
          column-key="status"
        ></el-table-column>
        <el-table-column
          prop="prodStatus.name"
          label="运行状态"
          :filters="prodStatus"
          :filter-multiple="false"
          column-key="prodStatus"
        ></el-table-column>
        <el-table-column prop="lastAuditInfo.opUser.summary" label="操作人"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                v-if="scope.row.auditStatus.key !== 'INVALID' && scope.row.auditStatus.key !== 'FOUL' && scope.row.auditStatus.key !== 'NO_ICP'"
                v-operatePriv="{priv:'net_sec:domain_white_list:update'}"
                plain
                type="primary"
                size="mini"
                @click="onGoEdit(scope.row.id)"
              >编辑</el-button>
              <el-button
                v-operatePriv="{priv:'net_sec:domain_white_list:detail'}"
                plain
                size="mini"
                @click="onGoDetail(scope.row.id)"
              >详情</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox flex pt20">
        <div>
          <el-checkbox
            v-model="allCheck"
            class="fl allCheck"
            :indeterminate="indeterminate"
            @change="onCheckAll"
          />
          <reviewed
            v-operatePriv="{priv:'net_sec:domain_white_l ist:set_audit_status'}"
            class="fr ml10"
            :select-table="selectTable"
            @refresh="getListData()"
          ></reviewed>
        </div>
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
import ListJs from './list'
export default ListJs
</script>

<style lang="scss" scoped>

</style>
