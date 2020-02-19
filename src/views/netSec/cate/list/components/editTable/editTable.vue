<template>
  <div>
    <el-table v-loading="loading" :data="data" style="width: 100%">
      <el-table-column label="序号" align="center" prop="displayOrder">
        <template slot-scope="scope">
          <el-input
            v-if="editInd === scope.$index"
            v-model="form.displayOrder"
            type="number"
            :style="wSty"
            placeholder="请输入序号"
          >
          </el-input>
          <span v-else>{{ scope.row.displayOrder }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" prop="title">
        <template slot-scope="scope">
          <el-input
            v-if="editInd === scope.$index"
            v-model="form.title"
            :style="wSty"
            placeholder="请输入类别名称"
          >
          </el-input>
          <span v-else>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="date">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(editInd === scope.$index ? 'save' : 'edit', scope.row.displayOrder, scope.row.title, scope.row.id, scope.$index)"
          >
            {{ editInd === scope.$index ? '保存' : '编辑' }}
          </el-button>
          <el-button v-if="editInd === scope.$index" size="small" @click="cancel">取消</el-button>
          <el-button v-else type="danger" size="small" @click="onShowDio(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-table v-if="isEdit" :data="[{}]" :show-header="false" style="width: 100%">
      <el-table-column align="center">
        <el-input v-model="form.displayOrder" :style="wSty" placeholder="请输入序号"></el-input>
      </el-table-column>
      <el-table-column align="center">
        <el-input v-model="form.title" :style="wSty" placeholder="请输入类别名称"></el-input>
      </el-table-column>
      <el-table-column align="center">
        <el-button type="primary" size="small" @click="saveNew">保存</el-button>
        <el-button size="small" @click="cancelNew">取消</el-button>
      </el-table-column>
    </el-table>
    <div v-if="!isEdit" class="edit-footer">
      <el-button type="primary" @click="editNew">添加</el-button>
    </div>
    <el-dialog
      title="删除"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>确认后，该类别将移除列表，请谨慎操作</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCateList, createCate, updateCate, deleteCate } from '@/api/netSec'
export default {
  props: {
    pid: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      wSty: { width: '130px' },
      isEdit: false,
      data: [],
      form: {
        displayOrder: '',
        title: '',
        id: ''
      },
      editInd: '',
      deleteId: ''
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    getCateList() {
      this.loading = true
      getCateList({
        pid: this.pid
      }).then(res => {
        this.loading = false
        this.data = res.data
      })
    },
    edit(type, sort, tit, id, ind) {
      if (type === 'save') {
        this.save()
      } else {
        this.form.displayOrder = sort
        this.form.title = tit
        this.form.id = id
        this.editInd = ind
      }
    },
    cancel() {
      this.editInd = ''
      this.form.displayOrder = ''
      this.form.title = ''
      this.form.id = ''
    },
    save() {
      updateCate(this.form).then(res => {
        this.$message.success(res.result.message)
        this.getCateList()
        this.cancel()
      })
    },
    saveNew() {
      createCate({
        pid: this.pid,
        title: this.form.title,
        displayOrder: this.form.displayOrder
      }).then(res => {
        this.$message.success(res.result.message)
        this.getCateList()
        this.cancel()
        this.cancelNew()
      })
    },
    cancelNew() {
      this.isEdit = false
    },
    editNew() {
      this.isEdit = true
      this.cancel()
    },
    onShowDio(id) {
      this.deleteId = id
      this.dialogVisible = true
    },
    deleteData() {
      deleteCate({
        id: this.deleteId
      }).then(res => {
        this.$message.success(res.result.message)
        this.getCateList()
        this.deleteId = ''
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-footer{
  text-align: center;
  padding: 15px 0;
}
</style>
