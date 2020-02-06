import { orgDeptUpdate, orgDeptDetail } from '@/api/org'
export default {
  name: 'DeptDetail',
  components: {},
  data() {
    return {
      detailData: undefined,
      schema: undefined,
      prepare: undefined,
      loading: true,
      form: {
        name: '',
        displayOrder: '',
        parent: null
      },
      formRules: {
        name: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      editStatus: false
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {
    this.getRule()
    this.getData()
  },
  methods: {
    // 获取规则
    getRule() {
      orgDeptUpdate({}, 'schema').then(res => {
        if (res.result.isSuccess && res.schema.hasPrepare) {
          this.schema = res.schema
          orgDeptUpdate({}, 'prepare').then(res => {
            if (res.result.isSuccess) {
              this.prepare = res.data
            }
          })
        }
      })
    },
    // 获取数据
    getData() {
      this.loading = true
      orgDeptDetail({ id: this.userId }).then(
        res => {
          if (res.result.isSuccess) {
            this.detailData = res.data
            this.form = {
              parent: this.detailData.parent ? this.detailData.parent.id : null,
              name: this.detailData.name,
              displayOrder: this.detailData.displayOrder,
              id: this.detailData.id
            }
            this.loading = false
          }
        }
      )
    },
    // 更新
    Submission() {
      this.$refs.form.validate(valid => {
        if (valid) {
          orgDeptUpdate({ ...this.form, version: this.detailData.stat.version }).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.editStatus = false
              this.getData()
            }
          })
        }
      })
    }
  }
}
