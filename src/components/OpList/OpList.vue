<template>
  <div>
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
    <el-card v-loading="loading" class="box-card pt0">
      <div slot="header" class="header flex">
        <div>日志列表 ({{ page.totals }})</div>
      </div>

      <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="listData.data">
        <el-table-column prop="opDateTime" label="操作时间" width="220" />>
        <el-table-column prop="opUser.ip" label="操作IP(归属地)" width="150" />
        <el-table-column prop="opUser.summary" label="操作用户(ID)" />
        <el-table-column prop="opUser.loginName" label="登录账号" width="150" />
        <el-table-column prop="opObject" label="被操作类型" width="150" />
        <el-table-column prop="info" label="操作明细" />
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
</template>

<script>
import { opLogList } from '@/api/log'
import { SearchList } from '@/components/SearchBox'
export default {
  name: 'OpList',
  components: {
    SearchList
  },
  props: {
    // 类型
    module: {
      type: String,
      default: ''
    },
    // 被禁用的搜索选项
    disabled: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        info: this.$route.query.info
          ? JSON.parse(this.$route.query.info)
          : undefined,
        active: this.$route.query.active
          ? JSON.parse(this.$route.query.active)
          : 5,
        opUser: this.$route.query.opUser
          ? JSON.parse(this.$route.query.opUser)
          : undefined,
        loginName: this.$route.query.loginName
          ? JSON.parse(this.$route.query.loginName)
          : undefined,

        opObject: this.$route.query.opObject
          ? JSON.parse(this.$route.query.opObject)
          : this.$route.params.id,
        ip: this.$route.query.ip ? JSON.parse(this.$route.query.ip) : undefined,
        module: this.$route.query.module
          ? JSON.parse(this.$route.query.module)
          : undefined,
        opType: this.$route.query.opType
          ? JSON.parse(this.$route.query.opType)
          : undefined,
        opTime: this.$route.query.opTime
          ? JSON.parse(this.$route.query.opTime)
          : {
              start: '',
              end: ''
            }
      },
      // 权限
      operatePrivBox: { search: 'log:op_log', excel: '_special:export_csv' },
      // 搜索的列表数据类型格式
      formType: [
        {
          typeName: '操作明细关键字',
          type: 'info',
          mode: 'Input',
          disabled: this.getDisabled('info')
        },
        {
          typeName: '操作用户',
          type: 'opUser',
          mode: 'Input',
          disabled: this.getDisabled('opUser')
        },
        {
          typeName: '登录账号',
          type: 'loginName',
          mode: 'Input',
          disabled: this.getDisabled('loginName')
        },
        {
          typeName: '被操作对象',
          type: 'opObject',
          mode: 'Input',
          disabled: this.getDisabled('opObject')
        },
        {
          typeName: 'IP、归属地',
          type: 'ip',
          mode: 'Input',
          disabled: this.getDisabled('ip')
        },
        {
          typeName: '操作模块',
          type: 'module',
          mode: 'SearchSelect',
          disabled: this.getDisabled('module')
        },
        {
          typeName: '操作类型',
          type: 'opType',
          prepareType: 'memberOpType',
          mode: 'SearchSelect',
          disabled: this.getDisabled('opType')
        },
        {
          typeName: '操作时间',
          type: 'opTime',
          mode: 'SearchTime',
          disabled: this.getDisabled('opTime')
        }
      ],
      // 导出 excel 链接
      exportExcel: '/log/opLog/list',
      // 其余的数据
      otherData: {
        pageSize: this.$route.query.pageSize
          ? JSON.parse(this.$route.query.pageSize)
          : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: {},
      schema: {},
      listData: {
        data: undefined
      }, // 列表数据
      // 表头筛选数据
      page: {} // 分页
    }
  },
  created() {
    this.getRule('prepare')
    this.getList()
  },
  methods: {
    // 获取 schema prepare
    getRule(type) {
      opLogList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const time = {
        opStartTime: this.searchForm.opTime.start,
        opEndTime: this.searchForm.opTime.end
      }
      this.module ? (this.searchForm['module'] = this.module) : ''
      // this.searchForm.active ? delete this.searchForm.active : ''
      const parse = Object.assign({}, this.searchForm, time, this.otherData)
      opLogList(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res
          this.loading = false
          this.page = res.pagination
        }
      })
    },
    // 组件返回数据
    emitData(data) {
      if (data.clear) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.clearSort()
        this.$refs.multipleTable.clearFilter()
        this.disabled.forEach(item => {
          switch (item) {
            case 'opObject':
              this.searchForm[item] = this.$route.params.id
              break
            case 'module':
              this.searchForm[item] = this.module
              break
          }
        })
        this.searchForm.active = 5
      } else {
        this.searchForm = data.searchData
        this.otherData = data.otherData
      }
      this.toList()
    },
    // 赋值 url 参数
    toList() {
      const query = {}
      const box = Object.assign({}, this.searchForm, this.otherData)
      for (const i in box) {
        query[i] = this.getType(box[i]) ? JSON.stringify(box[i]) : ''
      }
      this.$router.push({
        path: this.$route.path,
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
    getDisabled(e) {
      return this.disabled.includes(e)
    }
  }
}
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
</style>
