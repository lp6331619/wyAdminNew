import { orgDeptList, orgDeptDelete } from '@/api/org'
import { SearchList } from '@/components/SearchBox'
import create from '../dialog/create.vue'
export default {
  name: 'ChildList',
  components: {
    SearchList, // 搜索
    create
  },
  props: {
    type: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : ''
      },
      // 权限
      operatePrivBox: {
        search: 'org:dept:list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '名称',
        type: 'search',
        mode: 'Input'
      }],
      // 其余的数据
      otherData: {
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        activeName: this.$route.query.activeName ? JSON.parse(this.$route.query.activeName) : '0',
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: undefined,
      schema: undefined,
      listData: {}, // 列表数据
      page: {}, // 分页
      createStatus: false // 创建员工
    }
  },
  computed: {
    isDetail() {
      return this.$route.params.id
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
      orgDeptList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data.length ? res.data : {})
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      delete parse.activeName
      orgDeptList({ ...parse, parent: this.isDetail }).then(res => {
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
    // 删除事业部
    delMember(e) {
      this.$confirm(`确认删除id为${e}的事业部吗`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orgDeptDelete({ id: e }).then(res => {
          if (res.result.isSuccess) {
            this.$message.success(res.result.message)
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    // 创建事业部
    emitOutCreate(e, s) {
      this.createStatus = !e
      !s ? this.getList() : ''
    }
  }
}
