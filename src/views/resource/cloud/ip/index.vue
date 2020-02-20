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
          <div>{{ schema.title }} ({{ page.totals }})</div>
        </div>
        <el-table
          v-if="listData"
          ref="multipleTable"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          :data="listData.data"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" :label="schema.output.id" width="100"></el-table-column>
          <el-table-column prop="ip" :label="schema.output.ip"></el-table-column>
          <el-table-column prop="type.value" :label="schema.output.type[':title']"></el-table-column>
          <el-table-column prop="node.name" :label="schema.output.node[':title']"></el-table-column>
          <el-table-column prop="line.name" :label="schema.output.line[':title']"></el-table-column>
          <el-table-column prop="useStatus.name" :label="schema.output.useStatus[':title']"></el-table-column>
          <el-table-column prop="enableStatus.name" :label="schema.output.enableStatus[':title']"></el-table-column>
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
          <div>
            <el-button
              v-operatePriv="{priv:'user:member:detail'}"
              plain
              type="primary"
              size="mini"
              :disabled="selectTable.length===0"
              @click="control('YES')"
            >启用</el-button>
            <el-button
              v-operatePriv="{priv:'user:member:detail'}"
              plain
              type="primary"
              size="mini"
              :disabled="selectTable.length===0"
              @click="control('NO')"
            >禁用</el-button>
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
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" scoped>
</style>
