import { getDetail } from '@/api/member'
import { account, product, contactBox, realname, enterlog, memberOpLog } from './component'
import { RemarkCard } from '@/components/'
export default {
  name: 'Detail',
  components: {
    account,
    product,
    contactBox,
    RemarkCard,
    realname,
    enterlog,
    memberOpLog
  },
  data() {
    return {
      activeName: this.$route.query.active ? this.$route.query.active : '0',
      detailBox: {}, // 产品详情
      // 备注信息相关
      remarkUrls: {
        addNote: '/user/member/addNote',
        delNote: '/user/member/delNote',
        noteList: '/user/member/noteList',
        delPrive: 'user:member:del_note',
        addPrive: 'user:member:add_note',
        listPrive: 'user:member:note_list'
      },
      contactsStatus: true, // 联系信息是否可编辑状态
      disabled: true,
      contacts: {}, // 联系人信息
      prepareContact: {} // 联系人 prepare
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
