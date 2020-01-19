<template>
  <div>
    <!-- 更改密码 -->
    <el-dialog
      title="更改状态"
      :visible.sync="setStatusStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        ref="setPassWord"
        :model="formStatus"
        :rules="formStatusRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item label="状态:" prop="status" label-width="110px">
          <el-select v-if="prepare" v-model="formStatus.status" placeholder="请选择">
            <el-option v-for="(k,v,i) in prepare.status" :key="i" :label="k" :value="v"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emitOut">取 消</el-button>
        <el-button type="primary" @click="setStatusBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { orgUserUpdateStatus } from '@/api/org'
export default {
  name: 'SetStatus',
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
        status: ''
      },
      formStatusRules: {
        password: [{ required: true, trigger: 'blur', message: '不能为空!' }]
      },
      prepare: undefined
    }
  },
  watch: {
    status: {
      handler(newValue, oldValue) {
        this.setStatusStatus = newValue
      },
      deep: true
    }
  },
  created() {
    this.getRule()
  },
  methods: {
    getRule() {
      orgUserUpdateStatus({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    setStatusBox() {
      this.$refs.setPassWord.validate(valid => {
        if (valid) {
          orgUserUpdateStatus({
            id: this.operationId,
            ...this.formStatus
          }).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.formStatus = {
                status: ''
              }
              this.emitOut()
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
