import { getDomainLimitList } from '@/api/netSec'
import { SearchList } from '@/components/SearchBox'

export default {
  components: {
    SearchList
  },
  data() {
    return {
      prepare: {},
      searchForm: {
        member: this.$route.query.member ? JSON.parse(this.$route.query.member) : {
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
        date: this.$route.query.date ? JSON.parse(this.$route.query.date) : {
          start: '',
          end: ''
        },
        ip: this.$route.query.ip ? JSON.parse(this.$route.query.ip) : ''
      },
      formType: [{
        typeName: '会员',
        type: 'member',
        mode: 'SearchInput'
      },
      {
        typeName: '销售',
        type: 'saler',
        mode: 'SearchInput'
      },
      {
        typeName: '产品',
        type: 'search',
        mode: 'SearchInput'
      },
      {
        typeName: '最后操作时间',
        type: 'date',
        mode: 'SearchTime'
      },
      {
        typeName: '关联IP',
        type: 'ip',
        mode: 'Input'
      }],
      // 导出 excel 链接
      exportExcel: '/api/netsec/domainLimit/list',
      // 权限
      operatePrivBox: {
        search: 'net_sec:domain_limit:list',
        excel: '_special:export_csv'
      },
      otherData: {
        status: this.$route.query.status ? JSON.parse(this.$route.query.status) : '',
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      schema: {},
      status: [],
      loading: false,
      listData: [],
      page: {},
      count: 0
    }
  },
  created() {
    this.getPrepareData()
    this.getList()
  },
  methods: {
    getPrepareData() {
      getDomainLimitList({}, 'prepare').then(res => {
        this.prepare = res.data
        this.status = this.common.FilterArray(this.prepare.status)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      getDomainLimitList(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res.data
          this.loading = false
          this.page = res.pagination
          this.count = res.pagination.totals
        }
      })
    },
    onGoSetting() {
      this.$router.push({
        path: '/netSec/domainLimitList/setting'
      })
    },
    onGoEdit(row) {
      this.$router.push({
        path: `/netSec/domainLimitList/edit/${row.id}`,
        query: {
          ips: row.ips,
          domainNums: row.domainNums,
          domainLimitNums: row.domainLimitNums,
          typeName: row.typeName,
          type: row.type,
          no: row.no,
          member: JSON.stringify(row.member),
          id: row.id
        }
      })
    },
    onFilterChange(filters) {
      if (filters) {
        var name = ''
        var value = ''
        for (const i in filters) {
          name = i
          value = filters[i][0]
        }
        this.$set(this.otherData, name, value)
        this.toList(name, value)
      }
    },
    getClass(key) {
      let className = ''
      if (key === 'DELETE' || key === 'EXPIRE') {
        className = 'proh'
      } else if (key === 'OPEN') {
        className = 'adopt'
      } else if (key === 'UN_OPEN') {
        className = 'remind'
      }
      return className
    },
    emitData(data) {
      if (data.clear) {
        this.$refs.multipleTable.clearFilter()
      } else {
        this.searchForm = data.searchData
        this.otherData = data.otherData
      }
      this.toList()
    },
    handleSizeChange(data) {
      this.toList('pageSize', data)
    },
    handleCurrentChange(data) {
      this.toList('page', data)
    },
    toList(filed, data) {
      filed && this.$set(this.otherData, filed, data)
      this.common.toList(this.searchForm, this.otherData, this.getList)
    }
  }
}
