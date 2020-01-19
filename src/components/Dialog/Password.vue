<template>
  <div v-if="dataBox">
    <el-button
      v-operatePriv="{priv:'user:member:set_password'}"
      size="mini"
      type="primary"
      plain
      @click="dataBox.display=true"
    >修改密码</el-button>
    <el-dialog title="修改密码" :visible.sync="dataBox.display" width="500px" append-to-body>
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item prop="password" label="设置密码:" label-width="110px">
          <el-input v-model="form.password" placeholder="设置密码"></el-input>
        </el-form-item>
        <el-form-item prop="passwordA" label="确认设置密码:" label-width="110px">
          <el-input v-model="form.passwordA" placeholder="确认设置密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emitOut('close')">取 消</el-button>
        <el-button type="primary" @click="emitOut('right')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { setPassword } from '@/api/member'
export default {
  name: 'Configurable',
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
      dataBox: {},
      form: {
        password: '',
        passwordA: ''
      },
      formRules: {
        password: [
          { required: true, trigger: 'change', message: '不能为空!' },
          {
            pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/,
            message:
              '密码长度至少8位，包含大小写字母、数字、特殊字符，任意三种',
            trigger: 'change'
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
  mounted() {
    this.dataBox = this.initData
    setPassword({}, 'schema').then(res => {
      if (res.result.isSuccess) {
        for (const i in this.formRules) {
          const regex = res.schema.input.rules[i][0].Regex
          this.formRules[i] = {
            pattern: regex.pattern,
            message: regex.message,
            trigger: 'change'
          }
        }
      }
    })
  },
  methods: {
    emitOut(status) {
      status === 'right' ? this.setPass() : (this.dataBox.display = false)
    },
    setPass() {
      const data = {
        ...this.form,
        id: this.dataBox.id
      }
      setPassword(data).then(res => {
        if (res.result.isSuccess) {
          this.$emit('reset')
          this.dataBox.display = false
          this.$message.success(res.result.message)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__body {
  padding-top: 10px;
}
</style>
