import { realInfoMemberDetail } from '@/api/member'
export default {
  components: {
  },
  data() {
    return {
      memberData: {}
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
          this.memberData = res.data
          console.log(this.memberData, 123)
        }
      })
    }
  }
}
