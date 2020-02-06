import { getMemberList, getMemberCount, toMember } from '@/api/member'
import { SearchList } from '@/components/SearchBox'
import createMember from './dialog/create.vue'
import relation from './dialog/relation.vue'
import modifyLevel from './dialog/modifyLevel.vue'
import modifySaler from './dialog/modifySaler.vue'

export default {
  components: {
    SearchList, // 搜索
    createMember, // 创建会员
    relation, // 用户关联申请
    modifyLevel, // 修改会员等级
    modifySaler // 修改所属销售
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
        product: this.$route.query.product ? JSON.parse(this.$route.query.product) : {
          field: '',
          search: '',
          strict: '0'
        },
        saler: this.$route.query.saler ? JSON.parse(this.$route.query.saler) : {
          field: '',
          search: '',
          strict: '0'
        },
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : {
          field: '',
          search: '',
          strict: '0'
        },
        stat: this.$route.query.stat ? JSON.parse(this.$route.query.stat) : '',
        registerDate: this.$route.query.registerDate ? JSON.parse(this.$route.query.registerDate) : {
          start: '',
          end: ''
        },
        balance: this.$route.query.balance ? JSON.parse(this.$route.query.balance) : {
          start: '',
          end: ''
        }
      },
      // 权限
      operatePrivBox: {
        search: 'user:member:list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '会员',
        type: 'member',
        mode: 'SearchInput'
      }, {
        typeName: '销售',
        type: 'saler',
        mode: 'SearchInput'
      }, {
        typeName: '产品',
        type: 'product',
        mode: 'SearchInput'
      }, {
        typeName: '名字',
        type: 'search',
        mode: 'SearchInput'
      }, {
        typeName: '统计状态',
        type: 'stat',
        mode: 'SearchSelect'
      }, {
        typeName: '注册时间',
        type: 'registerDate',
        mode: 'SearchTime'
      }, {
        typeName: '账户余额',
        type: 'balance',
        mode: 'SearchRank'
      }],
      // 导出 excel 链接
      exportExcel: '/user/member/list',
      // 其余的数据
      otherData: {
        sort: this.$route.query.sort ? JSON.parse(this.$route.query.sort) : {},
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1,
        status: this.$route.query.status ? JSON.parse(this.$route.query.status) : '',
        realInfoStatus: this.$route.query.realInfoStatus ? JSON.parse(this.$route.query.realInfoStatus) : '',
        level: this.$route.query.level ? JSON.parse(this.$route.query.level) : ''
      },
      loading: false, // 加载
      prepare: {},
      schema: {},
      listData: {}, // 列表数据
      count: [], // 统计数据
      levle: [], // 会员等级筛选数据
      status: [], // 账号状态 筛选数据
      realInfoStatus: [], // 实名状态 筛选数据
      page: {}, // 分页
      selectTable: [], // 选中的 table
      allCheck: false, // 全选
      indeterminate: false // 是否有选中
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
      this.getCount()
    }
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      getMemberList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
        if (this.prepare.level) {
          this.levle = []
          this.prepare.level.forEach(item => {
            this.levle.push({ text: item.name, value: item.id })
          })
        }
        this.status = this.FilterArray(this.prepare.status)
        this.realInfoStatus = this.FilterArray(this.prepare.realInfoStatus)
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
      getMemberList(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res
          this.loading = false
          this.page = res.pagination
        }
      })
    },
    // 获取 conut
    getCount() {
      getMemberCount().then(res => {
        res.result.isSuccess ? this.count = res.data : ''
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
    // 登录会员
    toMember(id) {
      toMember({ id: id }).then(res => {
        if (res.result.isSuccess) {
          window.open(res.data.url, '_blank')
        }
      })
    },
    // 根据状态颜色选取不同的类名
    statusClass(status, type) {
      if (type === 'realInfoStatus') {
        if (status === 'AUDIT') {
          return 'remind'
        } else if (status === 'OK') {
          return 'adopt'
        } else {
          return 'proh'
        }
      } else if (type === 'status') {
        if (status === 'OK') {
          return 'adopt'
        } else if (status === 'LOCK') {
          return 'proh'
        }
      }
    },
    // 多选
    handleSelectionChange(data) {
      this.selectTable = data
      this.indeterminate = data.length > 0 && data.length < this.page.pageSize
      this.allCheck = data.length > 0
    },
    // 全选
    checkAll(data) {
      if (data) {
        this.listData.data.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
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
      this.otherData.stat = key
      this.toList()
    }
  }
}
