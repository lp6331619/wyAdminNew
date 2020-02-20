<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`节点-${scene==='detail'?'修改':'新建'}节点`"
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
        <el-form-item label="节点标识:" prop="id">
          <el-input v-model="form.id" :disabled="scene === 'edit'" placeholder="请输入节点标识" />
        </el-form-item>
        <el-form-item label="节点名称:" prop="name">
          <el-input v-model="form.name" placeholder="请输入节点名称" />
        </el-form-item>
        <el-form-item label="所在机房:" prop="idcRoom">
          <el-select v-if="prepare" v-model="form.idcRoom" placeholder="请选择所在机房">
            <el-option v-for="(val,key) in prepare.room" :key="key" :label="val" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用:" prop="isEnable">
          <el-select v-if="prepare" v-model="form.isEnable" placeholder="请选择所是否可用">
            <el-option v-for="(val,key) in prepare.status" :key="key" :label="val" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="展示顺序:" prop="displayOrder">
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
import {
  resourceCloudNodeCreate,
  resourceCloudNodeDetail,
  resourceCloudNodeUpdate
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
        id: '',
        name: '',
        idcRoom: '',
        displayOrder: '',
        isEnable: ''
      },
      formRules: {
        id: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        name: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        idcRoom: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        isEnable: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        displayOrder: [
          { required: true, trigger: 'blur', message: '不能为空!' }
        ]
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
      resourceCloudNodeCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceCloudNodeUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceCloudNodeDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.form = {
            id: box.id,
            idcRoom: box.idcRoom ? box.idcRoom.id : '',
            name: box.name,
            isEnable: box.enableStatus ? box.enableStatus.key : '',
            displayOrder: box.displayOrder
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
              resourceCloudNodeCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              resourceCloudNodeUpdate(this.form).then(res => {
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
