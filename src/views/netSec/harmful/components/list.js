import { getHarmfulList } from '@/api/netSec'
import { SearchList } from '@/components/SearchBox'
import batchProcessing from '../list/dialog/batchProcessing'

export default {
  components: {
    SearchList,
    batchProcessing
  },
  data() {
    return {
      prepare: {},
      schema: {},
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
        findTime: this.$route.query.findTime ? JSON.parse(this.$route.query.findTime) : {
          start: '',
          end: ''
        }
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
        typeName: '发现时间',
        type: 'findTime',
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
      }],
      otherData: {
        room: this.$route.query.room ? JSON.parse(this.$route.query.room) : '',
        origin: this.$route.query.origin ? JSON.parse(this.$route.query.origin) : '',
        progress: this.$route.query.progress ? JSON.parse(this.$route.query.progress) : '',
        way: this.$route.query.way ? JSON.parse(this.$route.query.way) : '',
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      // 导出 excel 链接
      exportExcel: '/api/netsec/harmfullist/list',
      // 权限
      operatePrivBox: {
        search: 'net_sec:harmful_list:list',
        excel: '_special:export_csv'
      },
      count: [],
      loading: false, // 加载
      listData: [], // 列表数据
      page: {}, // 分页
      selectTable: [], // 选中的 table
      allCheck: false, // 全选
      indeterminate: false, // 是否有选中
      room: [],
      origin: [],
      progress: [],
      way: []
    }
  },
  created() {
    this.getPrepare()
    this.getList()
  },
  methods: {
    getPrepare() {
      getHarmfulList({}, 'prepare').then(res => {
        const origin = []
        res.data.origin.map(item => {
          origin.push({
            text: item.title,
            value: item.id
          })
        })
        this.prepare = res.data
        this.room = this.common.FilterArray(res.data.room)
        this.origin = origin
        this.progress = this.common.FilterArray(res.data.progress)
        this.way = this.common.FilterArray(res.data.way)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      getHarmfulList(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res.data
          this.loading = false
          this.page = res.pagination
          this.count = []
          res.count.map(item => {
            if (item.key !== 'TOTAL') {
              this.count.push(item)
            }
          })
        }
      })
    },
    onProgress(key) {
      this.otherData.progress = key
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
        this.toList(name, value)
      }
    },
    onSelection(row) {
      if (row.progress.key !== 'ADVICED' && row.progress.key !== 'TO_ADVICE') {
        return true
      }
      return false
    },
    onGoEdit(id) {},
    onGoDetail(id) {},
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
      this.toList('pageSize', data)
    },
    handleCurrentChange(data) {
      this.toList('page', data)
    },
    emitData(data) {
      if (data.clear) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.clearFilter()
      } else {
        this.searchForm = data.searchData
        this.otherData = data.otherData
      }
      this.toList()
    },
    toList(filed, data) {
      filed && this.$set(this.otherData, filed, data)
      this.common.toList(this.searchForm, this.otherData, this.getList)
    }
  }
}
