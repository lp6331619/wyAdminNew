<template>
  <div>
    <el-button
      type="primary"
      :disabled="selectTable.length === 0"
      @click="onShowDialog()"
    >
      批量审核
    </el-button>
    <el-dialog title="信安处理信息" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="处理进度" prop="progress">
          <el-select v-model="form.progress" placeholder="请选择">
            <el-option v-for="item in progress" :key="item.key" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理方式" prop="way">
          <el-select v-model="form.way" placeholder="请选择">
            <el-option v-for="item in way" :key="item.key" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理意见">
          <el-input v-model="form.note" type="textarea" placeholder="请输入处理意见"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setProcess } from '@/api/netSec'
export default {
  props: {
    selectTable: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        progress: '',
        way: '',
        note: ''
      },
      rules: {
        progress: [
          { required: true, message: '请选择处理进度', trigger: 'change' }
        ],
        way: [
          { required: true, message: '请选择处理意见', trigger: 'change' }
        ]
      },
      ids: [],
      progress: [],
      way: []
    }
  },
  created() {
    this.getIds()
  },
  methods: {
    onShowDialog() {
      this.dialogVisible = true
      this.getPrepareData()
    },
    getPrepareData() {
      setProcess({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.progress = this.common.FilterArray(res.data.progress)
          this.way = this.common.FilterArray(res.data.way)
        }
      })
    },
    getIds() {
      for (const i in this.selectTable) {
        this.ids.push(this.selectTable[i].id)
      }
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          setProcess({
            ids: this.ids,
            ...this.form
          }).then(res => {
            this.dialogVisible = false
            this.ids = []
            this.$refs.form.resetFields()
            this.$message.success(res.result.message)
            this.$emit('refresh', true)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
