import { realInfoList, realInfoCount } from '@/api/member'
import { SearchList } from '@/components/SearchBox'

export default {
  components: {
    SearchList // 搜索
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        member: this.$route.query.member ? JSON.parse(this.$route.query.member) : {
          field: '',
          search: '',
          strict: '0'
        },
        realInfo: this.$route.query.realInfo ? JSON.parse(this.$route.query.realInfo) : {
          field: '',
          search: '',
          strict: '0'
        },
        createDate: this.$route.query.createDate ? JSON.parse(this.$route.query.createDate) : {
          start: '',
          end: ''
        }
      },
      // 权限
      operatePrivBox: {
        search: 'user:member:realinfo_list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '会员',
        type: 'member',
        mode: 'SearchInput'
      }, {
        typeName: '实名',
        type: 'realInfo',
        mode: 'SearchInput'
      }, {
        typeName: '提交时间',
        type: 'createDate',
        mode: 'SearchTime'
      }],
      // 导出 excel 链接
      exportExcel: '/user/member/realInfoList',
      // 其余的数据
      otherData: {
        sort: this.$route.query.sort ? JSON.parse(this.$route.query.sort) : {},
        status: this.$route.query.status ? JSON.parse(this.$route.query.status) : {},
        type: this.$route.query.type ? JSON.parse(this.$route.query.type) : {},
        certificateType: this.$route.query.certificateType ? JSON.parse(this.$route.query.certificateType) : {},
        expireTimeCount: this.$route.query.expireTimeCount ? JSON.parse(this.$route.query.expireTimeCount) : null,
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: {},
      schema: {},
      listData: {}, // 列表数据
      count: [], // 统计数据
      status: [], // 实名状态 筛选数据
      certificateType: [], // 证件类型 筛选数据
      type: [], // 认证类型 筛选数据
      page: {} // 分页
    }
  },
  computed: {
    isDetail() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
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
      realInfoList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
        this.status = this.FilterArray(this.prepare.status)
        this.certificateType = this.FilterArray(this.prepare.certificateType[''])
        this.type = this.FilterArray(this.prepare.type)
      })
    },
    // 转换数组
    FilterArray(data) {
      if (data) {
        const box = []
        for (const i in data) {
          box.push({ text: data[i], value: i })
        }
        return box
      }
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      realInfoList(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res
          this.loading = false
          this.page = res.pagination
          this.getCount()
        }
      })
    },
    // 获取 conut
    getCount() {
      realInfoCount().then(res => {
        if (res.result.isSuccess) {
          const array = res.data.concat([{ key: 'expireTimeCount', name: '认证已到期', value: this.listData.count.expireTimeCount }])
          this.count = []
          array.map(item => {
            item.key !== 'INVALID' ? this.count.push(item) : ''
          })
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
    // 根据状态颜色选取不同的类名
    statusClass(status, type) {
      if (type === 'status') {
        if (status === 'OK') {
          return 'adopt'
        } else if (status === 'REJECT') {
          return 'proh'
        } else if (status === 'INVALID') {
          return 'gray'
        } else {
          return 'remind'
        }
      }
    },
    // 排序
    sortTable(data) {
      const sort = data.order === 'descending' ? 'desc' : 'asc'
      const name = data.prop
      this.otherData.sort = {}
      this.otherData.sort[name] = sort
      this.toList()
    },
    // 条件筛选
    filterTag(filters) {
      if (filters) {
        var name = ''
        var value = ''
        for (const i in filters) {
          name = i
          value = filters[i][0]
        }
        this.$set(this.otherData, name, value)
        this.toList()
      }
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
    // 状态筛选
    statStatus(key) {
      if (key === 'expireTimeCount') {
        this.otherData.expireTimeCount = 1
      } else {
        this.otherData.status = key
      }
      this.toList()
    }
  }
}
