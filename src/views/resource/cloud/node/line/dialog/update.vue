<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`节点-${scene==='detail'?'修改':'新建'}节点线路`"
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
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="最大带宽:" prop="bandwidth">
          <el-input v-model="form.bandwidth" type="number" placeholder="请输入最大带宽" />
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
        <el-form-item label="所属线路:" prop="line">
          <el-select v-if="prepare" v-model="form.line" placeholder="请选择所属线路">
            <el-option
              v-for="(val,key) in prepare.line"
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
  resourceCloudLineCreate,
  resourceCloudLineDetail,
  resourceCloudLineUpdate
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
        bandwidth: '',
        node: '',
        line: '',
        isEnable: ''
      },
      formRules: {
        bandwidth: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        node: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        line: [{ required: true, trigger: 'blur', message: '不能为空!' }],
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
      resourceCloudLineCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceCloudLineUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceCloudLineDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.form = {
            bandwidth: box.bandwidth ? box.bandwidth.value : '',
            line: box.line ? box.line.id : '',
            node: box.node ? box.node.id : '',
            isEnable: box.enableStatus ? box.enableStatus.key : '',
            id: box.id
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
              resourceCloudLineCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              resourceCloudLineUpdate(this.form).then(res => {
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
