import { realInfoMemberDetail, applyRealInfo } from '@/api/member'
import AuitInfo from './component/auitInfo.vue'
export default {
  components: {
    AuitInfo
  },
  data() {
    return {
      dataInfo: undefined,
      detailData: undefined,
      prepare: undefined,
      isNull: false, // 是否有详情
      isChange: false, // 是否变更
      provinces: undefined, // 省
      citys: undefined, // 市
      areas: undefined, // 地区
      form: {
        district: {
          province: '',
          city: '',
          area: '',
          address: ''
        },
        type: 1, // 1：个人2：企业
        certificate: {
          type: '',
          no: '',
          name: '',
          manager: '',
          files: {}
        }
      },
      formRules: {
        district: {
          province: [{ required: true, trigger: 'change', message: '省不能为空!' }],
          city: [{ required: true, trigger: 'change', message: '市不能为空!' }],
          area: [{ required: true, trigger: 'change', message: '地区不能为空!' }],
          address: [{ required: true, trigger: 'change', message: '地区不能为空!' }]
        },
        certificate: {
          type: { required: true, trigger: 'change', message: '省不能为空!' },
          no: { required: true, trigger: 'change', message: '省不能为空!' },
          name: { required: true, trigger: 'change', message: '省不能为空!' },
          manager: { required: true, trigger: 'change', message: '省不能为空!' },
          files: { required: true, trigger: 'change', message: '省不能为空!' }
        }
      }
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
    getDetail() {
      realInfoMemberDetail({ memberId: this.userId }).then(res => {
        if (res.result.isSuccess) {
          this.dataInfo = res.data
          this.detailData = res.data.realInfo
          if (
            !this.detailData ||
            Object.prototype.toString.call(res.data) ===
            '[object Array]'
          ) {
            this.isNull = true
          } else {
            this.form.type = this.detailData.type.value
          }
        }
      })
      // 获取 prepare
      applyRealInfo({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.provinces = this.prepare.district.provinces
        }
      })
    },
    // 确认更改实名
    emitOut() {
      this.isChange = true
    },
    // 判断是否展示表单
    getIsTrue(n) {
      if (this.detailData && Object.keys(this.detailData).length > 0) {
        return (
          this.form.type === n &&
          (this.isNull ||
            this.detailData.status.value === 2 ||
            (!this.isNull &&
              this.isChange &&
              (this.detailData.status.value === 1 ||
                this.detailData.status.value === 3)))
        )
      } else if (this.form.type === n && this.prepare) {
        return true
      }
      return false
    },
    // 是否展示详情
    getIsShowInfo() {
      return (
        this.detailData &&
        Object.keys(this.detailData).length > 0 &&
        !this.isNull &&
        !this.isChange &&
        (this.detailData.status.value === 1 ||
          this.detailData.status.value === 3)
      )
    },
    /**
     * 根据状态颜色选取不同的类名
     */
    statusClass(status) {
      if (status === 'AUDIT') {
        return 'remind'
      } else if (status === 'OK') {
        return 'adopt'
      } else {
        return 'proh'
      }
    },
    // 选择省
    selectProvinces(e) {
      this.form.district.city = ''
      this.form.district.area = ''
      this.citys = this.prepare.district.citys[e]
    },
    // 选择市
    selectCitys(e) {
      this.areas = this.prepare.district.areas[e]
    }
  }
}
