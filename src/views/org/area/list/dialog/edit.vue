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
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item label="分公司ID:" label-width="100px">{{ form.id }}</el-form-item>
        <el-form-item label="上级公司:" label-width="100px">
          <el-select v-if="prepare" v-model="form.parent" placeholder="请选择上级公司">
            <el-option
              v-for="(item,i) in prepare.areas"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分公司名字:" prop="name" label-width="100px">
          <el-input v-model="form.name" type="text" placeholder="请输入分公司名字"></el-input>
        </el-form-item>
        <el-form-item label="展示顺序:" label-width="100px">
          <el-input
            v-model="form.displayOrder"
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
import { orgAreaUpdate, orgAreaDetail } from '@/api/org'
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
      form: {
        id: null,
        displayOrder: '',
        name: '',
        parent: null
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '不能为空!' }]
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
      orgAreaUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      orgAreaDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.form = {
            name: box.name,
            parent: box.parent ? box.parent.id : null,
            displayOrder: box.displayOrder,
            id: box.id
          }
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          orgAreaUpdate(this.form).then(res => {
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
