<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`节点-${scene==='detail'?'修改':'新建'}CPU内存信息`"
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
        label-width="180px"
        label-position="right"
      >
        <el-form-item label="cpu核心:" prop="cpu">
          <el-input v-model="form.cpu" type="number" placeholder="请输入cpu核心" />
        </el-form-item>
        <el-form-item label="内存:" prop="mem">
          <el-input v-model="form.mem" placeholder="请输入内存" />
        </el-form-item>
        <el-form-item label="Openstack Flavor ID:" prop="flavorId">
          <el-input v-model="form.flavorId" placeholder="请输入Openstack Flavor ID" />
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
  resourceCloudNodeCpuMemCreate,
  resourceCloudNodeCpuMemDetail,
  resourceCloudNodeCpuMemUpdate
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
        node: '', // "所属节点"
        cpu: '', // "CPU核心"
        mem: '', // "内存"
        flavorId: '', // "Openstack Flavor ID"
        isEnable: '' // "是否启用"
      },
      formRules: {
        node: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        cpu: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        mem: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        flavorId: [{ required: true, trigger: 'blur', message: '不能为空!' }],
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
      resourceCloudNodeCpuMemCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceCloudNodeCpuMemUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceCloudNodeCpuMemDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.form = {
            id: box.id,
            node: box.node ? box.node.id : '', // "所属节点"
            cpu: box.cpu, // "cpu"
            mem: box.mem ? box.mem.value : '', // "最大容量"
            flavorId: box.flavorId, // "Openstack类型ID"
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
              resourceCloudNodeCpuMemCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              resourceCloudNodeCpuMemUpdate(this.form).then(res => {
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
