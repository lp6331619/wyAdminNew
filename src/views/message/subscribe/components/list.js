import { messageSubscribeList, messageSubscribeDetele } from '@/api/message'
import { SearchList } from '@/components/SearchBox'
import edit from './dialog/edit.vue'
export default {
  components: {
    SearchList, // 搜索
    edit
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : ''
      },
      // 权限
      operatePrivBox: {
        search: 'site:article_cate:list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '搜索:Id/名称/标识',
        type: 'search',
        mode: 'Input'
      }],
      // 其余的数据
      otherData: {
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
    isDetail() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {
    // 是否是详情页
    if (!this.isDetail) {
      // this.getRule('prepare')
      this.getRule('schema')
      this.getList()
    }
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      messageSubscribeList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      messageSubscribeList(parse).then(res => {
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
    // 删除
    del(e) {
      this.$confirm(`确认删除' ${e.name} '吗?`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        messageSubscribeDetele({ id: e.id }).then(res => {
          if (res.result.isSuccess) {
            this.$message.success(res.result.message)
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
