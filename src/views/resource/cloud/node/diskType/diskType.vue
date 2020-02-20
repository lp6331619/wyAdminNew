<template>
  <div>
    <div class="fatherBox">
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
      <el-card v-if="schema" v-loading="loading" class="box-card pt0">
        <div slot="header" class="header flex">
          <div>节点-{{ schema.title }} ({{ page.totals }})</div>
          <el-button
            v-operatePriv="{priv:'resource:cloud:node:disk_type:create'}"
            type="primary"
            size="mini"
            @click="setEditDetail = true;scene = 'create'"
          >新建</el-button>
        </div>
        <el-table
          v-if="listData"
          ref="multipleTable"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          :data="listData.data"
        >
          <el-table-column prop="id" :label="schema.output.id" width="80"></el-table-column>
          <el-table-column prop="node.name" :label="schema.output.node[':title']"></el-table-column>
          <el-table-column prop="info.name" :label="schema.output.info[':title']"></el-table-column>
          <el-table-column prop="maxSize.value" :label="schema.output.maxSize[':title']"></el-table-column>
          <el-table-column prop="cinderType" :label="schema.output.cinderType"></el-table-column>
          <el-table-column
            prop="enableStatus.name"
            :label="schema.output.enableStatus[':title']"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="stat.createDateTime"
            :label="schema.output.stat.createDateTime"
            width="200"
          ></el-table-column>

          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'resource:cloud:node:disk_type:detail'}"
                plain
                type="primary"
                size="mini"
                @click="setDialog(scope.row.id,'edit')"
              >查看</el-button>
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
      <!-- 创建、修改 -->
      <update
        v-if="setEditDetail"
        :status="setEditDetail"
        :scene="scene"
        :operation-id="operationId"
        @emitOut="emitOutDetail"
      />
    </div>
  </div>
</template>

<script>
import diskTypeJs from './diskType'
export default diskTypeJs
</script>

<style lang="scss" scoped>
</style>
