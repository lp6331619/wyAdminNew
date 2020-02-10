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
          <el-button
            v-operatePriv="{priv:'express:company:create'}"
            type="primary"
            size="mini"
            @click="createStatus = true"
          >创建</el-button>
        </div>
        <el-table
          v-if="listData"
          ref="multipleTable"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          :data="listData.data"
        >
          <el-table-column prop="id" :label="schema.output.id" width="100"></el-table-column>
          <el-table-column prop="name" :label="schema.output.name"></el-table-column>
          <el-table-column prop="expense" :label="schema.output.expense"></el-table-column>
          <el-table-column prop="allowUsedBy" :label="schema.output.allowUsedBy"></el-table-column>
          <el-table-column prop="displayOrder" :label="schema.output.displayOrder"></el-table-column>

          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  v-operatePriv="{priv:'express:company:update'}"
                  plain
                  type="primary"
                  size="mini"
                  @click="setDialog(scope.row.id)"
                >修改</el-button>
                <el-button
                  v-operatePriv="{priv:'express:company:delete'}"
                  plain
                  type="danger"
                  size="mini"
                  @click="delMember(scope.row)"
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
      <!-- 创建员工 -->
      <create v-if="createStatus" :status="createStatus" @emitOut="emitOutCreate" />
      <update
        v-if="updateStatus"
        :status="updateStatus"
        :operation-id="operationId"
        @emitOut="emitOutUpdate"
      />
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
