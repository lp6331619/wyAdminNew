<template>
  <div>
    <el-dialog
      title="创建分公司部门"
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
        <el-form-item label="分公司:" prop="area" label-width="100px">
          <el-select v-if="prepare" v-model="form.area" placeholder="请选择分公司名称">
            <el-option
              v-for="(item,i) in prepare.areas"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事业部:" prop="dept" label-width="100px">
          <el-select v-if="prepare" v-model="form.dept" placeholder="请选择上级事业部名称">
            <el-option
              v-for="(item,i) in prepare.depts"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称:" prop="name" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序:" label-width="100px">
          <el-input
            v-model="form.displayOrder"
            type="text"
            placeholder="请输入显示顺序"
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
import { orgAreaDeptCreate } from '@/api/org'
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
        area: '',
        dept: ''
      },
      formRules: {
        name: [
          { required: true, max: '64', trigger: 'change', message: '不能为空!' }
        ],
        area: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        dept: [
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
      orgAreaDeptCreate({}, rule).then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          orgAreaDeptCreate(this.form).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.emitOut()
              this.form = {
                displayOrder: 0,
                name: '',
                area: '',
                dept: ''
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
