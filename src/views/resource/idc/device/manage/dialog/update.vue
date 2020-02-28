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
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="机房:" prop="room">
          <div v-if="!edit && scene==='edit'">{{ dateBox.room.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.room" placeholder="请选择机房">
              <el-option v-for="(val,key) in prepare.room" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="名称:" prop="name">
          <div v-if="!edit && scene==='edit'">{{ dateBox.name }}</div>
          <template v-if="edit">
            <el-input v-model="form.name" placeholder="请输入名称" />
          </template>
        </el-form-item>

        <el-form-item label="设备类型:" prop="type">
          <div v-if="!edit && scene==='edit'">{{ dateBox.type.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.type" placeholder="请选择设备类型" @change="form.spec=''">
              <el-option v-for="(val,key) in prepare.type" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="设备规格:" prop="spec">
          <div v-if="!edit && scene==='edit'">{{ dateBox.spec.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.spec" placeholder="请选择设备规格">
              <el-option
                v-for="(val,key) in prepare.spec[form.type]"
                :key="key"
                :label="val"
                :value="key"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="设备品牌:" prop="oem">
          <div v-if="!edit && scene==='edit'">{{ dateBox.oem.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.oem" placeholder="请选择设备品牌">
              <el-option v-for="(val,key) in prepare.oem" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="U数:" prop="size">
          <div v-if="!edit && scene==='edit'">{{ dateBox.size }}</div>
          <template v-if="edit ">
            <el-input v-model="form.size" placeholder="请输入U数" />
          </template>
        </el-form-item>
        <el-form-item label="详情:" prop="detail">
          <div v-if="!edit && scene==='edit'">{{ dateBox.detail }}</div>
          <template v-if="edit ">
            <el-input v-model="form.detail" placeholder="请输入详情" />
          </template>
        </el-form-item>

        <el-form-item label="设备数量:" prop="maxNum">
          <div v-if="!edit && scene==='edit'">{{ dateBox.maxNum }}</div>
          <template v-if="edit ">
            <el-input v-model="form.maxNum" placeholder="请输入数量" />
          </template>
        </el-form-item>
        <el-form-item label="已用数量:" prop="useNum">
          <div v-if="!edit && scene==='edit'">{{ dateBox.useNum }}</div>
          <template v-if="edit ">
            <el-input v-model="form.useNum" placeholder="请输入已用" />
          </template>
        </el-form-item>
        <el-form-item label="是否启用:" prop="isEnable">
          <div v-if="!edit && scene==='edit'">{{ dateBox.enableStatus.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.isEnable" placeholder="请选择启用">
              <el-option v-for="(val,key) in prepare.isEnable" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item v-if="scene==='edit'" label="添加时间">{{ dateBox.stat.createDateTime }}</el-form-item>
        <el-form-item v-if="scene==='edit'" label="修改时间">{{ dateBox.stat.updateDateTime }}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:idc:cabinet:update'}"
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
  resourceIdcDeviceCreate,
  resourceIdcDeviceDetail,
  resourceIdcDeviceUpdate
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
        name: '', // "名称"
        room: '', // "机房"
        type: '', // "类型"
        spec: '', // "规格"
        oem: '', // "品牌"
        size: '', // "U数"
        detail: '', // "明细"
        maxNum: '', // "设备数量"
        useNum: '', // "已用数量"
        isEnable: '' // "是否启用"
      },
      formRules: {
        room: [{ required: true, trigger: 'change', message: '不能为空!' }],
        name: [{ required: true, trigger: 'change', message: '不能为空!' }],
        spec: [{ required: true, trigger: 'change', message: '不能为空!' }],
        size: [{ required: true, trigger: 'change', message: '不能为空!' }],
        detail: [{ required: true, trigger: 'change', message: '不能为空!' }],
        power: [{ required: true, trigger: 'change', message: '不能为空!' }],
        type: [{ required: true, trigger: 'change', message: '不能为空!' }],
        maxNum: [{ required: true, trigger: 'change', message: '不能为空!' }],
        useNum: [{ required: true, trigger: 'change', message: '不能为空!' }],
        isEnable: [{ required: true, trigger: 'change', message: '不能为空!' }]
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
      resourceIdcDeviceCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceIdcDeviceUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceIdcDeviceDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          this.form = {
            id: box.id, // "id"
            name: box.name, // "名称"
            room: box.room ? box.room.id : '', // "机房"
            type: box.type ? box.type.id : '', // "机房"
            spec: box.spec ? box.spec.id : '', // "规格标识"
            size: box.size, // "U数"
            oem: box.oem ? box.oem.id : '',
            detail: box.detail, // ""
            maxNum: box.maxNum, // "机柜数量"
            useNum: box.useNum, // "已用数量"
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
              resourceIdcDeviceCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceIdcDeviceUpdate(this.form).then(res => {
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
