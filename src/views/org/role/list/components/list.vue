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
          v-operatePriv="{priv:'org:role:create'}"
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
        <el-table-column prop="dept.name" :label="schema.output.dept[':title']"></el-table-column>
        <el-table-column prop="level.name" :label="schema.output.level[':title']"></el-table-column>
        <el-table-column v-if="type==='detail'" prop="admin" label="管理员" width="300">
          <template slot-scope="scope">
            <a
              v-for="(item,i) in scope.row.admin"
              :key="i"
              class="p"
              @click="common.openWindow(`/org/dept/updateRoles/${item.id }`)"
            >{{ item.name }}</a>
            <!-- <a
              class="p"
              @click="common.openWindow(`/org/dept/addRoles/${scope.row.id}?dept=${scope.row.dept.id}`)"
            >添加</a>-->
          </template>
        </el-table-column>
        <el-table-column prop="displayOrder" :label="schema.output.displayOrder" width="100"></el-table-column>
        <el-table-column
          prop="stat.createDateTime"
          :label="schema.output.stat.createDateTime"
          width="180"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                v-operatePriv="{priv:'org:role:update'}"
                plain
                type="primary"
                size="mini"
                @click="setDialog(scope.row.id,'edit')"
              >修改</el-button>
              <el-button
                v-operatePriv="{priv:'org:role:delete'}"
                plain
                type="danger"
                size="mini"
                @click="delMember(scope.row.id)"
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
      :operation-id="operationId"
      @emitOut="emitOutDetail"
    />
    <!-- 创建员工 -->
    <create v-if="createStatus" :status="createStatus" @emitOut="emitOutCreate" />
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
.p {
  display: block;
  margin: 5px 0;
}
</style>
