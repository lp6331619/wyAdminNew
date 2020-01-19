import { orgUserList, orgUserDelete } from '@/api/org'
import { SearchList } from '@/components/SearchBox'
import setPassWord from './dialog/setPassWord.vue'
import setStatus from './dialog/setStatus.vue'
import edit from './dialog/edit.vue'
import create from './dialog/create.vue'
export default {
  components: {
    SearchList, // 搜索
    setPassWord,
    setStatus,
    edit,
    create
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        search: this.$route.query.search ? JSON.parse(this.$route.query.search) : '',
        area: this.$route.query.area ? JSON.parse(this.$route.query.area) : '',
        dept: this.$route.query.dept ? JSON.parse(this.$route.query.dept) : '',
        areaDept: this.$route.query.areaDept ? JSON.parse(this.$route.query.areaDept) : '',
        roles: this.$route.query.roles ? JSON.parse(this.$route.query.roles) : '',
        status: this.$route.query.status ? JSON.parse(this.$route.query.status) : ''
      },
      // 权限
      operatePrivBox: {
        search: 'user:member:list',
        excel: '_special:export_csv'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '名称',
        type: 'search',
        mode: 'Input'
      }, {
        typeName: '分公司',
        type: 'area',
        prepareType: 'areas',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '事业部',
        type: 'dept',
        prepareType: 'depts',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '部门',
        type: 'areaDept',
        prepareType: 'areaDepts',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '角色',
        type: 'roles',
        selectType: true,
        mode: 'SearchSelect'
      }, {
        typeName: '状态',
        type: 'status',
        mode: 'SearchSelect'
      }],
      // 导出 excel 链接
      exportExcel: '/user/member/list',
      // 其余的数据
      otherData: {
        pageSize: this.$route.query.pageSize ? JSON.parse(this.$route.query.pageSize) : 10,
        page: this.$route.query.page ? JSON.parse(this.$route.query.page) : 1
      },
      loading: false, // 加载
      prepare: {},
      schema: {},
      listData: {}, // 列表数据
      page: {}, // 分页
      setPassWordStatus: false, // 修改密码状态
      operationId: null, // 操作 ID
      setStatusStatus: false, // 修改状态
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
    if (!this.isDetail) {
      this.getRule('prepare')
      this.getRule('schema')
      this.getList()
    }
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      orgUserList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      orgUserList(parse).then(res => {
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
        path: '/org/user',
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
      this.$confirm(`确认删除id为${e}的员工吗`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orgUserDelete({ id: e }).then(res => {
          if (res.result.isSuccess) {
            this.$message.success(res.result.message)
          }
        })
      }).catch(() => {
      })
    },
    setDialog(e, n) {
      this.operationId = e
      switch (n) {
        // 修改密码
        case 'status':
          this.setStatusStatus = true
          break
        case 'password':
          this.setPassWordStatus = true
          break
        case 'edit':
          this.setEditDetail = true
          break
      }
    },
    // 更改密码返回
    emitOut(e, s) {
      this.setPassWordStatus = !e
      !s ? this.getList() : ''
    },
    // 更改状态返回
    emitOutStatus(e, s) {
      this.setStatusStatus = !e
      !s ? this.getList() : ''
    },
    // 修改详情返回
    emitOutDetail(e, s) {
      this.setEditDetail = !e
      !s ? this.getList() : ''
    },
    emitOutCreate(e, s) {
      this.createStatus = !e
      !s ? this.getList() : ''
    }
  }
}
