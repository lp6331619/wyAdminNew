import { articleDetail, articleUpdate } from '@/api/site'
import comDetail from '../../components/detail.vue'
export default {
  name: 'ArticleDetaila',
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
    if (this.id) {
      this.getData()
    }
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      articleUpdate({ type: 'help' }, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getData() {
      this.loading = true
      articleDetail({ id: this.id }).then(res => {
        if (res.result.isSuccess) {
          this.dataBox = res.data
          this.loading = false
        }
      })
    },
    outData(e) {
      articleUpdate(e).then(res => {
        if (res.result.isSuccess) {
          this.$message.success(res.result.message)
        }
      })
    }
  }
}
