<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" label-width="80px">
        <el-form-item label="产品类型">
          {{ queryData.typeName }}
        </el-form-item>
        <el-form-item label="产品编号">
          {{ queryData.no }}
        </el-form-item>
        <el-form-item label="会员姓名">
          {{ getUserName() }}
        </el-form-item>
        <el-form-item label="关联IP">
          {{ getIpsStr() }}
        </el-form-item>
        <el-form-item label="限制数量">
          <el-input-number v-model="queryData.domainLimitNums" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="已提交数">
          {{ queryData.domainNums }}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateNum } from '@/api/netSec'
export default {
  data() {
    return {
      id: '',
      queryData: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.queryData = this.$route.query
  },
  methods: {
    getUserName() {
      if (this.queryData.member) {
        const member = JSON.parse(this.queryData.member)
        return `${member.id} ${member.realInfoName}`
      }
    },
    getIpsStr() {
      return !!this.queryData.ips && typeof this.queryData.ips !== 'string' ? this.queryData.ips.length > 0 ? this.queryData.ips.join('，') : '--' : '--'
    },
    onSubmit() {
      if (this.queryData.domainLimitNums == null) {
        this.$message.warning('请输入限制数量')
        return
      }
      updateNum({
        no: this.queryData.no,
        value: this.queryData.domainLimitNums
      }).then(res => {
        this.$message.success(res.result.message)
        this.$router.push({
          path: '/netSec/domainLimitList'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
