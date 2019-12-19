<template>
  <div>
    <el-card class="box-card">
      <SearchList
        :search-data="searchForm"
        :search-list-data="formType"
        :operate-priv="operatePrivBox"
        :other-data="otherData"
        :export-excel="exportExcel"
        :prepare-data="prepare"
        @emitData="emitData($event)"
      />
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="header flex">操作日志列表</div>
      <el-table
        v-if="listData"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :data="listData"
      >
        <el-table-column prop="opDateTime" label="操作时间" />
        <el-table-column prop="opUser.ip" label="操作IP(归属地)" />
        <el-table-column prop="opUser.summary" label="操作用户（ID）" />
        <el-table-column prop="opUser.loginName" label="登录账号" />
        <el-table-column prop="opTypeName" label="被操作类型" />
        <el-table-column prop="info" label="操作明细" />
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
import { opLogList } from '@/api/member'
import { SearchList } from '@/components/SearchBox'
export default {
  name: 'MemberOplog',
  components: {
    SearchList
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    list: {
      type: String,
      default: ''
    },
    privs: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listData: [],
      loading: false,
      searchForm: {
        ip: this.$route.query.ip ? JSON.parse(this.$route.query.ip) : '',
        info: this.$route.query.info ? JSON.parse(this.$route.query.info) : '',
        opUser: this.$route.query.opUser
          ? JSON.parse(this.$route.query.opUser)
          : '',
        loginName: this.$route.query.loginName
          ? JSON.parse(this.$route.query.loginName)
          : '',
        opType: this.$route.query.opType
          ? JSON.parse(this.$route.query.opType)
          : '',
        opStartTimeBox: this.$route.query.opStartTimeBox
          ? JSON.parse(this.$route.query.opStartTimeBox)
          : { start: '', end: '' }
      },
      formType: [
        {
          typeName: '操作明细关键字',
          type: 'info',
          mode: 'Input'
        },
        {
          typeName: '操作用户',
          type: 'opUser',
          mode: 'Input'
        },
        {
          typeName: '登录账号',
          type: 'loginName',
          mode: 'Input'
        },
        {
          typeName: 'IP、归属地',
          type: 'ip',
          mode: 'Input'
        },
        {
          typeName: '操作类型',
          type: 'opType',
          prepareType: 'memberOpType',
          mode: 'SearchSelect'
        },
        {
          typeName: '操作时间',
          type: 'opStartTimeBox',
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
        search: this.privs,
        excel: '_special:export_csv'
      },
      exportExcel: this.url,
      page: {},
      prepare: {}
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  created() {
    this.opLogPrepare()
    this.getList()
  },
  methods: {
    // 获取 list
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      parse.opObject = this.userId
      parse.module = 'user'
      parse.opStartTime = this.searchForm.opStartTimeBox.start
      parse.opEndTime = this.searchForm.opStartTimeBox.end
      opLogList(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res.data
          this.page = res.pagination
          this.loading = false
        }
      })
    },
    // 获取withSchema
    opLogPrepare() {
      opLogList({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    // 赋值 url 参数
    toList() {
      const query = {
        active: 5
      }
      const box = Object.assign({}, this.searchForm, this.otherData)
      for (const i in box) {
        query[i] = this.getType(box[i]) ? JSON.stringify(box[i]) : ''
      }
      this.$router.push({
        path: `${this.list}/${this.userId}`,
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
