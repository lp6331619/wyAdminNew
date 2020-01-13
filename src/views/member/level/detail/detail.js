import { discountDetail } from '@/api/member'
export default {
  name: 'PassportDetail',
  components: {},
  data() {
    return {
      detailData: {},
      schema: {},
      prepare: {},
      loading: true,
      form: {
        code: '',
        status: ''
      },
      formRules: {
        status: [{ required: true, trigger: 'change', message: '不能为空!' }],
        code: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      listLoading: false
    }
  },
  computed: {

  },
  created() {
    this.getRule()
    this.getData()
  },
  methods: {
    getRule() {
      discountDetail({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.prepare
        }
      })
    },
    getData() {
      this.listLoading = true
      discountDetail({}).then(
        res => {
          if (res.result.isSuccess) {
            this.detailData = res.data
            this.listLoading = false
          }
        }
      )
    },
    // 更新
    Submission() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // const data = {
          //   ...this.form,
          //   id: this.detailData.id
          // }
        }
      })
    },
    // 去审核
    toAuthentication() {
      this.$router.push(`/member/list/realInfo/${this.userId}`)
    }
  }
}
