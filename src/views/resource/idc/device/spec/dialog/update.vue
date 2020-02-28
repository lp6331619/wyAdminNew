<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='edit'?'修改':'新建'}设备规格`"
      :visible.sync="setStatusStatus"
      :before-close="handleClose"
      append-to-body
      :fullscreen="true"
    >
      <el-form
        v-if="dateBox || scene==='create'"
        ref="setDetail"
        v-loading="loading"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-width="160px"
        label-position="right"
      >
        <div :class="{'upDate': !edit}">
          <el-form-item v-if="scene==='edit'" label="ID:">{{ dateBox.id }}</el-form-item>
          <el-form-item label="设备类型:" prop="type">
            <div v-if="scene==='edit'">{{ dateBox.type.name }}</div>
            <template v-if="scene==='create'">
              <el-select v-model="form.type" placeholder="请选择设备类型">
                <el-option v-for="(val,key) in prepare.type" :key="key" :label="val" :value="key"></el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="设备规格名称:" prop="name">
            <div v-if="!edit && scene==='edit'">{{ dateBox.name }}</div>
            <template v-if="edit">
              <el-input v-model="form.name" placeholder="请输入设备规格名称" />
            </template>
          </el-form-item>
          <el-form-item label="设备规格标识:" prop="spec">
            <div v-if="scene==='edit'">{{ dateBox.spec }}</div>
            <template v-if="scene==='create'">
              <el-input v-model="form.spec" placeholder="请输入设备规格名称" />
            </template>
          </el-form-item>
          <el-form-item v-if="scene==='edit'" label="添加时间">{{ dateBox.stat.createDateTime }}</el-form-item>
          <el-form-item v-if="scene==='edit'" label="修改时间">{{ dateBox.stat.updateDateTime }}</el-form-item>
        </div>
        <template v-if="scene==='edit' && detailInfos ">
          <div v-for="(val,key) in detailInfos" :key="key">
            <div class="tip">{{ val.meta.name }}</div>
            <div :class="{'upDate': !edit}">
              <el-form-item v-for="(field,i) in val.fields" :key="i" :label="field.name">
                <div v-if="!edit ">{{ getValue(form.details[i]) }} {{ field.unit?field.unit:'' }}</div>
                <div v-else>
                  <el-input
                    v-if="field.type === 'int' || field.type === 'string'"
                    v-model="form.details[i]"
                    class="w300"
                    :placeholder="`请输入${field.name}`"
                  >
                    <template v-if="field.unit" slot="append">{{ field.unit }}</template>
                  </el-input>
                  <el-checkbox-group
                    v-if="field.type === 'checkbox'"
                    v-model="form.details[i]"
                    size="mini"
                  >
                    <el-checkbox-button
                      v-for="(options,k) in field.options"
                      :key="k"
                      :label="k"
                    >{{ options }}</el-checkbox-button>
                  </el-checkbox-group>
                  <el-select
                    v-if="field.type === 'select' "
                    v-model="form.details[i]"
                    :placeholder="`请输入${field.name}`"
                  >
                    <el-option
                      v-for="(options,k) in field.options"
                      :key="k"
                      :label="k"
                      :value="options"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
          </div>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:idc:device:spec:update'}"
          type="danger"
          @click="editFun"
        >编辑</el-button>
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-if="scene ==='create' || edit" type="primary" @click="editDetailBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  resourceIdcDeviceSpecCreate,
  resourceIdcDeviceSpecDetail,
  resourceIdcDeviceSpecUpdate
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
        type: '', // ""
        name: '', // "名称"
        spec: '', // "分类"
        details: {}
      },
      formRules: {
        type: [{ required: true, trigger: 'change', message: '不能为空!' }],
        name: [{ required: true, trigger: 'change', message: '不能为空!' }],
        spec: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      loading: false,
      prepare: undefined,
      edit: true, // 编辑状态
      dateBox: undefined,
      detailInfos: undefined
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
      resourceIdcDeviceSpecCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceIdcDeviceSpecUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceIdcDeviceSpecDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          const detailInfos = {}
          for (const i in this.dateBox.detailInfos) {
            if (this.dateBox.detailInfos[i].fields) {
              for (const d in this.dateBox.detailInfos[i].fields) {
                switch (this.dateBox.detailInfos[i].fields[d].type) {
                  case 'checkbox':
                    detailInfos[d] = this.dateBox.details
                      ? this.dateBox.details[d]
                      : []
                    break
                  default:
                    detailInfos[d] = this.dateBox.details
                      ? this.dateBox.details[d]
                      : ''
                    break
                }
              }
            }
          }
          this.form = {
            id: box.id, // "id"
            name: box.name, // "名称"
            spec: box.spec,
            type: box.type ? box.type.id : '', // "分类"
            details: detailInfos
          }
          this.detailInfos = res.data.detailInfos
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          switch (this.scene) {
            case 'create':
              resourceIdcDeviceSpecCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceIdcDeviceSpecUpdate(this.form).then(res => {
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
    },
    getKeys(item) {
      if (typeof item !== 'undefined') {
        return Object.keys(item)
      }
    },
    // 获取数据
    getValue(e) {
      let text = ''
      if (Array.isArray(e)) {
        e.forEach(res => {
          text += res + ','
        })
      } else {
        text = !e || e === 0 ? '-' : e
      }
      return text
    }
  }
}
</script>
<style lang="scss" scoped>
.tip {
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
}
.w300 {
  width: 300px;
}
</style>
