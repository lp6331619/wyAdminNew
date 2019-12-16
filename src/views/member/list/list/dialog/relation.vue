<template>
  <div>
    <el-button size="mini" type="primary" @click="displayBox=true">用户关联申请</el-button>
    <el-dialog title="用户关联" :visible.sync="displayBox" width="500px" append-to-body>
      <el-form
        ref="createMember"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item label="邮箱:" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" placeholder="请输入邮箱" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="mobile" :label-width="formLabelWidth">
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号"
            auto-complete="off"
            @keyup.enter.native="createMemberBox()"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayBox = false">取 消</el-button>
        <el-button type="primary" @click="createMemberBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { relationUser } from '@/api/member'
export default {
  data() {
    return {
      formLabelWidth: '80px',
      form: {
        email: '',
        mobile: ''
      },
      formRules: {
        mobile: [
          { required: true, trigger: 'change', message: '不能为空!' },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '请输入正确的电话！',
            trigger: 'change'
          }
        ],
        email: [
          { required: true, trigger: 'change', message: '不能为空' },
          {
            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            message: '请输入正确的邮箱！',
            trigger: 'change'
          }
        ]
      },
      rules: {},
      displayBox: false
    }
  },
  created() {},
  methods: {
    createMemberBox() {
      this.$refs.createMember.validate(valid => {
        if (valid) {
          relationUser(this.form).then(res => {
            if (res.result.isSuccess) {
              this.displayBox = false
              this.$message.success(res.result.message)
              this.form = {
                email: '',
                mobile: ''
              }
              this.$emit('refresh', true)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
