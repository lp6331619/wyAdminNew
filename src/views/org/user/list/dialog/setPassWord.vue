<template>
  <div>
    <!-- 更改密码 -->
    <el-dialog
      title="更改密码"
      :visible.sync="setPassWordStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        ref="setPassWord"
        :model="formPassWord"
        :rules="formPassWordRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item label="密码:" prop="password" label-width="110px">
          <el-input v-model="formPassWord.password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重新输入密码:" prop="passwordA" label-width="110px">
          <el-input v-model="formPassWord.passwordA" placeholder="请重新输入密码" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emitOut">取 消</el-button>
        <el-button type="primary" @click="setPassWordBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { orgUserUpdatePassword } from '@/api/org'
export default {
  name: 'SetPassWord',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    operationId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      // 修改密码表单
      setPassWordStatus: false, // 更改密码
      formPassWord: {
        password: '',
        passwordA: ''
      },
      formPassWordRules: {
        password: [
          { required: true, trigger: 'blur', message: '不能为空!' },
          {
            pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/,
            message:
              '密码长度至少8位，包含大小写字母、数字、特殊字符，任意三种',
            trigger: 'blur'
          }
        ],
        passwordA: [
          {
            required: true,
            message: '确认密码不能为空！',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.formPassWord.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    status: {
      handler(newValue, oldValue) {
        this.setPassWordStatus = newValue
      },
      deep: true
    }
  },
  methods: {
    setPassWordBox() {
      this.$refs.setPassWord.validate(valid => {
        if (valid) {
          orgUserUpdatePassword({
            id: this.operationId,
            ...this.formPassWord
          }).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.formPassWord = {
                password: '',
                passwordA: ''
              }
              this.emitOut()
            }
          })
        }
      })
    },
    emitOut() {
      this.$emit('emitOut', this.setPassWordStatus)
    },
    handleClose() {
      this.$emit('emitOut', this.setPassWordStatus, true)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
