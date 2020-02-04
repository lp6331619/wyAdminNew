import { orgProductRoleUpdate, orgProductRoleDetail } from '@/api/org'
export default {
  components: {
  },
  data() {
    return {
      loading: false, // 加载
      prepare: undefined,
      schema: undefined,
      listData: undefined, // 列表数据
      edit: false // 编辑状态
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
      orgProductRoleDetail({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      orgProductRoleDetail({}).then(res => {
        if (res.result.isSuccess) {
          this.listData = res.data
          this.loading = false
        }
      })
    },
    getKeys(item) {
      if (typeof item !== 'undefined') {
        return Object.keys(item)
      }
    },
    // 提交
    submit() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          this.loading = true
          orgProductRoleUpdate({ data: this.listData }).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.getList()
              this.edit = false
              this.loading = false
            }
          })
        }
      })
    }
  }
}
