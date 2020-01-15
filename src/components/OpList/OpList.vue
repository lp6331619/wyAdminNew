<template>
  <div>
    <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="listData.data">
      <el-table-column prop="opDateTime" label="操作时间" width="220" />>
      <el-table-column prop="opUser.ip" label="操作IP(归属地)" width="150" />
      <el-table-column prop="opUser.summary" label="操作用户(ID)" />
      <el-table-column prop="opUser.loginName" label="登录账号" width="150" />
      <el-table-column prop="opObject" label="被操作类型" width="150" />
      <el-table-column prop="info" label="操作明细" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OpList',
  props: {
    // 初始化数据
    listData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  updated() {},
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
