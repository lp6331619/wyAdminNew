<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='edit'?'修改':'新建'}机房信息`"
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
        <el-form-item v-if="scene==='create'" label="机房标识:" prop="id">
          <el-input v-model="form.id" type="text" placeholder="请输入机房标识" />
        </el-form-item>
        <el-form-item label="机房名称:" prop="name">
          <div v-if="!edit && scene==='edit'">{{ dateBox.name }}</div>
          <template v-if="edit">
            <el-input v-model="form.name" placeholder="请输入机房名称" />
          </template>
        </el-form-item>
        <el-form-item label="区域名称:" prop="region">
          <div v-if="!edit && scene==='edit'">{{ dateBox.region.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.region" placeholder="请选择区域名称">
              <el-option v-for="(val,key) in prepare.region" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <div class="flex">
          <el-form-item label="城市地址:" prop="provinces">
            <div v-if="!edit && scene==='edit'">{{ dateBox.districtName }}</div>
            <template v-if="edit && prepare">
              <el-select
                v-model="form.provinces"
                placeholder="请选择省"
                @change="form.citys='',form.areas=''"
              >
                <el-option
                  v-for="(val,key) in prepare.district.provinces"
                  :key="key"
                  :label="val"
                  :value="key"
                />
              </el-select>
              <el-form-item class="mt10" prop="citys">
                <el-select v-model="form.citys" placeholder="请选择市" @change="form.areas=''">
                  <el-option
                    v-for="(val,key) in prepare.district.citys[form.provinces]"
                    :key="key"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="mt10" prop="areas">
                <el-select v-model="form.areas" placeholder="请选择区">
                  <el-option
                    v-for="(val,key) in prepare.district.areas[form.citys]"
                    :key="key"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-form-item>
        </div>
        <el-form-item label="启用:" prop="isEnable">
          <div v-if="!edit && scene==='edit'">{{ dateBox.enableStatus.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.isEnable" placeholder="请选择启用">
              <el-option
                v-for="(val,key) in prepare.isEnable"
                :key="key"
                :label="val"
                :value="key"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="排序:" prop="displayOrder">
          <div v-if="!edit && scene==='edit'">{{ dateBox.displayOrder }}</div>
          <template v-if="edit ">
            <el-input v-model="form.displayOrder" placeholder="请输入排序" />
          </template>
        </el-form-item>
        <el-form-item v-if="scene==='edit'" label="添加时间">{{ dateBox.stat.createDateTime }}</el-form-item>
        <el-form-item v-if="scene==='edit'" label="修改时间">{{ dateBox.stat.updateDateTime }}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:idc:region:update'}"
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
  resourceIdcRoomCreate,
  resourceIdcRoomDetail,
  resourceIdcRoomUpdate
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
        id: '', // "机房标识"
        region: '', // "所在区域"
        name: '', // "机房名称"
        provinces: '', // "provinces"
        citys: '', // "citys"
        areas: '', // "areas"
        isEnable: '', // "是否启用"
        displayOrder: '' // "显示顺序"
      },
      formRules: {
        id: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        name: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        region: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        provinces: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        citys: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        areas: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        isEnable: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        displayOrder: [
          { required: true, trigger: 'blur', message: '不能为空!' }
        ]
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
      resourceIdcRoomCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceIdcRoomUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceIdcRoomDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          this.form = {
            id: box.id, // "机房标识"
            region: box.region ? box.region.id : '', // "所在区域"
            name: box.name, // "机房名称"
            provinces: box.provinceCode, // "provinces"
            citys: box.cityCode, // "citys"
            areas: box.areaCode, // "areas"
            isEnable: box.enableStatus ? box.enableStatus.key : '', // "是否启用"
            displayOrder: box.displayOrder // "显示顺序"
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
              resourceIdcRoomCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceIdcRoomUpdate(this.form).then(res => {
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
