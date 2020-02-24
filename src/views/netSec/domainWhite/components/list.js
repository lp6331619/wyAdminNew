import { getDomainwhiteList } from '@/api/netSec'
import { SearchList } from '@/components/SearchBox'
import reviewed from '../list/dialog/reviewed'

export default {
  components: {
    SearchList,
    reviewed
  },
  data() {
    return {
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
        opUser: this.$route.query.opUser ? JSON.parse(this.$route.query.opUser) : '',
        domain: this.$route.query.domain ? JSON.parse(this.$route.query.domain) : '',
        ip: this.$route.query.ip ? JSON.parse(this.$route.query.ip) : '',
        no: this.$route.query.no ? JSON.parse(this.$route.query.no) : '',
        opDate: this.$route.query.opDate ? JSON.parse(this.$route.query.opDate) : {
          start: '',
          end: ''
        }
      },
      otherData: {
        type: this.$route.query.type ? JSON.parse(this.$route.query.type) : '',
        status: this.$route.query.status ? JSON.parse(this.$route.query.status) : '',
        prodStatus: this.$route.query.prodStatus ? JSON.parse(this.$route.query.prodStatus) : '',
        auditStatus: this.$route.query.auditStatus ? JSON.parse(this.$route.query.auditStatus) : '',
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
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
        typeName: '操作人',
        type: 'opUser',
        mode: 'Input'
      },
      {
        typeName: '操作时间',
        type: 'opDate',
        mode: 'SearchTime'
      },
      {
        typeName: '域名',
        type: 'domain',
        mode: 'Input'
      },
      {
        typeName: 'IP',
        type: 'ip',
        mode: 'Input'
      },
      {
        typeName: '产品编号',
        type: 'no',
        mode: 'Input'
      }],
      // 导出 excel 链接
      exportExcel: '/api/netsec/domainwhitelist/list',
      // 权限
      operatePrivBox: {
        search: 'net_sec:domain_white_list:list',
        excel: '_special:export_csv'
      },
      loading: false, // 加载
      prepare: {},
      schema: {},
      listData: [], // 列表数据
      count: [],
      type: [],
      status: [],
      prodStatus: [],
      auditStatus: [],
      page: {}, // 分页
      selectTable: [], // 选中的 table
      allCheck: false, // 全选
      indeterminate: false // 是否有选中
    }
  },
  created() {
    this.getRule('prepare')
    this.getRule('schema')
    this.getListData()
  },
  methods: {
    getRule(type) {
      getDomainwhiteList({}, type).then(res => {
        type === 'prepare' ? (this.prepare = res.data) : (this.schema = res.schema)
        this.type = this.FilterArray(this.prepare.type)
        this.status = this.FilterArray(this.prepare.status)
        this.prodStatus = this.FilterArray(this.prepare.prodStatus)
        this.auditStatus = this.FilterArray(this.prepare.auditStatus)
      })
    },
    getListData() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      getDomainwhiteList(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res.data
          this.loading = false
          this.page = res.pagination
          this.count = res.count
        }
      })
    },
    onAuditStatus(key) {
      this.otherData.auditStatus = key
      this.toList()
    },
    onSelectChange(data) {
      this.selectTable = data
      this.indeterminate = data.length > 0 && data.length < this.page.pageSize
      this.allCheck = data.length > 0
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
        this.toList()
      }
    },
    onSelection(row) {
      if (row.auditStatus.key !== 'INVALID' && row.auditStatus.key !== 'FOUL' && row.auditStatus.key !== 'NO_ICP') {
        return true
      }
      return false
    },
    onCheckAll(data) {
      if (data) {
        this.listData.forEach(row => {
          this.onSelection(row) && this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSizeChange(data) {
      this.$set(this.otherData, 'pageSize', data)
      this.toList()
    },
    handleCurrentChange(data) {
      this.$set(this.otherData, 'page', data)
      this.toList()
    },
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
      this.getListData()
    },
    // 获取数据类型
    getType(data) {
      return data ? typeof data : false
    },
    // 转换数组
    FilterArray(data) {
      if (data) {
        const box = []
        for (const i in data) {
          box.push({
            text: data[i],
            value: i
          })
        }
        return box
      }
    },
    onGoEdit(id) {
      this.$router.push({
        path: `/netSec/domainWhiteList/edit${id ? `/${id}` : ''}`
      })
    },
    onGoDetail(id) {
      this.$router.push({
        path: `/netSec/domainWhiteList/detail${id ? `/${id}` : ''}`
      })
    }
  }
}
