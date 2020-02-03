<template>
  <div>
    <el-dialog
      title="新建分公司"
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
        <el-form-item label="上级事业部:" label-width="100px">
          <el-select v-if="prepare" v-model="form.parent" placeholder="请选择上级事业部名称">
            <el-option
              v-for="(item,i) in prepare.depts"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事业部名称:" prop="name" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入事业部名称"></el-input>
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
import { orgDeptCreate } from '@/api/org'
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
      form: {
        displayOrder: 0,
        name: '',
        parent: null
      },
      formRules: {
        name: [
          { required: true, max: '64', trigger: 'blur', message: '不能为空!' }
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
      orgDeptCreate({}, rule).then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          orgDeptCreate(this.form).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.emitOut()
              this.form = {
                displayOrder: null,
                name: '',
                parent: null
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
