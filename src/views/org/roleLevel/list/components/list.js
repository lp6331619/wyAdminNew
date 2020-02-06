import { orgRoleLevelList, orgRoleLevelDelete } from '@/api/org'
import { SearchList } from '@/components/SearchBox'
import create from '../dialog/create.vue'
import update from '../dialog/update.vue'
export default {
  name: 'ChildList',
  components: {
    SearchList, // 搜索
    create,
    update
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
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : '',
        scope: this.$route.query.scope ? JSON.parse(this.$route.query.scope) : '',
        type: this.$route.query.type ? JSON.parse(this.$route.query.type) : null
      },
      // 权限
      operatePrivBox: {
        search: 'org:roleLevel:list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '名称',
        type: 'search',
        mode: 'Input'
      }, {
        typeName: '类型',
        type: 'type',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '权限',
        type: 'scope',
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
      operationId: null, // 操作 id
      createStatus: false, // 创建员工
      updateStatus: false // 更新
    }
  },
  computed: {
    isDetail() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
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
      orgRoleLevelList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      orgRoleLevelList(parse).then(res => {
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
    delMember(e) {
      this.$confirm(`确认删除id为${e}的角色等级吗`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orgRoleLevelDelete({ id: e }).then(res => {
          if (res.result.isSuccess) {
            this.$message.success(res.result.message)
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    setDialog(e) {
      this.operationId = e
      this.updateStatus = true
    },
    // 创建
    emitOutCreate(e, s) {
      this.createStatus = !e
      !s ? this.getList() : ''
    },
    // 修改
    emitOutUpdate(e, s) {
      this.updateStatus = !e
      !s ? this.getList() : ''
    }
  }
}
