import { passportUpdate, passportDetail } from '@/api/member'
export default {
  name: 'PassportDetail',
  components: {},
  data() {
    return {
      detailData: undefined,
      schema: undefined,
      prepare: undefined,
      loading: true,
      form: {
        code: '',
        status: ''
      },
      formRules: {
        status: [{ required: true, trigger: 'change', message: '不能为空!' }],
        code: [{ required: true, trigger: 'change', message: '不能为空!' }]
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
      passportUpdate({}, 'schema').then(res => {
        if (res.result.isSuccess && res.schema.hasPrepare) {
          this.schema = res.schema
          passportUpdate({}, 'prepare').then(res => {
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
      passportDetail({ id: this.userId }).then(
        res => {
          if (res.result.isSuccess) {
            this.detailData = res.data
            this.form = {
              status: this.detailData.status.key,
              code: this.detailData.code,
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
          passportUpdate(this.form).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.editStatus = false
              this.getData()
            }
          })
        }
      })
    },
    // 去审核
    toAuthentication() {
      this.$router.push(`/member/list/realInfo/${this.userId}`)
    }
  }
}
