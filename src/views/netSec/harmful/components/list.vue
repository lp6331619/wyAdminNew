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
          列表总数 ({{ page.totals }})
          <el-button-group v-if="count" class="ml20 buttonBox">
            <el-button
              v-for="(item, index) in count"
              :key="index"
              :class="item.key === otherData.progress ? 'actions' : ''"
              size="mini"
              @click="onProgress(item.key)"
            >
              {{ item.name }}:
              <span class="remind">{{ item.value }}</span>
            </el-button>
          </el-button-group>
        </div>
        <div>
          <el-button
            v-operatePriv="{priv:'net_sec:harmful_list:create'}"
            size="mini"
            type="primary"
            class="fr ml10"
            @click="onGoEdit()"
          >
            提交有害信息
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
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column prop="domain" label="域名"></el-table-column>
        <el-table-column
          prop="roomName"
          label="机房名称"
          :filters="room"
          :filter-multiple="false"
          column-key="room"
        ></el-table-column>
        <el-table-column
          prop="origin.title"
          label="发现来源"
          :filters="origin"
          :filter-multiple="false"
          column-key="origin"
        ></el-table-column>
        <el-table-column prop="findTime" label="发现时间"></el-table-column>
        <el-table-column
          prop="progress.name"
          label="处理进度"
          :filters="progress"
          :filter-multiple="false"
          column-key="progress"
        ></el-table-column>
        <el-table-column
          prop="way.name"
          label="处理方式"
          :filters="way"
          :filter-multiple="false"
          column-key="way"
        >
          <template slot-scope="scope">
            {{ scope.row.way.key === 'NO_HARMFUL' || scope.row.way.key === 'INVALID' ? '/' : scope.row.way.name }}
          </template>
        </el-table-column>
        <el-table-column prop="lastLogInfo.opUser.summary" label="操作人"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                v-if="scope.row.progress.key === 'TO_ADVICE'"
                v-operatePriv="{priv:'net_sec:domain_white_list:update'}"
                plain
                type="primary"
                size="mini"
                @click="onGoEdit(scope.row.id)"
              >编辑</el-button>
              <el-button
                v-operatePriv="{priv:'net_sec:harmful_list:detail'}"
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
          <batchProcessing
            v-operatePriv="{priv:'net_sec:harmful_list:set_process'}"
            class="fr ml10"
            :select-table="selectTable"
            @refresh="getList()"
          ></batchProcessing>
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
import listJs from './list.js'
export default listJs
</script>

<style lang="scss" scoped>

</style>
