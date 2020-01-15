import { opLogList } from '@/api/member'
import { SearchList } from '@/components/SearchBox'
import { OpList } from '@/components'

export default {
  components: {
    SearchList, // 搜索
    OpList
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        info: this.$route.query.info ? JSON.parse(this.$route.query.info) : undefined,
        opUser: this.$route.query.opUser ? JSON.parse(this.$route.query.opUser) : undefined,
        loginName: this.$route.query.loginName ? JSON.parse(this.$route.query.loginName) : undefined,
        opObject: this.$route.query.opObject ? JSON.parse(this.$route.query.opObject) : undefined,
        ip: this.$route.query.ip ? JSON.parse(this.$route.query.ip) : undefined,
        opType: this.$route.query.opType ? JSON.parse(this.$route.query.opType) : undefined,
        module: this.$route.query.module ? JSON.parse(this.$route.query.module) : 'user',
        opTime: this.$route.query.opTime ? JSON.parse(this.$route.query.opTime) : {
          start: '',
          end: ''
        }
      },
      // 权限
      operatePrivBox: {
        search: 'log:op_log',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '操作明细关键字',
        type: 'info',
        mode: 'Input'
      }, {
        typeName: '操作用户',
        type: 'opUser',
        mode: 'Input'
      }, {
        typeName: '登录账号',
        type: 'loginName',
        mode: 'Input'
      }, {
        typeName: '被操作对象',
        type: 'opObject',
        mode: 'Input'
      }, {
        typeName: 'IP、归属地',
        type: 'ip',
        mode: 'Input'
      }, {
        typeName: '操作类型',
        type: 'opType',
        prepareType: 'memberOpType',
        mode: 'SearchSelect'
      }, {
        typeName: '操作时间',
        type: 'opTime',
        mode: 'SearchTime'
      }],
      // 导出 excel 链接
      exportExcel: '/log/opLog/list',
      // 其余的数据
      otherData: {
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: {},
      schema: {},
      listData: undefined, // 列表数据
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
      } else {
        this.searchForm = data.searchData
        console.log(this.searchForm, 4444)
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
        path: '/member/oplog',
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
    }
  }
}
