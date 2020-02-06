import { opMemberLoginLogList } from '@/api/log'
import { SearchList } from '@/components/SearchBox'
export default {
  components: {
    SearchList // 搜索
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : '',
        time: this.$route.query.time ? JSON.parse(this.$route.query.time) : {
          start: '',
          end: ''
        },
      },
      // 权限
      operatePrivBox: {
        search: 'user:member:list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '名称',
        type: 'search',
        mode: 'Input'
      }, {
        typeName: '登录时间',
        type: 'time',
        mode: 'SearchTime'
      }],
      // 其余的数据
      otherData: {
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: {},
      schema: undefined,
      listData: {
        data: undefined
      }, // 列表数据
      page: {} // 分页
    }
  },
  computed: {
    isDetail() {
      return !!this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {
    // 是否是详情页
    if (!this.isDetail) {
      this.getRule('schema')
      this.getList()
    }
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      opMemberLoginLogList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const time = {
        loginStartTime: this.searchForm.time.start,
        LoginEndTime: this.searchForm.time.end
      }
      const parse = Object.assign({}, this.searchForm, this.otherData, time)
      opMemberLoginLogList(parse).then(res => {
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
    }
  }
}
