<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='detail'?'修改':'新建'}云服务器 Ip 信息`"
      :visible.sync="setStatusStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        v-if="dateBox"
        ref="setDetail"
        v-loading="loading"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="IP:">{{ form.ip }}</el-form-item>
        <el-form-item label="节点:" prop="node">
          <div v-if="edit && scene==='edit'">{{ dateBox.node.name }}</div>
          <template v-if="!edit && prepare">
            <el-select v-model="form.node" placeholder="请选择节点">
              <el-option
                v-for="item in prepare.node"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="线路:" prop="line">
          <div v-if="edit && scene==='edit'">{{ dateBox.line?dateBox.line.name:'' }}</div>
          <template v-if="!edit && prepare">
            <el-select v-model="form.line" placeholder="请选择线路">
              <el-option v-for="(val,key) in prepare.line" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="是否启用:" prop="isEnable">
          <div v-if="edit && scene==='edit'">{{ dateBox.enableStatus.name }}</div>
          <template v-if="!edit && prepare">
            <el-select v-model="form.isEnable" placeholder="请选择是否可用">
              <el-option v-for="(val,key) in prepare.isEnable" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="是否再用:" prop="inUse">
          <div v-if="edit && scene==='edit'">{{ dateBox.useStatus.name }}</div>
          <template v-if="!edit && prepare">
            <el-select v-model="form.inUse" placeholder="请选择是否使用">
              <el-option v-for="(val,key) in prepare.inUse" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="备注:" prop="note">
          <div v-if="edit && scene==='edit'">{{ dateBox.note }}</div>
          <template v-if="!edit && prepare">
            <el-input v-model="form.note" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:cloud:ip:update'}"
          type="danger"
          @click="editFun"
        >编辑</el-button>
        <el-button v-if="scene ==='create' || !edit" @click="handleClose">取 消</el-button>
        <el-button v-if="scene ==='create' || !edit" type="primary" @click="editDetailBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  resourceCloudIpCreate,
  resourceCloudIpDetail,
  resourceCloudIpUpdate
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
        id: '', // "ID"
        ip: '',
        node: '', // "所属节点"
        inUse: '', // "是否在用"
        isEnable: '', // "是否启用"
        line: '', // "线路"
        note: '' // "note"
      },
      formRules: {
        id: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        node: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        inUse: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        isEnable: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        line: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        note: [{ required: true, trigger: 'blur', message: '不能为空!' }]
      },
      dateBox: undefined,
      loading: false,
      prepare: undefined,
      edit: true // 编辑状态
    }
  },
  mounted() {
    switch (this.scene) {
      case 'create':
        this.getRuleCreate()
        break
      case 'edit':
        this.getDetail()
        break
    }
    this.setStatusStatus = this.status
  },
  methods: {
    getRuleCreate() {
      resourceCloudIpCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceCloudIpUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = false
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceCloudIpDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          this.dateBox = res.data
          this.form = {
            id: this.dateBox.id, // "ID"
            ip: this.dateBox.ip, // ip
            node: this.dateBox.node ? this.dateBox.node.id : '', // "所属节点"
            inUse: this.dateBox.useStatus ? this.dateBox.useStatus.key : '', // "是否在用"
            isEnable: this.dateBox.enableStatus
              ? this.dateBox.enableStatus.key
              : '', // "是否启用"
            line: this.dateBox.line ? this.dateBox.line.id : '', // "线路"
            note: this.dateBox.note // "note"
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
              resourceCloudIpCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceCloudIpUpdate(this.form).then(res => {
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
