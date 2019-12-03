import { getMemberList } from '@/api/member'
import { SearchList } from '@/components'
export default {
  components: {
    SearchList
  },
  data() {
    return {
      // 搜索的列表数据
      searchForm: {
        member: {
          field: '',
          search: '',
          strict: '0'
        },
        product: {
          field: '',
          search: '',
          strict: '0'
        },
        saler: {
          field: '',
          search: '',
          strict: '0'
        },
        search: {
          field: '',
          search: '',
          strict: '0'
        }
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '会员',
        type: 'member'
      }, {
        typeName: '销售',
        type: 'saler'
      }, {
        typeName: '产品',
        type: 'product'
      }, {
        typeName: '名字',
        type: 'search'
      }],
      prepare: {},
      schema: {}
    }
  },
  created() {
    this.getRule('prepare')
    this.getRule('schema')
  },
  methods: {
    getRule(type) {
      getMemberList({}, type).then(res => {
        type === 'prepare'
          ? (this.prepare = res.data)
          : (this.schema = res.schema)
      })
    }
  }
}
