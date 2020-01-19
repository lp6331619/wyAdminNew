import { orgUserDetail, orgUserAdminLogin, orgUserSetSeccode } from '@/api/org'
export default {
  name: 'Detail',
  components: {

  },
  data() {
    return {
      activeName: this.$route.query.active ? this.$route.query.active : '0',
      detailData: {} // 产品详情
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
    // 获取详情
    getDetail() {
      orgUserDetail({ id: this.userId }).then(res => {
        if (res.result.isSuccess) {
          this.detailData = res.data
        }
      })
    },
    // 去登录
    toLogin() {
      orgUserAdminLogin({ id: this.userId }).then(res => {
        res.result.isSuccess ? window.open(res.data.url) : ''
      })
    },
    // 设置二维码
    setCode() {
      orgUserSetSeccode({ id: this.userId }).then(res => {
        if (res.result.isSuccess) {
          this.$alert(`<div class='text-center'><img width='250px' height='250px' src='${res.data.secQRCode}'</img><p >${res.data.secCode}</p> </div>`, '二次密码', {
            dangerouslyUseHTMLString: true
          })
        }
      })
    }
  }
}
