<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`节点-${scene==='detail'?'修改':'新建'}磁盘类型`"
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
        <el-form-item label="磁盘类型:" prop="info">
          <el-select v-if="prepare" v-model="form.info" placeholder="请选择磁盘类型">
            <el-option
              v-for="(val,key) in prepare.diskType"
              :key="key"
              :label="val.name"
              :value="val.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="最大容量:" prop="maxSize">
          <el-input v-model="form.maxSize" type="number" placeholder="请输入最大容量" />
        </el-form-item>
        <el-form-item label="Openstack类型ID:" prop="cinderType">
          <el-input v-model="form.cinderType" placeholder="请输入Openstack类型ID" />
        </el-form-item>
        <el-form-item label="是否可用:" prop="isEnable">
          <el-select v-if="prepare" v-model="form.isEnable" placeholder="请选择所是否可用">
            <el-option v-for="(val,key) in prepare.status" :key="key" :label="val" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述:" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入描述" />
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
  resourceCloudNodeDiskTypeCreate,
  resourceCloudNodeDiskTypeDetail,
  resourceCloudNodeDiskTypeUpdate
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
        node: '', // "节点"
        info: '', // "类型"
        maxSize: '', // "最大容量"
        cinderType: '', // "Openstack类型ID"
        description: '', // "描述"
        isEnable: '' // "是否启用"
      },
      formRules: {
        node: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        info: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        maxSize: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        cinderType: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        description: [
          { required: true, trigger: 'blur', message: '不能为空!' }
        ],
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
      resourceCloudNodeDiskTypeCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceCloudNodeDiskTypeUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceCloudNodeDiskTypeDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.form = {
            id: box.id,
            node: box.node ? box.node.id : '', // "所属节点"
            info: box.info ? box.info.id : '', // "类型"
            maxSize: box.maxSize ? box.maxSize.value : '', // "最大容量"
            cinderType: box.cinderType, // "Openstack类型ID"
            description: box.description, // "描述"
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
              resourceCloudNodeDiskTypeCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              resourceCloudNodeDiskTypeUpdate(this.form).then(res => {
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
