<template>
  <div>
    <el-form
      ref="updateDiscount"
      :model="form"
      :rules="formRules"
      auto-complete="on"
      label-position="right"
    >
      <el-form-item label="会员等级名称:" prop="name" :label-width="formLabelWidth">
        <el-input
          v-model="form.name"
          placeholder="请输入会员等级名称"
          auto-complete="off"
          @input="createDiscountBox"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序:" prop="displayOrder" :label-width="formLabelWidth">
        <el-input
          v-model="form.displayOrder"
          placeholder="请输入排序"
          auto-complete="off"
          @input="createDiscountBox"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否作为默认等级:" :label-width="formLabelWidth">
        <el-radio-group v-model="form.isDefault" class="ml20" @change="createDiscountBox">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    initData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      formLabelWidth: '140px',
      form: {
        displayOrder: '',
        isDefault: false,
        name: ''
      },
      formRules: {
        displayOrder: [
          { required: true, trigger: 'change', message: '不能为空!' }
        ],
        name: [{ required: true, trigger: 'change', message: '不能为空' }]
      }
    }
  },
  watch: {
    initData: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.initBox(newValue)
        }
      },
      deep: true
    }
  },
  created() {
    if (this.initData) {
      this.initBox(this.initData)
    }
  },

  methods: {
    createDiscountBox() {
      this.$refs.updateDiscount.validate(valid => {
        this.$emit('returnForm', this.form, valid)
      })
    },
    initBox(newValue) {
      this.form = {
        displayOrder: newValue.displayOrder,
        isDefault: false,
        name: newValue.name
      }
      this.$nextTick(() => {
        this.createDiscountBox()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
