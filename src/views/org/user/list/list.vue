<template>
  <div>
    <div v-if="!isDetail" class="fatherBox">
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
      <el-card class="box-card pt0">
        <div slot="header" class="header flex">
          <div>{{ schema.title }} ({{ page.totals }})</div>
          <el-button
            v-operatePriv="{priv:'org:user:create'}"
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
          <el-table-column prop="id" label="员工 ID" width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" width="200"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column prop="mobile" label="手机" width="120"></el-table-column>
          <el-table-column prop="dept.name" label="部门"></el-table-column>
          <el-table-column prop="roleNames" label="角色">
            <template slot-scope="scope">
              <span v-for="(k,v,i) in scope.row.roleNames" :key="i">
                {{ k }}
                <br />
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status.name" label="状态" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  v-operatePriv="{priv:'org:user:detail'}"
                  plain
                  type="primary"
                  size="mini"
                  @click="$router.push(`/org/user/detail/${scope.row.id }`)"
                >详情</el-button>
                <el-button
                  v-operatePriv="{priv:'org:user:delete'}"
                  plain
                  type="danger"
                  size="mini"
                  @click="delMember(scope.row.id)"
                >删除</el-button>
                <el-button v-popover="`popover${scope.row.id}`" plain size="mini">
                  <i class="el-icon-more" />
                </el-button>
                <el-popover
                  :ref="`popover${scope.row.id}`"
                  placement="right"
                  width="100"
                  trigger="hover"
                >
                  <div class="popover">
                    <ul>
                      <li
                        v-operatePriv="{prive:'org:user:update'}"
                        @click="setDialog(scope.row.id,'edit')"
                      >修改</li>
                      <li
                        v-operatePriv="{prive:'org:user:change_role'}"
                        @click="$router.push(`/org/user/updateRoles/${scope.row.id }`)"
                      >更新角色</li>
                      <li
                        v-operatePriv="{prive:'org:user:change_status'}"
                        @click="setDialog(scope.row.id,'status')"
                      >更新状态</li>
                      <li
                        v-operatePriv="{prive:'org:user:set_password'}"
                        @click="setDialog(scope.row.id,'password')"
                      >更改密码</li>
                    </ul>
                  </div>
                </el-popover>
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
      <!-- 修改密码 -->
      <setPassWord :status="setPassWordStatus" :operation-id="operationId" @emitOut="emitOut" />
      <!-- 修改状态 -->
      <setStatus :status="setStatusStatus" :operation-id="operationId" @emitOut="emitOutStatus" />
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
    <div v-else class="sonBox">
      <router-view />
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
