<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='edit'? '修改详情':'创建自定义'}`"
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
        <el-form-item label="ID:" prop="id" label-width="100px">
          <el-input
            v-model="form.id"
            placeholder="请输入ID"
            :disabled="scene==='edit'"
            @keyup.enter.native="editDetailBox"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称:" prop="name" label-width="100px">
          <el-input
            v-model="form.name"
            type="text"
            placeholder="请输入名称"
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
import {
  messageSubscribeCreate,
  messageSubscribeDetail,
  messageSubscribeUpdate
} from '@/api/message'
export default {
  name: 'EditUpdate',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    operationId: {
      type: String,
      default: ''
    },
    scene: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      setStatusStatus: false,
      form: {
        parentCate: '',
        displayOrder: '',
        status: '',
        title: ''
      },
      formRules: {
        id: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        name: [{ required: true, trigger: 'blur', message: '不能为空!' }]
      },
      loading: false,
      prepare: undefined
    }
  },
  mounted() {
    console.log(this.scene, 44)
    switch (this.scene) {
      case 'create':
        this.getRuleCreate()
        break
      case 'edit':
        this.getRuleEdit()
        this.getDetail()
        break
    }
    this.setStatusStatus = this.status
  },
  methods: {
    getRuleCreate() {
      messageSubscribeCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      messageSubscribeUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      messageSubscribeDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.form = {
            name: box.group.name,
            id: box.group.id
          }
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          switch (this.scene) {
            case 'create':
              messageSubscribeCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              messageSubscribeUpdate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
          }
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
