<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      title="修改详情"
      :visible.sync="setStatusStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        ref="setDetail"
        v-loading="loading"
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
        <el-form-item label="员工 ID:" prop="id" label-width="100px">
          <el-input v-model="formStatus.id" type="number" placeholder="请输入ID"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email" label-width="100px">
          <el-input v-model="formStatus.email" placeholder="请输入邮箱"></el-input>
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
import { orgUserUpdate, orgUserDetail } from '@/api/org'
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
      setStatusStatus: false, // 更改密码
      formStatus: {
        id: null,
        email: '',
        name: '',
        version: null,
        dept: null,
        mobile: '',
        qq: '',
        weixin: ''
      },
      formStatusRules: {
        id: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        email: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        name: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        mobile: [{ required: true, trigger: 'blur', message: '不能为空!' }]
      },
      loading: false,
      prepare: undefined
    }
  },
  mounted() {
    this.getRule()
    this.getDetail()
    this.setStatusStatus = this.status
  },
  methods: {
    getRule() {
      orgUserUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      orgUserDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const data = res.data
          this.formStatus = {
            id: data.id,
            email: data.email,
            name: data.name,
            version: data.stat ? data.stat.version : '',
            dept: data.dept.id,
            mobile: data.mobile,
            qq: data.qq,
            weixin: data.weixin
          }
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          orgUserUpdate({
            id: this.operationId,
            ...this.formStatus
          }).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.emitOut()
              this.formStatus = {
                status: ''
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
