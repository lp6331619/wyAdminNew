import { getDetail, updateContact } from '@/api/member'
import { account, product, contact } from './component'
import { RemarkCard } from '@/components/'
export default {
  name: 'Detail',
  components: {
    account,
    product,
    contact,
    RemarkCard
  },
  data() {
    return {
      activeName: this.$route.query.active ? this.$route.query.active : '0',
      detailBox: {},
      remarkUrls: {
        addNote: '/user/member/addNote',
        delNote: '/user/member/delNote',
        noteList: '/user/member/noteList',
        delPrive: 'user:member:del_note',
        addPrive: 'user:member:add_note',
        listPrive: 'user:member:note_list'
      },
      contactsStatus: true,
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
    },
    // 返回的数据
    emitContacts(e, type, form) {
      this.disabled = e
      this.contacts[type] = form
    },
    // 更新联系人
    updateContact() {
      const moduleBox = this.filterFeild(
        this.detailBox.module.name,
        this.prepareContact.modules
      )
      updateContact({ contacts: this.contacts, id: this.userId, name: this.detailBox.name, module: moduleBox }).then(res => {
        if (res.result.isSuccess) {
          this.$message.success(res.result.message)
          this.contactsStatus = true
          this.getDetail()
        }
      })
    },
    // 获取联系人的 prepare
    prepareContactBox() {
      updateContact({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepareContact = res.data
        }
      })
    },
    // 过滤出名称对应的属性名 如（云服务器对应的 cloud）
    filterFeild(name, data) {
      let filterName
      for (var x in data) {
        if (data[x] === name) {
          filterName = x
        }
      }
      return filterName
    },
    // 同步业务信息
    synchronization(type) {
      this.detailBox.contacts[type] = this.contacts['business']
    }
  }
}
