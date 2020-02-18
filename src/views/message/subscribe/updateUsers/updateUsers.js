import { messageSubscribeDetail, messageSubscribeSetuser } from '@/api/message'
export default {
  name: 'UpdateRoles',

  data() {
    return {
      prepare: undefined,
      detailData: undefined,
      checkList: [],
      loading: false,
      checked: null // 当前选中的角色
    }
  },
  computed: {
    id() {
      return this.$route.params.id ? this.$route.params.id : ''
    }
  },
  created() {
    this.getRule()
    this.getDetail()
  },
  methods: {
    // 获取 prepare
    getRule() {
      messageSubscribeSetuser({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    // 获取详情
    getDetail() {
      messageSubscribeDetail({ id: this.id }).then(res => {
        if (res.result.isSuccess) {
          this.detailData = res.data
          if (this.detailData.groupUser) {
            this.detailData.groupUser.forEach(item => {
              if (item.user) {
                this.checkList.push(item.user.id)
              }
            })
          }
        }
      })
    },
    submit() {
      const params = { id: this.id, groupUsers: this.checkList }
      this.loading = true
      messageSubscribeSetuser(params).then(res => {
        if (res.result.isSuccess) {
          this.$message.success(res.result.message)
        }
        this.loading = false
      })
    }
  }
}
