import { realInfoDetail, realInfoLogList, realInfoAudit } from '@/api/member'
export default {
  name: 'RealName',
  components: {},
  data() {
    return {
      detailData: {},
      list: [],
      prepare: {},
      loading: true,
      form: {
        note: '',
        status: '',
        expireTime: ''
      },
      formRules: {
        expireTime: [{ required: true, message: '不能为空!' }],
        note: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      listLoading: false,
      photoUrl: '/user/member/getRealInfoPicture'
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      realInfoDetail({ id: this.userId }).then(
        res => {
          if (res.result.isSuccess) {
            this.detailData = res.data
          }
        }
      )
      realInfoLogList(
        { member: { field: 'id', search: this.userId, strict: '0' } },
        'withSchema'
      ).then(res => {
        if (res.result.isSuccess) {
          this.list = res.data
          this.listLoading = false
        }
      })
      realInfoAudit({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    // 根据状态颜色选取不同的类名
    statusClass(status) {
      if (status === 2) {
        return 'remind'
      } else if (status === 1) {
        return 'adopt'
      } else {
        return 'proh'
      }
    },
    // 获取属性值的方法
    getKeys(item) {
      if (typeof item !== 'undefined') {
        return Object.keys(item)
      }
    },
    // 打开图片
    photoBox(key) {
      this.$alert(
        `<img style="max-width:100%;max-height:100%" src="${this.imgUrl}${this.photoUrl}?type= ${key}&id=${this.detailData.id}" /><p>${this.detailData.certificate.files[key].typeName}</p> `,
        '',
        {
          dangerouslyUseHTMLString: true,
          center: true,
          showConfirmButton: false,
          closeOnClickModal: true,
          closeOnPressEscape: true
        }
      )
    },
    selectStatus() {
      this.loading = false
    },
    // 审核
    Submission() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = {
            ...this.form,
            id: this.detailData.id
          }
          realInfoAudit(data).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.getData()
            }
          })
        }
      })
    },
    // 去审核
    toAuthentication() {
      this.$router.push(`/member/list/realInfo/${this.userId}`)
    }
  }
}
