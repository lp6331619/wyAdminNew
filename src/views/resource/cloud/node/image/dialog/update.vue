<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`节点-${scene==='detail'?'修改':'新建'}镜像`"
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
        label-width="150px"
        label-position="right"
      >
        <el-form-item label="镜像名称:" prop="name">
          <el-input v-model="form.name" placeholder="请输入镜像名称" />
        </el-form-item>
        <el-form-item label="登录账号:" prop="loginUser">
          <el-input v-model="form.loginUser" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="系统盘大小:" prop="bootSize">
          <el-input v-model="form.bootSize" type="number" placeholder="请输入系统盘大小" />
        </el-form-item>
        <el-form-item label="镜像标识:" prop="code">
          <el-input v-model="form.code" placeholder="请输入镜像标识" />
        </el-form-item>
        <el-form-item label="Openstack镜像ID:" prop="glanceId">
          <el-input v-model="form.glanceId" placeholder="请输入Openstack镜像ID" />
        </el-form-item>
        <el-form-item label="所属节点:" prop="node">
          <el-select v-if="prepare" v-model="form.node" placeholder="请选择所属节点">
            <el-option
              v-for="(val,key) in prepare.node"
              :key="key"
              :label="val.name"
              :value="val.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="系统盘类型:" prop="bootType">
          <el-select v-if="prepare" v-model="form.bootType" placeholder="请选择系统盘类型">
            <el-option
              v-for="(val,key) in prepare.diskType"
              :key="key"
              :label="val.name"
              :value="val.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="操作系统:" prop="osVersion">
          <el-select v-if="prepare" v-model="form.osVersion" placeholder="请选择操作系统">
            <el-option
              v-for="(val,key) in prepare.osVersion"
              :key="key"
              :label="val.name"
              :value="val.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用:" prop="isEnable">
          <el-select v-if="prepare" v-model="form.isEnable" placeholder="请选择所是否可用">
            <el-option v-for="(val,key) in prepare.status" :key="key" :label="val" :value="key" />
          </el-select>
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
  resourceCloudImageCreate,
  resourceCloudImageDetail,
  resourceCloudImageUpdate
} from '@/api/resource'
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
        code: '', // "镜像标识"
        node: '', // "所属节点"
        osVersion: '', // "操作系统版本"
        name: '', // "镜像名称"
        loginUser: '', // "登录帐号"
        bootSize: '', // "系统盘大小"
        bootType: '', // "系统盘类型"
        glanceId: '', // "Openstack镜像ID"
        isEnable: '' // "是否启用"
      },
      formRules: {
        code: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        name: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        loginUser: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        glanceId: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        node: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        osVersion: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        bootSize: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        bootType: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        isEnable: [{ required: true, trigger: 'blur', message: '不能为空!' }]
      },
      loading: false,
      prepare: undefined
    }
  },
  mounted() {
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
      resourceCloudImageCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceCloudImageUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceCloudImageDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.form = {
            code: box.code, // "镜像标识"
            name: box.name, // "镜像名称"
            loginUser: box.loginUser, // "登录帐号"
            glanceId: box.glanceId, // "Openstack镜像ID"
            id: box.id,
            bootSize: box.bootSize ? box.bootSize.value : '', // "系统盘大小"
            node: box.node ? box.node.id : '', // "所属节点"
            osVersion: box.osVersion ? box.osVersion.id : '', // "操作系统版本"
            bootType: box.bootType ? box.bootType.id : '', // "系统盘类型"
            isEnable: box.enableStatus ? box.enableStatus.key : '' // "是否启用"
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
              resourceCloudImageCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              resourceCloudImageUpdate(this.form).then(res => {
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
