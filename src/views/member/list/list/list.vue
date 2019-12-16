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
          :export-excel="exportExcel"
          @emitData="emitData($event)"
        />
      </el-card>
      <el-card v-if="listData" v-loading="loading" class="box-card">
        <el-row :gutter="20" class="countData">
          <el-col :span="5">
            <el-tooltip
              class="mr10 blue"
              effect="dark"
              content="统计自然月的充值金额，包含现金、微信、支付宝、银行充值金额 "
              placement="right"
            >
              <i class="el-icon-warning"></i>
            </el-tooltip>本月充值累计:
            <span v-if="listData.count" class="orange">{{ listData.count.recharge }}</span>
          </el-col>
          <el-col :span="5">
            本月实际消费额:
            <span v-if="listData.count" class="orange">{{ listData.count.consume }} 元</span>
          </el-col>
          <el-col :span="5">
            本月赠送金额消费额:
            <span v-if="listData.count" class="orange">{{ listData.count.freeConsume }} 元</span>
          </el-col>
          <el-col :span="4">
            产品总数:
            <span
              v-if="listData.count && listData.count.products"
              class="blue"
            >{{ listData.count.products.total || '0' }} 元</span>
          </el-col>
          <el-col :span="5">
            累计余额:
            <span v-if="listData.count" class="orange">{{ listData.count.balance }} 元</span>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card pt0">
        <div slot="header" class="header flex">
          <div>
            会员列表
            <el-button-group class="ml20 buttonBox">
              <el-button
                v-for="(item,index) in count"
                :key="index"
                :class="item.key === otherData.stat?'actions':''"
                size="mini"
                @click="statStatus(item.key)"
              >
                {{ item.name }}:
                <span class="remind">{{ item.value }}</span>
              </el-button>
            </el-button-group>
          </div>
          <div>
            <relation class="fr ml10" @refresh="getList()"></relation>
            <createMember class="fr ml10" @refresh="getList()"></createMember>
          </div>
        </div>
        <el-table
          v-if="listData"
          ref="multipleTable"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          :data="listData.data"
          @sort-change="sortTable"
          @selection-change="handleSelectionChange"
          @filter-change="filterTag"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="会员 ID" sortable="custom" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="$router.push(`/member/list/detail/${scope.row.id }`)"
              >{{ scope.row.id }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="会员信息">
            <template slot-scope="scope">
              {{ scope.row.mobile }}
              <div>{{ scope.row.realInfo.name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column
            prop="level.name"
            label="会员等级"
            :filters="levle"
            :filter-multiple="false"
            column-key="level"
          ></el-table-column>
          <el-table-column
            prop="status.name"
            label="账号状态"
            column-key="status"
            :filters="status"
            :filter-multiple="false"
          >
            <template slot-scope="scope">
              <span :class="statusClass(scope.row.status.key,'status')">{{ scope.row.status.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="realInfo.status.name"
            label="实名状态"
            width="200px"
            column-key="realInfoStatus"
            :filters="realInfoStatus"
            :filter-multiple="false"
          >
            <template slot-scope="scope">
              <div :class="statusClass(scope.row.realInfo.status.key,'realInfoStatus')">
                {{ scope.row.realInfo.status.name }}
                <el-tooltip
                  v-if="scope.row.realInfo.status.key == 'REJECT' || scope.row.realInfo.status.key == 'CHANGE_REJECT'"
                  class="mr10 blue"
                  effect="dark"
                  :content="scope.row.realInfo.info"
                  placement="right"
                >
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="balance" label="余额" sortable="custom"></el-table-column>
          <el-table-column prop="consume" label="累计消费" sortable="custom"></el-table-column>
          <el-table-column prop="saler.name" label="所属销售">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.saler && scope.row.saler.name"
                type="text"
                size="small"
                @click.native.prevent="$router.push({path:'/org/user/detail',query:{id:scope.row.saler.id}})"
              >{{ scope.row.saler.name }}</el-button>
              <span v-else>暂无</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="$router.push(`/member/list/detail/${scope.row.id }`)"
              >管理</el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="toMember(scope.row.id)"
              >登录账号</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBox flex pt20">
          <div>
            <el-checkbox
              v-model="allCheck"
              class="fl allCheck"
              :indeterminate="indeterminate"
              @change="checkAll"
            />
            <modifyLevel
              v-if="prepare"
              class="fl ml10"
              :select-table="selectTable"
              :prepare="prepare.level"
              @refresh="getList()"
            />
            <modifySaler class="fl ml10" :select-table="selectTable" @refresh="getList()" />
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
.btn {
  padding: 3px 0;
}
.countData {
  font-size: 14px;
}
.orange,
.blue {
  font-size: 16px;
  font-weight: bold;
}
.allCheck {
  margin: 5px 10px 0 14px;
}
</style>
