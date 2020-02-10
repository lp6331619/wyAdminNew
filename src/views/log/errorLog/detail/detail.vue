<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header flex">员工登录日志详情</div>
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
          <td class="title">{{ schema.output.dateTime }}</td>
          <td>{{ detailData.dateTime }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.updateDateTime }}</td>
          <td>{{ detailData.updateDateTime }}</td>
          <td class="title">{{ schema.output.category }}</td>
          <td>{{ detailData.category }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.status[':title'] }}</td>
          <td>{{ detailData.status?detailData.status.name:'暂无' }}</td>
          <td class="title">{{ schema.output.message }}</td>
          <td>{{ detailData.message }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.context }}</td>
          <td colspan="3">{{ detailData.context }}</td>
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
