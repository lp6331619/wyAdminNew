<template>
  <div>
    <el-dialog
      title="新建角色"
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
        <el-form-item label="所属事业部:" prop="dept" label-width="100px">
          <el-select v-if="prepare" v-model="form.dept" placeholder="请选择所属事业部">
            <el-option
              v-for="(item,i) in prepare.dept"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色等级:" prop="level" label-width="100px">
          <el-select v-if="prepare" v-model="form.level" placeholder="请选择角色等级">
            <el-option
              v-for="(item,i) in prepare.roleLevel"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色名字:" prop="name" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入角色名字"></el-input>
        </el-form-item>
        <el-form-item label="展示顺序:" label-width="100px">
          <el-input
            v-model="form.displayOrder"
            type="text"
            placeholder="请输入展示顺序"
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
import { orgRoleCreate } from '@/api/org'
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
        displayOrder: 0,
        name: '',
        level: null,
        dept: null
      },
      formRules: {
        name: [
          { required: true, max: '64', trigger: 'blur', message: '不能为空!' }
        ],
        level: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        dept: [{ required: true, trigger: 'blur', message: '不能为空!' }]
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
      orgRoleCreate({}, rule).then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          orgRoleCreate(this.form).then(res => {
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
