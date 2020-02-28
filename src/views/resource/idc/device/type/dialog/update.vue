<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='edit'?'修改':'新建'}设备`"
      :visible.sync="setStatusStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        v-if="dateBox || scene==='create'"
        ref="setDetail"
        :class="{'upDate': !edit}"
        v-loading="loading"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-width="120px"
        label-position="right"
      >
        <el-form-item label="设备类型分类:" prop="category">
          <div v-if="!edit && scene==='edit'">{{ dateBox.category.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.category" placeholder="请选择设备类型分类">
              <el-option v-for="(val,key) in prepare.category" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="设备类型名称:" prop="name">
          <div v-if="!edit && scene==='edit'">{{ dateBox.name }}</div>
          <template v-if="edit">
            <el-input v-model="form.name" placeholder="请输入设备类型名称" />
          </template>
        </el-form-item>
        <el-form-item label="设备类型标识:" prop="id">
          <div v-if="!edit && scene==='edit'">{{ dateBox.id }}</div>
          <template v-if="edit && prepare">
            <el-input v-model="form.id" :disabled="scene==='edit'" placeholder="请输入设备类型名称" />
          </template>
        </el-form-item>
        <el-form-item v-if="scene==='edit'" label="添加时间">{{ dateBox.stat.createDateTime }}</el-form-item>
        <el-form-item v-if="scene==='edit'" label="修改时间">{{ dateBox.stat.updateDateTime }}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:idc:device:type:update'}"
          type="danger"
          @click="editFun"
        >编辑</el-button>
        <el-button v-if="scene ==='create' || edit" @click="handleClose">取 消</el-button>
        <el-button v-if="scene ==='create' || edit" type="primary" @click="editDetailBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  resourceIdcDeviceTypeCreate,
  resourceIdcDeviceTypeDetail,
  resourceIdcDeviceTypeUpdate
} from '@/api/resource'
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
        id: '', // "ID"
        name: '', // "名称"
        category: '' // "分类"
      },
      formRules: {
        id: [{ required: true, trigger: 'change', message: '不能为空!' }],
        name: [{ required: true, trigger: 'change', message: '不能为空!' }],
        category: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      loading: false,
      prepare: undefined,
      edit: true, // 编辑状态
      dateBox: undefined
    }
  },
  mounted() {
    switch (this.scene) {
      case 'create':
        this.getRuleCreate()
        break
      case 'edit':
        this.edit = false
        this.getDetail()
        break
    }
    this.setStatusStatus = this.status
  },
  methods: {
    getRuleCreate() {
      resourceIdcDeviceTypeCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceIdcDeviceTypeUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceIdcDeviceTypeDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          this.form = {
            id: box.id, // "id"
            name: box.name, // "名称"
            category: box.category ? box.category.key : '' // "分类"
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
              resourceIdcDeviceTypeCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceIdcDeviceTypeUpdate(this.form).then(res => {
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
    // 传出数据
    emitOut() {
      this.$emit('emitOut', this.setStatusStatus)
    },
    // 关闭传出
    handleClose() {
      this.$emit('emitOut', this.setStatusStatus, true)
    },
    // 编辑状态
    editFun() {
      this.getRuleEdit()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
