<template>
  <div>
    <el-button type="primary" :disabled="selectTable.length === 0" @click="onShowDialog()">批量审核</el-button>
    <el-dialog title="批量审核" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option v-for="item in status" :key="item.key" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备案单位">
          <el-checkbox-group v-model="form.companys">
            <el-checkbox v-for="item in companys" :key="item.key" :label="item.text" name="companys"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note" type="textarea"></el-input>
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
import { savaStatus } from '@/api/netSec'
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
      ids: [],
      status: [],
      companys: [],
      dialogVisible: false,
      form: {
        status: '',
        companys: [],
        note: ''
      },
      rules: {
        status: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onShowDialog() {
      this.dialogVisible = true
      this.getPrepareData()
    },
    getPrepareData() {
      savaStatus({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.status = this.FilterArray(res.data.auditStatus)
          this.companys = this.FilterArray(res.data.companys)
        }
      })
    },
    getSelIds() {
      this.selectTable.forEach(item => {
        if (item.auditStatus.key !== 'INVALID' && item.auditStatus.key !== 'FOUL' && item.auditStatus.key !== 'NO_ICP') {
          this.ids.push(item.id)
        }
      })
    },
    getCompanysIds() {
      const ids = []
      for (const i in this.companys) {
        if (this.form.companys.indexOf(this.companys[i].text) !== -1) {
          ids.push(this.companys[i].value)
        }
      }
      return ids
    },
    submitForm() {
      this.getSelIds()
      const companysIds = this.getCompanysIds()
      this.$refs.form.validate((valid) => {
        if (valid) {
          savaStatus({
            ids: this.ids,
            auditStatus: this.form.status,
            companys: companysIds,
            note: this.form.note
          }).then(res => {
            this.dialogVisible = false
            this.ids = []
            this.$refs.form.resetFields()
            this.$message.success(res.result.message)
            this.$emit('refresh', true)
          })
        }
      })
    },
    // 转换数组
    FilterArray(data) {
      if (data) {
        const box = []
        for (const i in data) {
          box.push({
            text: data[i],
            value: i,
            key: i
          })
        }
        return box
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
