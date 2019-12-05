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
        },
        stat: '',
        registerDate: {
          end: '',
          start: ''
        },
        balance: {
          end: '',
          start: ''
        }
      },
      // 权限
      operatePrivBox: {
        search: 'member.member.list:search',
        excel: 'member.member.list:export'
      },
      // 搜索的列表数据类型格式
      formType: [{
        typeName: '会员',
        type: 'member',
        mode: 'SearchInput'
      }, {
        typeName: '销售',
        type: 'saler',
        mode: 'SearchInput'
      }, {
        typeName: '产品',
        type: 'product',
        mode: 'SearchInput'
      }, {
        typeName: '名字',
        type: 'search',
        mode: 'SearchInput'
      }, {
        typeName: '统计状态',
        type: 'stat',
        mode: 'SearchSelect'
      }, {
        typeName: '注册时间',
        type: 'registerDate',
        mode: 'SearchTime'
      }, {
        typeName: '账户余额',
        type: 'balance',
        mode: 'SearchRank'
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
    },
    emitData(data) {
      console.log(data, '组件传出的数据')
    }
  }
}
