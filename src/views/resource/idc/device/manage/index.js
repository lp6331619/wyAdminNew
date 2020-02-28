import { resourceIdcDeviceList, resourceIdcDeviceDelete } from '@/api/resource'
import { SearchList } from '@/components/SearchBox'
import update from './dialog/update.vue'
export default {
  name: 'List',
  components: {
    SearchList, // 搜索
    update
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : {
          field: '',
          search: '',
          strict: '0'
        },
        room: this.$route.query.room ? JSON.parse(this.$route.query.room) : '',
        type: this.$route.query.type ? JSON.parse(this.$route.query.type) : '',
        spec: this.$route.query.spec ? JSON.parse(this.$route.query.spec) : '',
        oem: this.$route.query.oem ? JSON.parse(this.$route.query.oem) : '',
        isEnable: this.$route.query.isEnable ? JSON.parse(this.$route.query.isEnable) : ''
      },
      // 权限
      operatePrivBox: {
        search: 'resource:idc:device:list',
        excel: '_special:export_csv'
      },
      // 导出 excel 链接
      // exportExcel: '/user/member/list',
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '其他',
        type: 'search',
        mode: 'SearchInput'
      }, {
        typeName: '机房',
        type: 'room',
        mode: 'SearchSelect'
      }, {
        typeName: '设备类型',
        type: 'type',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '设备规格',
        type: 'spec',
        relation: 'type',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '设备品牌',
        type: 'oem',
        mode: 'SearchSelect'
      }, {
        typeName: '启用',
        type: 'isEnable',
        mode: 'SearchSelect'
      }],
      // 其余的数据
      otherData: {
        sort: this.$route.query.sort ? JSON.parse(this.$route.query.sort) : {},
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: {},
      schema: undefined,
      listData: {}, // 列表数据
      page: {}, // 分页
      operationId: null, // 操作 ID
      setEditDetail: false, // 修改详情
      scene: '' // 场景
    }
  },
  computed: {

  },
  created() {
    this.getRule('prepare')
    this.getList()
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      resourceIdcDeviceList({}, type).then(res => {
        this.prepare = res.data
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      resourceIdcDeviceList(parse, '_withSchema').then(res => {
        if (res.result.isSuccess) {
          this.listData = res
          this.schema = res.schema
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
    setDialog(e) {
      this.operationId = e
      this.setEditDetail = true
      this.scene = 'edit'
    },
    // 排序
    sortTable(data) {
      const sort = data.order === 'descending' ? 'desc' : 'asc'
      const name = data.prop === 'stat.updateDateTime' ? 'updateDate' : data.prop
      this.otherData.sort = {}
      this.otherData.sort[name] = sort
      this.toList()
    },
    // 修改详情返回
    emitOutDetail(e, s) {
      this.setEditDetail = !e
      !s ? this.getList() : ''
    },
    // 删除
    del(e) {
      this.$prompt(`确认删除设备 ${e.name}`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '备注'
      }).then(({ value }) => {
        resourceIdcDeviceDelete({ id: e.id, note: e.value }).then(res => {
          if (res.result.isSuccess) {
            this.$message.success(res.result.message)
            this.getList()
          }
        })
      }).catch(() => {
      })
    }
  }
}
