<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='edit'?'修改':'新建'}线路信息`"
      :visible.sync="setStatusStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        v-if="dateBox || scene==='create'"
        ref="setDetail"
        v-loading="loading"
        :class="{'upDate': !edit}"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-width="100px"
        label-position="right"
      >
        <el-form-item v-if="scene==='create'" label="线路标识:" prop="id">
          <el-input v-model="form.id" type="text" placeholder="请输入线路标识" />
        </el-form-item>
        <el-form-item label="线路名称:" prop="name">
          <div v-if="!edit && scene==='edit'">{{ dateBox.name }}</div>
          <template v-if="edit">
            <el-input v-model="form.name" placeholder="请输入线路名称" />
          </template>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <div v-if="!edit && scene==='edit'">{{ dateBox.type.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option v-for="(val,key) in prepare.type" :key="key" :label="val" :value="key"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="多线路标识:" prop="realLines">
          <div v-if="!edit && scene==='edit'">{{ dateBox.realLines[0] }}</div>
          <template v-if="edit">
            <el-input v-model="form.realLines[0]" placeholder="请输入多线路标识" />
          </template>
        </el-form-item>
        <el-form-item label="描述:" prop="description">
          <div v-if="!edit && scene==='edit'">{{ dateBox.description }}</div>
          <template v-if="edit">
            <el-input v-model="form.description" placeholder="请输入描述" />
          </template>
        </el-form-item>
        <el-form-item v-if="scene==='edit'" label="添加时间">{{ dateBox.stat.createDateTime }}</el-form-item>
        <el-form-item v-if="scene==='edit'" label="修改时间">{{ dateBox.stat.updateDateTime }}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:idc:line:update'}"
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
  resourceIdcLineCreate,
  resourceIdcLineDetail,
  resourceIdcLineUpdate
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
        id: '', // "线路标识"
        name: '', // "线路名称"
        type: '', // "线路类型"
        description: '', // "线路描述"
        realLines: [] // {:title: "多线线路"}
      },
      formRules: {
        id: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        name: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        type: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        description: [
          { required: true, trigger: 'blur', message: '不能为空!' }
        ],
        realLines: [{ required: true, trigger: 'blur', message: '不能为空!' }]
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
      resourceIdcLineCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceIdcLineUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceIdcLineDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          this.form = {
            id: box.id, // "线路标识"
            name: box.name, // "线路名称"
            type: box.type ? String(box.type.value) : '', // "线路类型"
            description: box.description, // "线路描述"
            realLines: box.realLines // {:title: "多线线路"}
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
              resourceIdcLineCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceIdcLineUpdate(this.form).then(res => {
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
