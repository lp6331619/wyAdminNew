import { realInfoMemberDetail } from '@/api/member'
export default {
  components: {
  },
  data() {
    return {
      dataInfo: {},
      detailData: {}
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
    getDetail() {
      realInfoMemberDetail({ memberId: this.userId }).then(res => {
        if (res.result.isSuccess) {
          this.dataInfo = res.data
          this.detailData = res.data.realInfo
          console.log(this.dataInfo, 123)
        }
      })
    }
  }
}
