import { getDetail } from '@/api/member'
import { account } from './component'
import { RemarkCard } from '@/components/'
export default {
  name: 'Detail',
  components: {
    account,
    RemarkCard
  },
  data() {
    return {
      activeName: this.$route.query.active ? this.$route.query.active : '0',
      detailBox: {}
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    // 切换tab
    tabsClick(e) {
      this.$router.push({ path: `/member/list/detail/${this.userId}`, query: { active: e.index } })
      this.activeName = e.index
    },
    // 获取详情
    getDetail() {
      getDetail({ id: this.userId }).then(res => {
        if (res.result.isSuccess) {
          this.detailBox = res.data
        }
      })
    },
    // 组件通知重新获取详情
    assemblyGetData(e) {
      e ? this.getDetail() : ''
    }
  }
}
