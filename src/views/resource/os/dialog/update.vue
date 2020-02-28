<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='edit'?'修改':'新建'}操作系统版本信息`"
      :visible.sync="setStatusStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        v-if="dateBox || scene==='create'"
        ref="setDetail"
        v-loading="loading"
        :class="{'upDate': !edit}"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-width="100px"
        label-position="right"
      >
        <el-form-item v-if="scene==='create'" label="标识:" prop="id">
          <el-input v-model="form.id" type="text" placeholder="请输入标识" />
        </el-form-item>
        <el-form-item label="名称:" prop="name">
          <div v-if="!edit && scene==='edit'">{{ dateBox.name }}</div>
          <template v-if="edit">
            <el-input v-model="form.name" placeholder="请输入名称" />
          </template>
        </el-form-item>
        <el-form-item label="版本号:" prop="version">
          <div v-if="!edit && scene==='edit'">{{ dateBox.version }}</div>
          <template v-if="edit">
            <el-input v-model="form.version" placeholder="请输入版本号" />
          </template>
        </el-form-item>
        <el-form-item label="操作系统:" prop="distro">
          <div v-if="!edit && scene==='edit'">{{ dateBox.distro.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-if="prepare" v-model="form.distro" placeholder="请选择操作系统">
              <el-option v-for="(val,key) in prepare.distro" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="架构:" prop="arch">
          <div v-if="!edit && scene==='edit'">{{ dateBox.arch.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-if="prepare" v-model="form.arch" placeholder="请选择架构">
              <el-option v-for="(val,key) in prepare.arch" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="语言:" prop="locale">
          <div v-if="!edit && scene==='edit'">{{ dateBox.locale.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-if="prepare" v-model="form.locale" placeholder="请选择语言">
              <el-option v-for="(val,key) in prepare.locale" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:os:version:update'}"
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
  resourceOsVersionCreate,
  resourceOsVersionDetail,
  resourceOsVersionUpdate
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
        id: '', // "标识"
        name: '', // "名称"
        distro: '', // "操作系统"
        arch: '', // "架构"
        version: '', // "版本号"
        locale: '' // "语言"
      },
      formRules: {
        id: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        name: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        distro: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        arch: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        version: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        locale: [{ required: true, trigger: 'blur', message: '不能为空!' }]
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
      resourceOsVersionCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceOsVersionUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceOsVersionDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          this.form = {
            id: box.id, // "标识"
            name: box.name, // "名称"
            distro: box.distro ? box.distro.key : '', // "操作系统"
            arch: box.arch ? box.arch.key : '', // "架构"
            version: box.version, // "版本号"
            locale: box.locale ? box.locale.key : '' // "语言"
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
              resourceOsVersionCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceOsVersionUpdate(this.form).then(res => {
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
