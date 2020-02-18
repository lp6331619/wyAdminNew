import { messageTemplateDetail, messageTemplateContent } from '@/api/message'
export default {
  name: 'messageTemplateDetail',
  data() {
    return {
      prepare: undefined,
      schema: undefined,
      dataBox: undefined,
      contents: undefined,
      loading: false,
      channel: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id ? this.$route.params.id : undefined
    }
  },
  created() {
    this.prepareContentGroup()
  },

  methods: {
    // 获取 schema prepare
    getRule(type) {
      return messageTemplateContent({ type: 'group' }, type)
    },
    getData() {
      return messageTemplateDetail({ id: this.id })
    },
    async prepareContentGroup() {
      const data = await this.getData()
      this.dataBox = data.data
      this.prepare = await this.getRule('prepare')
      this.schema = await this.getRule('schema')
      if (this.prepare.data.channel) {
        for (const i in this.prepare.data.channel) {
          const b = i.toUpperCase()
          this.channel[b] = this.prepare.data.channel[i]
          // this.$set(this.channel, b, this.prepare.data.channel[i])
        }
        console.log(this.channel, 123)
      }
      const contents = this.dataBox.contents
      const groups = this.prepare.data.group
      if (typeof (contents) !== 'undefined' && typeof (groups) !== 'undefined') {
        for (var i in contents) {
          var groupList = []
          for (var g in groups) {
            var temp = {
              id: groups[g].id,
              name: groups[g].name
            }
            groupList.push(temp)
          }
          contents[i].groupList = groupList
        }
        this.contents = contents
      }
    },
    getKeys(item) {
      if (typeof (item) !== 'undefined') {
        return Object.keys(item)
      }
    },
    sub() {
      this.$refs.form.validate(valid => {
        if (valid) {
          messageTemplateContent({ templateId: this.dataBox.info.id, contents: this.contents }).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
            }
          })
        }
      })
    }
  }
}
