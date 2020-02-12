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
            v-operatePriv="{priv:'site:article:create'}"
            type="primary"
            size="mini"
            @click="common.openWindow('/information/news/create',{id:999999})"
          >创建新文章</el-button>
        </div>
        <el-table
          v-if="listData"
          ref="multipleTable"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          :data="listData.data"
        >
          <el-table-column prop="displayOrder" :label="schema.output.displayOrder" width="100"></el-table-column>
          <el-table-column prop="id" :label="schema.output.id"></el-table-column>
          <el-table-column prop="title" :label="schema.output.title"></el-table-column>

          <el-table-column prop="cate.title" :label="schema.output.cate.title"></el-table-column>
          <el-table-column
            prop="stat.createDateTime"
            :label="schema.output.stat.createDateTime"
            width="200"
          ></el-table-column>
          <el-table-column prop="status.name" :label="schema.output.status.name"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  v-operatePriv="{priv:'site:article:detail'}"
                  plain
                  type="primary"
                  size="mini"
                  @click="common.openWindow('/information/news/detail',{id:scope.row.id})"
                >查看</el-button>
                <el-button
                  v-operatePriv="{priv:'site:article:update'}"
                  plain
                  size="mini"
                  @click="common.openWindow('/information/news/detail',{id:scope.row.id,edit:true})"
                >编辑</el-button>
                <el-button
                  v-operatePriv="{priv:'site:article:delete'}"
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
    </div>
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
</style>
