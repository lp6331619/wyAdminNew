import { resourceCloudImageList } from '@/api/resource'
import { SearchList } from '@/components/SearchBox'
import update from './dialog/update.vue'
export default {
  name: 'NodeList',
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
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : '',
        isEnable: this.$route.query.isEnable ? JSON.parse(this.$route.query.isEnable) : '',
        node: this.$route.query.node ? JSON.parse(this.$route.query.node) : '',
        osVersion: this.$route.query.osVersion ? JSON.parse(this.$route.query.osVersion) : ''
      },
      // 权限
      operatePrivBox: {
        search: 'resource:cloud:node:image:list',
        excel: '_special:export_csv'
      },
      // 导出 excel 链接
      // exportExcel: '/user/member/list',
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '名称关键字',
        type: 'search',
        mode: 'Input'
      }, {
        typeName: '节点',
        type: 'node',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '操作系统',
        type: 'osVersion',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '是否启用',
        type: 'isEnable',
        prepareType: 'status',
        selectType: true,
        mode: 'SearchSelect'
      }],
      // 其余的数据
      otherData: {
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: undefined,
      schema: undefined,
      listData: {}, // 列表数据
      page: {}, // 分页
      operationId: null, // 操作 ID
      setEditDetail: false, // 修改详情
      scene: '' // 场景
    }
  },
  computed: {
    getDType() {
      return this.$route.query.detail ? this.$route.query.detail : 'image'
    }
  },
  created() {
    this.getRule('prepare')
    this.getRule('schema')
    this.getList()
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      resourceCloudImageList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      resourceCloudImageList(parse).then(res => {
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
      query.detail = this.getDType
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
    // 修改详情返回
    emitOutDetail(e, s) {
      this.setEditDetail = !e
      !s ? this.getList() : ''
    }
  }
}
