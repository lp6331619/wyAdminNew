import { businessList } from '@/api/setMeal'
import { SearchList } from '@/components/SearchBox'
export default {
  components: {
    SearchList // 搜索
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        id: this.$route.query.id ? JSON.parse(this.$route.query.id) : {
          field: '',
          search: '',
          strict: ''
        },
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : {
          field: '',
          search: '',
          strict: ''
        },
        createDate: this.$route.query.createDate ? JSON.parse(this.$route.query.createDate) : {
          start: '',
          end: ''
        }
      },
      // 权限
      operatePrivBox: {
        search: 'business:combo:list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '搜索',
        type: 'id',
        mode: 'SearchInput'
      }, {
        typeName: '搜索',
        type: 'search',
        mode: 'SearchInput'
      }, {
        typeName: '创建时间',
        type: 'createDate',
        mode: 'SearchTime'
      }],
      // 其余的数据
      otherData: {
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        sort: this.$route.query.sort ? JSON.parse(this.$route.query.sort) : {},
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: {},
      schema: undefined,
      listData: {}, // 列表数据
      page: {} // 分页
    }
  },
  computed: {
    isDetail() {
      return this.$route.query.scene ? this.$route.query.scene : ''
    }
  },
  created() {
    // 是否是详情页
    if (!this.isDetail) {
      this.getRule('prepare')
      this.getRule('schema')
      this.getList()
    }
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      businessList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      businessList(parse).then(res => {
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
    },
    // 排序
    sortTable(data) {
      const sort = data.order === 'descending' ? 'desc' : 'asc'
      var name = ''
      data.prop === 'stat.createDateTime' ? name = 'createDate' : name = data.prop
      this.otherData.sort = {}
      this.otherData.sort[name] = sort
      this.toList()
    }
  }
}
