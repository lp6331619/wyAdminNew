import { opMemberLoginLogDetail } from '@/api/log'
export default {
  name: 'Detail',
  components: {

  },
  data() {
    return {
      activeName: this.$route.query.active ? this.$route.query.active : '0',
      detailData: undefined, // 产品详情
      schema: {
        output: undefined
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    // 获取详情
    getDetail() {
      opMemberLoginLogDetail({}, 'schema').then(res => {
        if (res.result.isSuccess) {
          this.schema = res.schema
        }
      })
      opMemberLoginLogDetail({ id: this.userId }).then(res => {
        if (res.result.isSuccess) {
          this.detailData = res.data
        }
      })
    }
  }
}
