<template>
  <div>
    <el-card class="box-card">
      <SearchList
        :search-data="searchForm"
        :search-list-data="formType"
        :operate-priv="operatePrivBox"
        :other-data="otherData"
        :export-excel="exportExcel"
        @emitData="emitData($event)"
      />
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="header flex">登录日志</div>
      <el-table
        v-if="listData"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :data="listData"
      >
        <el-table-column prop="loginDateTime" label="登录时间" />
        <el-table-column prop="loginIp" label="登录IP" />
        <el-table-column prop="orgUserId" label="操作用户（ID）" />
        <el-table-column prop="loginName" label="登录账号" />
      </el-table>
      <div class="pageBox flex pt20">
        <span></span>
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
</template>

<script>
import { memberLoginLog } from '@/api/member'
import { SearchList } from '@/components/SearchBox'
export default {
  name: 'EnterLog',
  components: {
    SearchList
  },
  data() {
    return {
      listData: [],
      loading: false,
      searchForm: {
        search: this.$route.query.search
          ? JSON.parse(this.$route.query.search)
          : '',
        LoginEndTimeBox: this.$route.query.LoginEndTimeBox
          ? JSON.parse(this.$route.query.LoginEndTimeBox)
          : { start: '', end: '' }
      },
      formType: [
        {
          typeName: 'IP、登录账号、操作用户',
          type: 'search',
          width: '200px',
          mode: 'Input'
        },
        {
          typeName: '登录时间',
          type: 'LoginEndTimeBox',
          mode: 'SearchTime'
        }
      ],
      otherData: {
        pageSize: this.$route.query.pageSize
          ? JSON.parse(this.$route.query.pageSize)
          : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      // 权限
      operatePrivBox: {
        search: 'log:member_login_log',
        excel: '_special:export_csv'
      },
      exportExcel: '/log/memberLoginLog/list',
      page: {}
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取 list
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      parse.id = this.userId
      parse.loginStartTime = this.searchForm.LoginEndTimeBox.start
      parse.LoginEndTime = this.searchForm.LoginEndTimeBox.end
      memberLoginLog(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res.data
          this.page = res.pagination
          this.loading = false
        }
      })
    },
    // 赋值 url 参数
    toList() {
      const query = {
        active: 4
      }
      const box = Object.assign({}, this.searchForm, this.otherData)
      for (const i in box) {
        query[i] = this.getType(box[i]) ? JSON.stringify(box[i]) : ''
      }
      this.$router.push({
        path: `/member/list/detail/${this.userId}`,
        query: query
      })
      this.getList()
    },
    // 获取数据类型
    getType(data) {
      return data ? typeof data : false
    },
    // 选择每页多少条
    handleSizeChange(data) {
      this.$set(this.otherData, 'pageSize', data)
      this.toList()
    },
    // 跳转到第几页
    handleCurrentChange(data) {
      this.$set(this.otherData, 'page', data)
      this.toList()
    },
    emitData(e) {
      if (!e.clear) {
        this.searchForm = e.searchData
        this.otherData = e.otherData
      }
      this.toList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
