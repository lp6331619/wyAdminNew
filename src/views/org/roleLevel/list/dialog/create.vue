<template>
  <div>
    <el-dialog
      title="创建角色等级"
      :visible.sync="setStatusStatus "
      width="500px"
      :before-close="handleClose"
      :close-on-press-escape="true"
      append-to-body
    >
      <el-form
        ref="setDetail"
        v-loading="loading"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item label="等级名称:" prop="name" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type" label-width="100px">
          <el-select v-if="prepare" v-model="form.type" placeholder="请选择类型名称">
            <el-option v-for="(val,key,i) in prepare.type" :key="i" :label="val" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色权限:" prop="scope" label-width="100px">
          <el-select v-if="prepare" v-model="form.scope" placeholder="请选择上级角色权限">
            <el-option v-for="(val,key,i) in prepare.scope" :key="i" :label="val" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="等级:" prop="level" label-width="100px">
          <el-input
            v-model="form.level"
            type="number"
            placeholder="请输入等级"
            @keyup.enter.native="editDetailBox"
          ></el-input>
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
import { orgRoleLevelCreate } from '@/api/org'
export default {
  name: 'EditUpdate',
  props: {
    status: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 修改密码表单
      setStatusStatus: false,
      form: {
        type: '',
        name: '',
        level: '',
        scope: ''
      },
      formRules: {
        name: [
          { required: true, max: '64', trigger: 'change', message: '不能为空!' }
        ],
        scope: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        type: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        level: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ]
      },
      loading: false,
      prepare: undefined
    }
  },
  mounted() {
    this.getRule('prepare')
    this.setStatusStatus = this.status
  },
  methods: {
    getRule(rule) {
      this.loading = true
      orgRoleLevelCreate({}, rule).then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          orgRoleLevelCreate(this.form).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
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
