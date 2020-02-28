<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='edit'?'修改':'新建'}DDoS资源-线路信息`"
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
        <el-form-item label="最大防御:" prop="ddos">
          <div v-if="!edit && scene==='edit'">{{ dateBox.ddos.valueWithUnit }}</div>
          <template v-if="edit">
            <el-input v-model="form.ddos" placeholder="请输入最大防御" />
          </template>
        </el-form-item>
        <el-form-item label="没费防御值:" prop="freeDdos">
          <div v-if="!edit && scene==='edit'">{{ dateBox.freeDdos.valueWithUnit }}</div>
          <template v-if="edit">
            <el-input v-model="form.freeDdos" placeholder="请输入没费防御值" />
          </template>
        </el-form-item>
        <el-form-item label="区域:" prop="region">
          <div v-if="!edit && scene==='edit'">{{ dateBox.region.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-if="prepare" v-model="form.region" placeholder="请选择区域">
              <el-option
                v-for="(val,key) in prepare.region"
                :key="key"
                :label="val.name"
                :value="val.id"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="线路:" prop="line">
          <div v-if="!edit && scene==='edit'">{{ dateBox.line.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-if="prepare" v-model="form.line" placeholder="请选择线路">
              <el-option
                v-for="(val,key) in prepare.idcLine"
                :key="key"
                :label="val.name"
                :value="val.id"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="cc状态:" prop="hasCc">
          <div v-if="!edit && scene==='edit'">{{ dateBox.ccStatus.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-if="prepare" v-model="form.hasCc" placeholder="请选择cc状态">
              <el-option
                v-for="(val,key) in prepare.ccStatus"
                :key="key"
                :label="val"
                :value="key"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="是否可用:" prop="isEnable">
          <div v-if="!edit && scene==='edit'">{{ dateBox.enableStatus.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-if="prepare" v-model="form.isEnable" placeholder="请选择是否可用">
              <el-option
                v-for="(val,key) in prepare.isEnable"
                :key="key"
                :label="val"
                :value="key"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="是否转发:" prop="hasForward">
          <div v-if="!edit && scene==='edit'">{{ dateBox.forwardStatus.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-if="prepare" v-model="form.hasForward" placeholder="请选择是否转发">
              <el-option
                v-for="(val,key) in prepare.forwardStatus"
                :key="key"
                :label="val"
                :value="key"
              />
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:ddos:region:line:update'}"
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
  resourceDDosRegionLineCreate,
  resourceDDosRegionLineDetail,
  resourceDDosRegionLineUpdate
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
        region: '', // "所属区域"
        line: '', // "线路"
        ddos: '', // "最大防御"
        freeDdos: '', // "免费防御"
        hasCc: '', // "CC防护"
        isEnable: '', // "是否启用"
        hasForward: '' // "是否支持转发"
      },
      formRules: {
        region: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        line: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        ddos: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        freeDdos: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        hasCc: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        isEnable: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        hasForward: [{ required: true, trigger: 'blur', message: '不能为空!' }]
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
      resourceDDosRegionLineCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceDDosRegionLineUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceDDosRegionLineDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          this.form = {
            id: box.id,
            region: box.region ? box.region.id : '', // "所属区域"
            line: box.line ? box.line.id : '', // "线路"
            ddos: box.ddos ? box.ddos.value : '', // "最大防御"
            freeDdos: box.freeDdos ? box.freeDdos.value : '', // "免费防御"
            hasCc: box.ccStatus ? box.ccStatus.key : '', // "CC防护"
            isEnable: box.enableStatus ? box.enableStatus.key : '', // "是否启用"
            hasForward: box.forwardStatus ? box.forwardStatus.key : '' // "是否支持转发"
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
              resourceDDosRegionLineCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceDDosRegionLineUpdate(this.form).then(res => {
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
