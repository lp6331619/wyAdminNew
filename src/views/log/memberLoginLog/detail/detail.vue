<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header flex">会员登录日志详情</div>
      <table
        v-if="detailData && schema.output"
        class="tableBox text-left"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="title">{{ schema.output.id }}</td>
          <td>{{ detailData.id }}</td>
          <td class="title">{{ schema.output.memberId }}</td>
          <td>{{ detailData.memberId }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.memberName }}</td>
          <td>{{ detailData.memberName }}</td>
          <td class="title">{{ schema.output.loginName }}</td>
          <td>{{ detailData.loginName }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.loginIp }}</td>
          <td>{{ detailData.loginIp }}</td>
          <td class="title">{{ schema.output.loginDateTime }}</td>
          <td>{{ detailData.loginDateTime }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.orgUserId }}</td>
          <td>{{ detailData.orgUserId }}</td>
          <td class="title">{{ schema.output.orgUserName }}</td>
          <td>{{ detailData.orgUserName }}</td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
