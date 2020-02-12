import { articleCreate } from '@/api/site'
import comDetail from '../../components/detail.vue'
export default {
  name: 'ArticleCreate',
  components: { comDetail },
  data() {
    return {
      prepare: undefined,
      schema: undefined,
      dataBox: undefined,
      loading: false
    }
  },
  computed: {
    id() {
      return this.$route.query.id ? JSON.parse(this.$route.query.id) : null
    },
    edit() {
      return this.$route.query.edit ? JSON.parse(this.$route.query.edit) : false
    }
  },
  created() {
    this.getRule('prepare')
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {

      articleCreate({ type: 'help' }, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    outData(e) {
      articleCreate(e).then(res => {
        if (res.result.isSuccess) {
          this.$message.success(res.result.message)
          this.$router.push('/information/help')
        }
      })
    }
  }
}
