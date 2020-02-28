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
      <el-card v-if="schema && listData" v-loading="loading" class="box-card pt0">
        <div slot="header" class="header flex">
          <div>{{ schema.title }} ({{ page.totals }})</div>
          <el-button
            v-operatePriv="{priv:'resource:idc:device:spec:create'}"
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
          @sort-change="sortTable"
        >
          <el-table-column prop="id" :label="schema.output.id" sortable="custom" width="60"></el-table-column>
          <el-table-column prop="type.name" :label="schema.output.type[':title']"></el-table-column>
          <el-table-column prop="spec" :label="schema.output.spec" sortable="custom"></el-table-column>
          <el-table-column prop="name" :label="schema.output.name"></el-table-column>
          <el-table-column
            prop="stat.updateDateTime"
            :label="schema.output.stat[':title']"
            sortable="custom"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="135">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  v-operatePriv="{priv:'resource:idc:device:spec:detail'}"
                  plain
                  type="primary"
                  size="mini"
                  @click="setDialog(scope.row.id,'edit')"
                >查看</el-button>
                <el-button
                  v-operatePriv="{priv:'resource:idc:device:spec:delete'}"
                  plain
                  type="danger"
                  size="mini"
                  @click="del(scope.row)"
                >删除</el-button>
              </el-button-group>
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
import indexJs from './index'
export default indexJs
</script>

<style lang="scss" scoped>
</style>
