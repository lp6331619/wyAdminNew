import { detail, checkbeian, getLog, savaStatus } from '@/api/netSec'
import editFirewall from './dialog/dialog.vue'
import { RemarkCard, MemberInfo } from '@/components/'

export default {
  components: { editFirewall, RemarkCard, MemberInfo },
  data() {
    return {
      id: '',
      loading: false,
      detailData: null,
      defFirewalls: [],
      tableData: [],
      remarkUrls: {
        addNote: '/netsec/domainwhitelist/addnote',
        delNote: '/netsec/domainwhitelist/delNote',
        noteList: '/netsec/domainwhitelist/notelist',
        delPrive: 'net_sec:domain_white_list:del_note',
        addPrive: 'net_sec:domain_white_list:add_note',
        listPrive: 'net_sec:domain_white_list:note_list'
      },
      form: {
        auditStatus: '',
        companys: [],
        note: ''
      },
      rules: {
        auditStatus: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ]
      },
      prepareData: null,
      auditStatus: [],
      companysList: [],
      memberData: null
    }
  },
  created() {
    this.id = Number(this.$route.params.id)
    this.getPrepareData()
    this.getLogList()
  },
  methods: {
    getPrepareData() {
      savaStatus({}, 'prepare').then(res => {
        this.prepareData = res.data
        this.auditStatus = this.FilterArray(res.data.auditStatus)
        this.getDetail()
      })
    },
    getCompanys() {
      if (this.prepareData) {
        this.companysList = []
        Object.keys(this.prepareData.companys).map(key => {
          this.companysList.push({
            key: key,
            name: this.prepareData.companys[key]
          })
          if (this.form.auditStatus !== 'INVALID' && this.form.companys.indexOf(key + '') !== -1) {
            this.form.companys.push(this.prepareData.companys[key])
          }
        })
      }
    },
    getLogList() {
      getLog({
        id: this.id
      }).then(res => {
        this.tableData = res.data
      })
    },
    getDetail() {
      this.loading = true
      detail({
        id: this.id
      }).then(res => {
        this.loading = false
        this.detailData = res.data
        this.userId = this.detailData.detail.member.id
        this.memberData = this.detailData.detail.member
        this.defFirewalls = (f => {
          if (f) {
            const arr = []
            f.map(item => {
              arr.push(item.firewallInfo.id)
            })
            return arr
          } else {
            return []
          }
        })(this.detailData.domainInfo.domainFirewalls)
        this.form.companys = (cp => {
          if (cp) {
            const arr = []
            cp.map(item => {
              if (this.prepareData) {
                this.prepareData.companys[
                  item.company.id
                ] && arr.push(item.company.id + '')
              }
            })
            return arr
          } else {
            return []
          }
        })(this.detailData.domainInfo.companys)
        this.getCompanys()
      })
    },
    fomatCompanys(data) {
      const arr = []
      if (data) {
        data.map(item => {
          arr.push(item.company.name)
        })
      }
      return arr.join(',') || '-'
    },
    onCheckBA() {
      checkbeian({
        id: this.id
      }).then(res => {
        this.$message.success(res.result.message)
      })
    },
    // 转换数组
    FilterArray(data) {
      if (data) {
        const box = []
        for (const i in data) {
          box.push({
            text: data[i],
            value: i,
            key: i
          })
        }
        return box
      }
    },
    getCompanysIds() {
      const ids = []
      for (const i in this.companysList) {
        if (this.form.companys.indexOf(this.companysList[i].name) !== -1) {
          ids.push(this.companysList[i].key)
        }
      }
      return ids
    },
    submitForm() {
      const companysIds = this.getCompanysIds()
      this.$refs.form.validate((valid) => {
        if (valid) {
          savaStatus({
            ids: this.id ? [this.id] : '',
            auditStatus: this.form.auditStatus,
            companys: companysIds,
            note: this.form.note
          }).then(res => {
            this.$refs.form.resetFields()
            this.companysList = []
            this.$message.success(res.result.message)
            this.getDetail()
            this.getLogList()
          })
        }
      })
    }
  }
}
