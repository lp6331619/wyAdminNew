<template>
  <div>
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
    <el-card v-if="schema" class="box-card pt0">
      <div slot="header" class="header flex">
        <div>{{ schema.title }} ({{ page.totals }})</div>
        <el-button
          v-operatePriv="{priv:'message:subscribe:create'}"
          type="primary"
          size="mini"
          @click="setEditDetail = true;scene = 'create'"
        >新增自定义</el-button>
      </div>
      <el-table
        v-if="listData"
        ref="multipleTable"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :data="listData.data"
      >
        <el-table-column prop="id" :label="schema.output.id" width="200"></el-table-column>
        <el-table-column prop="name" :label="schema.output.name"></el-table-column>
        <el-table-column
          prop="stat.createDateTime"
          :label="schema.output.stat.createDateTime"
          width="200"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                v-operatePriv="{priv:'message:subscribe:detail'}"
                plain
                type="primary"
                size="mini"
                @click="setDialog(scope.row.id,'edit')"
              >详情</el-button>
              <el-button
                v-operatePriv="{priv:'message:subscribe:update'}"
                plain
                size="mini"
                @click.native.prevent="common.openWindow(`/message/subscribe/updateUsers/${scope.row.id}`)"
              >更新用户</el-button>
              <el-button
                v-operatePriv="{priv:'message:subscribe:detail'}"
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
    <!-- 修改详情 -->
    <edit
      v-if="setEditDetail"
      :status="setEditDetail"
      :scene="scene"
      :operation-id="operationId"
      @emitOut="emitOutDetail"
    />
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
