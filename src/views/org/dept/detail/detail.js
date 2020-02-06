import childList from '../list/components/list.vue'
import areaDeptList from '../../areaDept/list/components/list.vue'
import roleList from '../../role/list/components/list.vue'
import detail from './component/detail.vue'
export default {
  name: 'Detail',
  components: {
    childList,
    detail,
    areaDeptList,
    roleList
  },
  data() {
    return {
      activeName: this.$route.query.activeName ? this.$route.query.activeName : '0'
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {

  },
  methods: {
    // 切换 tab
    handleClick(e) {
      this.$router.push({
        path: this.$route.path,
        query: { activeName: this.activeName, parent: this.userId }
      })
    }
  }
}
