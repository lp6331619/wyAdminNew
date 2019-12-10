import { getDetail } from '@/api/member'
import { account } from './component'
export default {
  name: 'Detail',
  components: {
    account
  },
  data() {
    return {
      activeName: 0,
      detailBox: {}
    }
  },
  computed: {
    userId() {
      return this.$route.query.id
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    // 切换tab
    tabsClick() {
      this.$router.push({ name: 'memberListDetail', query: { id: this.userId, active: this.activeName } })
    },
    getDetail() {
      getDetail({ id: this.userId }).then(res => {
        if (res.result.isSuccess) {
          this.detailBox = res.data
        }
      })
    }
  }
}
