import { orgRoleList, orgRoleDelete } from '@/api/org'
import { SearchList } from '@/components/SearchBox'
import edit from '../dialog/edit.vue'
import create from '../dialog/create.vue'
export default {
  components: {
    SearchList, // 搜索
    edit,
    create
  },
  props: {
    type: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : '',
        roleLevel: this.$route.query.roleLevel ? JSON.parse(this.$route.query.roleLevel) : '',
        dept: this.$route.query.dept ? JSON.parse(this.$route.query.dept) : this.$route.params.id || null
      },
      // 权限
      operatePrivBox: {
        search: 'org:role:list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '名称',
        type: 'search',
        mode: 'Input'
      },
      {
        typeName: '事业部',
        type: 'dept',
        mode: 'SearchSelect',
        disabled: this.type === 'detail'
      }, {
        typeName: '等级',
        type: 'roleLevel',
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
      createStatus: false // 创建员工
    }
  },
  computed: {
    isDetail() {
      return this.$route.params.id
    }
  },
  created() {
    // 是否是详情页
    this.getRule('prepare')
    this.getRule('schema')
    this.getList()
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      orgRoleList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      orgRoleList(parse).then(res => {
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
        this.type === 'detail' ? this.searchForm.dept = this.$route.params.id : ''
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
      if (this.type === 'detail') {
        query['activeName'] = '1'
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
    // 删除员工
    delMember(e) {
      this.$confirm(`确认删除id为${e}的角色吗`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orgRoleDelete({ id: e }).then(res => {
          if (res.result.isSuccess) {
            this.$message.success(res.result.message)
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    setDialog(e, n) {
      this.operationId = e
      switch (n) {
        case 'edit':
          this.setEditDetail = true
          break
      }
    },
    // 修改详情返回
    emitOutDetail(e, s) {
      this.setEditDetail = !e
      !s ? this.getList() : ''
    },
    // 创建员工
    emitOutCreate(e, s) {
      this.createStatus = !e
      !s ? this.getList() : ''
    }
  }
}
