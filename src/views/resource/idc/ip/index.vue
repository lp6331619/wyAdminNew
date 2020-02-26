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
            v-operatePriv="{priv:'resource:idc:ip:create'}"
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
          <el-table-column prop="id" :label="schema.output.id" sortable="custom" width="80"></el-table-column>
          <el-table-column prop="ip" :label="schema.output.ip" sortable="custom" width="130"></el-table-column>
          <el-table-column prop="type.name" :label="schema.output.type[':title']"></el-table-column>
          <el-table-column prop="room.name" :label="schema.output.room[':title']"></el-table-column>
          <el-table-column prop="line.name" :label="schema.output.line[':title']"></el-table-column>
          <el-table-column prop="zone.name" :label="schema.output.zone[':title']"></el-table-column>
          <el-table-column prop="owner.name" :label="schema.output.owner[':title']"></el-table-column>
          <el-table-column prop="useStatus.name" :label="schema.output.useStatus[':title']"></el-table-column>
          <el-table-column prop="enableStatus.name" :label="schema.output.enableStatus[':title']"></el-table-column>
          <el-table-column prop="ddosStatus.block.name" :label="schema.output.ddosStatus[':title']"></el-table-column>

          <el-table-column fixed="right" label="操作" width="190">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  v-operatePriv="{priv:'resource:idc:ip:detail'}"
                  plain
                  type="primary"
                  size="mini"
                  @click="setDialog(scope.row.id,'edit')"
                >查看</el-button>
                <el-button plain size="mini" @click="setDialog(scope.row.id,'status')">状态</el-button>
                <el-button
                  v-operatePriv="{priv:'resource:idc:ip:delete'}"
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
