<template>
  <div>
    <el-dialog
      title="更新分公司部门"
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
        <el-form-item label="角色等级ID:" label-width="100px">{{ form.id }}</el-form-item>
        <el-form-item label="等级名称:" prop="name" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入等级名称"></el-input>
        </el-form-item>
        <el-form-item label="类型:" prop="type" label-width="100px">
          <el-select v-if="prepare" v-model="form.type" placeholder="请选择类型">
            <el-option v-for="(val,key,i) in prepare.type" :key="i" :label="val" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色权限:" prop="scope" label-width="100px">
          <el-select v-if="prepare" v-model="form.scope" placeholder="请选择角色权限">
            <el-option v-for="(val,key,i) in prepare.scope" :key="i" :label="val" :value="key" />
          </el-select>
        </el-form-item>

        <el-form-item label="等级:" label-width="100px">
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
import { orgRoleLevelUpdate, orgRoleLevelDetail } from '@/api/org'
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
        id: null,
        level: 0,
        name: '',
        scope: '',
        type: ''
      },
      detilData: {},
      formRules: {
        name: [
          { required: true, max: '64', trigger: 'change', message: '不能为空!' }
        ],
        type: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        scope: [
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
    this.getDetail()
    this.setStatusStatus = this.status
  },
  methods: {
    getRule(rule) {
      orgRoleLevelUpdate({}, rule).then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      orgRoleLevelDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          this.detilData = res.data
          this.form = {
            id: this.detilData.id,
            displayOrder: this.detilData.displayOrder,
            name: this.detilData.name,
            type: this.detilData.type ? this.detilData.type.key : null,
            scope: this.detilData.scope ? this.detilData.scope.key : null,
            level: this.detilData.level ? this.detilData.level : null
          }
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          orgRoleLevelUpdate(this.form).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.emitOut()
              this.form = {
                id: null,
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
