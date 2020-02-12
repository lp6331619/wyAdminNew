<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      title="修改详情"
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
        label-position="right"
      >
        <!-- <el-form-item label="分公司ID:" label-width="100px">{{ form.id }}</el-form-item> -->
        <el-form-item label="文章分类:" prop="parentCate" label-width="100px">
          <el-select v-if="prepare" v-model="form.parentCate" placeholder="请选择文章分类">
            <el-option
              v-for="(item,i) in prepare.cate"
              :key="i"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="prepare" label="文章状态:" prop="status" label-width="100px">
          <el-radio-group v-model="form.status">
            <el-radio v-for="(key,val,i) in prepare.status" :label="val">{{ key }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章标题:" prop="title" label-width="100px">
          <el-input v-model="form.title" placeholder="请输入展示顺序" @keyup.enter.native="editDetailBox"></el-input>
        </el-form-item>
        <el-form-item label="文章序号:" label-width="100px">
          <el-input
            v-model="form.displayOrder"
            type="number"
            placeholder="请输入文章序号"
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
  articleCateCreate,
  articleCateDetail,
  articleCateUpdate
} from '@/api/site'
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
        parentCate: '',
        displayOrder: '',
        status: '',
        title: ''
      },
      formRules: {
        parentCate: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        status: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        title: [{ required: true, trigger: 'blur', message: '不能为空!' }]
      },
      loading: false,
      prepare: undefined
    }
  },
  mounted() {
    console.log(this.scene, 44)
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
      articleCateCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      articleCateUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getDetail() {
      this.loading = true
      articleCateDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.form = {
            parentCate: box.parentCate ? box.parentCate.id : null,
            displayOrder: box.displayOrder,
            status: box.status.key,
            title: box.title,
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
              articleCateCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              articleCateUpdate(this.form).then(res => {
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
