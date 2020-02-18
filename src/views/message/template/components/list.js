import { messageTemplate } from '@/api/message'
import { SearchList } from '@/components/SearchBox'
export default {
  name: 'ChildList',
  components: {
    SearchList // 搜索
  },
  props: {
    type: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      schema: undefined,
      loading: false, // 加载
      listData: {} // 列表数据
    }
  },
  computed: {
    isDetail() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {
    this.getRule('schema')
    this.getList()
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      messageTemplate({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    },
    getList() {
      this.loading = true
      const parse = Object.assign({}, this.searchForm, this.otherData)
      messageTemplate(parse).then(res => {
        if (res.result.isSuccess) {
          this.listData = res
          this.loading = false
          this.page = res.pagination
        }
      })
    }

  }
}
