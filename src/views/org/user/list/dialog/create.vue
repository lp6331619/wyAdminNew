<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      title="新建详情"
      :visible.sync="setStatusStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        ref="setDetail"
        :model="formStatus"
        :rules="formStatusRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item label="部门名称:" prop="dept" label-width="100px">
          <el-select v-if="prepare" v-model="formStatus.dept" placeholder="请选择部门名称">
            <el-option
              v-for="(item,i) in prepare.areaDepts"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称:" prop="roles.id" label-width="100px">
          <el-select v-if="prepare" v-model="formStatus.roles.id" placeholder="请选择角色名称">
            <el-option
              v-for="(item,i) in prepare.roles"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="邮箱:" prop="email" label-width="100px">
          <el-input v-model="formStatus.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" label-width="100px">
          <el-input v-model="formStatus.password" type="text" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="mobile" label-width="100px">
          <el-input v-model="formStatus.mobile" type="number" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name" label-width="100px">
          <el-input v-model="formStatus.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="QQ:" label-width="100px">
          <el-input v-model="formStatus.qq" type="number" placeholder="请输入QQ"></el-input>
        </el-form-item>
        <el-form-item label="微信:" label-width="100px">
          <el-input v-model="formStatus.weixin" placeholder="请输入微信"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="editDetailBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { orgUserCreate } from '@/api/org'
export default {
  name: 'EditUpdate',
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
      setStatusStatus: false,
      formStatus: {
        email: '',
        name: '',
        password: '',
        dept: null,
        mobile: '',
        qq: '',
        weixin: '',
        roles: {
          id: ''
        }
      },
      formStatusRules: {
        password: [
          { required: true, trigger: 'blur', message: '不能为空!' },
          {
            pattern: /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/,
            message:
              '密码长度至少8位，包含大小写字母、数字、特殊字符，任意三种',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, trigger: 'blur', message: '不能为空!' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '该值不是一个有效的邮件地址',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, max: '64', trigger: 'blur', message: '不能为空!' }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '不能为空!' },
          {
            pattern: /^1[0-9]{10}$/,
            message: '手机号码格式有误，请重新输入！',
            trigger: 'blur'
          }
        ],
        dept: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        roles: {
          id: [{ required: true, trigger: 'blur', message: '不能为空!' }]
        }
      },
      prepare: undefined
    }
  },
  mounted() {
    this.getRule('prepare')
    this.setStatusStatus = this.status
  },
  methods: {
    getRule(rule) {
      orgUserCreate({}, rule).then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          orgUserCreate(this.formStatus).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.emitOut()
              this.formStatus = {
                email: '',
                name: '',
                password: '',
                dept: null,
                mobile: '',
                qq: '',
                weixin: '',
                roles: {
                  id: ''
                }
              }
            }
          })
        }
      })
    },
    emitOut() {
      this.$emit('emitOut', this.setStatusStatus)
    },
    handleClose() {
      this.$emit('emitOut', this.setStatusStatus, true)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
