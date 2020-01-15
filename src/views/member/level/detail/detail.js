import { discountDetail, updateDiscount } from '@/api/member'
import create from './component/create.vue'
import update from './component/updateDiscount.vue'
export default {
  name: 'PassportDetail',
  components: {
    create,
    update
  },
  data() {
    return {
      detailData: undefined,
      schema: undefined,
      prepare: undefined,
      loading: false,
      product: '', // 产品类型
      node: '', // 节点
      form: undefined,
      editStatus: true // 编辑状态
    }
  },
  created() {
    this.getRule()
    this.getData()
  },
  methods: {
    getRule() {
      discountDetail({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getData() {
      this.loading = true
      const obj = {
        product: this.product,
        node: this.node
      }
      discountDetail(obj).then(
        res => {
          if (res.result.isSuccess) {
            this.detailData = res.data
            this.form = this.detailData.productDiscount
            this.loading = false
          }
        }
      )
    },
    // 更新
    Submission() {
      const obj = {
        data: {
          productDiscount: this.form
        },
        product: this.product,
        node: this.node
      }
      updateDiscount(obj).then(res => {
        if (res.result.isSuccess) {
          this.$message.success(res.result.message)
          this.getData()
          this.editStatus = true
        }
      })
    },
    // 选择产品类型
    selectData(e) {
      this.node = this.prepare.nodes[e].nodes[0].id
      this.getData()
    },
    // 节点
    selectDataProduct(e) {
      this.getData()
    }
  }
}
