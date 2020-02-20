import { businessCreate, businessDetail } from '@/api/setMeal'
export default {
  name: 'DeptDetail',
  components: {},
  data() {
    return {
      detailData: undefined,
      schema: undefined,
      prepare: undefined,
      loading: true,
      form: {
        name: '',
        attr: [{
          type: '',
          items: [{
            item: '',
            attrs: [{
              attr: '', value: ''
            }]
          }]
        }],
        buy: 0,
        renew: 0,
        upgrade: 0
      },
      formRules: {
        name: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      editStatus: false
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    },
    scene() {
      return this.$route.query.scene ? this.$route.query.scene : ''
    }
  },
  created() {
    switch (this.scene) {
      case 'create':
        this.getRule()
        break
      case 'detail':
        this.getData()
        break
    }
  },
  methods: {
    // 获取规则
    getRule() {
      businessCreate({}, 'schema').then(res => {
        if (res.result.isSuccess && res.schema.hasPrepare) {
          this.schema = res.schema
          businessCreate({}, 'prepare').then(res => {
            if (res.result.isSuccess) {
              this.prepare = res.data
            }
          })
        }
      })
    },
    // 获取数据
    getData() {
      this.loading = true
      businessDetail({ id: this.userId }).then(
        res => {
          if (res.result.isSuccess) {
            this.detailData = res.data
            this.form = {
              parent: this.detailData.parent ? this.detailData.parent.id : null,
              name: this.detailData.name,
              displayOrder: this.detailData.displayOrder,
              id: this.detailData.id
            }
            this.loading = false
          }
        }
      )
    },

    // 减
    reduce(i, status, last) {
      if (i !== 0) {
        if (status) {
          this.form.attr[i]['items'].splice(last, 1)
        } else {
          this.form.attr.splice(i, 1)
        }
      }
    },
    // 加
    add(i, status) {
      if (status) {
        this.form.attr[i]['items'].push({
          item: '',
          attrs: [{
            attr: '', value: ''
          }]
        })
      } else {
        this.form.attr.push({
          type: '',
          items: [{
            item: '',
            attrs: [{
              attr: '', value: ''
            }]
          }]
        })
      }
    },
    changeSelect(item) {
      this.clearSelect(item)
    },
    // 清除选择
    clearSelect(item) {
      if (item.items) {
        item.items.forEach(first => {
          first.item = ''
          if (first.attrs) {
            first.attrs.forEach(second => {
              second.attr = ''
            })
          }
        })
      } else if (item.attrs) {
        item.attrs.forEach(second => {
          second.attr = ''
        })
      } else if (item.value) {
        item.value = ''
      }
    },
    // 提交
    Submission() {
      this.editStatus = true
      this.$refs.formBox.validate(valid => {
        if (valid) {
          businessCreate(this.form).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.editStatus = false
            }
          })
        }
      })
    }
  }
}
