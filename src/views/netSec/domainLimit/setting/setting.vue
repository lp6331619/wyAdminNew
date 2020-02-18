<template>
  <div>
    <el-card class="box-card">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="产品类型" align="center" prop="text.name">
        </el-table-column>
        <el-table-column label="域名限制数" align="center" prop="text.value">
          <template slot-scope="scope">
            <div v-if="editIndex === scope.$index">
              <el-input v-model="value" :style="{width: '130px'}" placeholder="请输入域名限制数"></el-input>
              <i class="el-icon-check mr10 setting-icon" @click="onSave"></i>
              <i class="el-icon-close mr10 setting-icon" @click="onCancel"></i>
            </div>
            <span v-else>
              {{ scope.row.text.value }}
              <i class="el-icon-edit ml10 setting-icon" @click="onEdit(scope.$index, scope.row.text.value, scope.row.value)"></i>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getGlobalList, globalUpdate } from '@/api/netSec'

export default {
  data() {
    return {
      editIndex: '',
      value: '',
      tableData: [],
      item: '',
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getGlobalList().then(res => {
        this.loading = false
        this.tableData = this.common.FilterArray(res.data)
      })
    },
    update() {
      globalUpdate({
        item: this.item,
        value: this.value
      }).then(res => {
        this.$message.success(res.result.message)
        this.editIndex = ''
        this.getList()
      })
    },
    onEdit(index, val, item) {
      this.value = val
      this.editIndex = index
      this.item = item
    },
    onCancel() {
      this.editIndex = ''
    },
    onSave() {
      if (this.value === '') {
        this.$message.warning('请输入域名限制数')
        return
      }
      this.update()
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-icon{
  font-size: 22px;
  cursor: pointer;
}
</style>
