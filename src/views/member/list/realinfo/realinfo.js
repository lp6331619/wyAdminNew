import { realInfoMemberDetail, applyRealInfo, realInfoUpdate } from '@/api/member'
import AuitInfo from './component/auitInfo.vue'
import { Upload } from '@/components'
export default {
  components: {
    AuitInfo,
    Upload
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
      loading: false, // 加载状态
      typeData: {}, // 个人和企业提交的数据暂时保存
      form: {
        address: {
          province: '',
          city: '',
          area: '',
          address: ''
        },
        managerCertificate: {
          name: '',
          no: ''
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
        address: {
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
        },
        managerCertificate: {
          name: { required: true, trigger: 'change', message: '省不能为空!' },
          no: { required: true, trigger: 'change', message: '省不能为空!' }
        }
      },
      moreFileType: {}, // 所有可选证件类型
      moreFileVal: null, // 当前选中的证件类型
      moreFile: {}, // 选中的可选证件类型
      moreFileImg: {}, // 可选证件类型数据
      certificateImg: {} // 证件照
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
      // 获取 prepare
      applyRealInfo({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.provinces = this.prepare.district.provinces
          this.moreFileType = this.prepare.licenseType
          realInfoMemberDetail({ memberId: this.userId }).then(res => {
            if (res.result.isSuccess) {
              this.dataInfo = res.data
              this.detailData = res.data.realInfo
              this.certificateImg = {
                id: this.detailData.id,
                files: this.detailData.certificate.files
              }

              if (
                !this.detailData ||
                Object.prototype.toString.call(res.data) ===
                '[object Array]'
              ) {
                this.isNull = true
              } else {
                this.getForm()
              }
            }
          })
        }
      })
    },
    // 确认更改实名
    emitOut() {
      this.isChange = true
    },
    // 获取 form
    getForm() {
      this.form.type = this.detailData.type.value
      this.form.address = {
        province: this.detailData.address.provinceCode,
        city: this.detailData.address.cityCode,
        area: this.detailData.address.areaCode,
        address: this.detailData.address.address
      }
      this.citys = this.prepare.district.citys[this.form.address.province]
      this.areas = this.prepare.district.areas[this.form.address.city]
      this.form.managerCertificate = {
        no: this.detailData.managerCertificate.no,
        name: this.detailData.managerCertificate.name
      }
      this.form.certificate = {
        type: String(this.detailData.certificate.type.value),
        no: this.detailData.certificate.no,
        name: this.detailData.certificate.name,
        manager: this.detailData.certificate.manager,
        files: {}
      }
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
      this.form.address.city = ''
      this.form.address.area = ''
      this.citys = this.prepare.district.citys[e]
    },
    // 选择市
    selectCitys(e) {
      this.areas = this.prepare.district.areas[e]
    },
    // 个人 企业切换
    changeType(e) {
      // this.typeData[e] = JSON.parse(JSON.stringify(this.form))
    },
    // 选择类型清空现有的
    changeCertificateType(e) {
      this.form.certificate.files = {}
    },
    // 返回的证件照
    fileOut(files) {
      this.form.certificate.files = files
    },
    subForm() {
      this.loading = true
      console.log(this.form, '提交的数据')
      this.$refs.form.validate(valid => {
        if (valid) {
          const isTrue = (() => {
            return (
              !!this.detailData &&
              !!this.detailData.status &&
              this.detailData.status.value === 2 &&
              this.detailData.type.value === this.form.type
            )
          })()
          if (isTrue) {
            // 更新
            realInfoUpdate({ ...this.form, member: this.userId, id: this.detailData.id }).then(res => {
              if (res.result.isSuccess) {
                this.$message.success(res.result.message)
                this.$router.go(-1)
              }
              this.loading = false
            })
          } else {
            // 新建
            applyRealInfo({ ...this.form, member: this.userId }).then(res => {
              if (res.result.isSuccess) {
                this.$message.success(res.result.message)
                this.$router.go(-1)
              }
              this.loading = false
            })
          }
        }
      })
    },
    // 添加可选证件类型
    add() {
      this.moreFile[this.moreFileVal] = this.moreFileType[this.moreFileVal]
      delete this.moreFileType[this.moreFileVal]
      this.moreFileVal = ''
      console.log(this.moreFile, this.moreFileType, 55)
    }
  }
}
