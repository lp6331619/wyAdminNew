<template>
  <div>
    <el-button type="primary" @click="displayBox=true">创建等级</el-button>
    <el-dialog title="创建等级" :visible.sync="displayBox" width="500px" append-to-body>
      <formBox :init-data="initData" @returnForm="returnForm" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayBox = false">取 消</el-button>
        <el-button type="primary" :disabled="editStatus" @click="createDiscountBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { createDiscount } from '@/api/member'
import formBox from './form'
export default {
  components: {
    formBox
  },
  data() {
    return {
      displayBox: false,
      editStatus: true,
      form: {},
      initData: { displayOrder: '', isDefault: false, name: '' }
    }
  },
  methods: {
    returnForm(e, s) {
      this.editStatus = !s
      this.form = e
    },
    createDiscountBox() {
      createDiscount(this.form).then(res => {
        if (res.result.isSuccess) {
          this.displayBox = false
          this.$message.success(res.result.message)
          this.$emit('refresh', true)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
