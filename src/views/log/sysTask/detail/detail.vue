<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header flex">任务详情</div>
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
          <td class="title">{{ schema.output.actionName }}</td>
          <td>{{ detailData.actionName }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.resInfo.moduleName }}</td>
          <td>{{ detailData.resInfo?detailData.resInfo.moduleName:'' }}</td>
          <td class="title">{{ schema.output.resInfo.typeName }}</td>
          <td>{{ detailData.resInfo?detailData.resInfo.typeName:'' }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.resInfo.id }}</td>
          <td>{{ detailData.resInfo?detailData.resInfo.id:'' }}</td>
          <td class="title">{{ schema.output.resInfo.name }}</td>
          <td>{{ detailData.resInfo?detailData.resInfo.name:'' }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.status.name }}</td>
          <td>{{ detailData.status?detailData.status.name:'' }}</td>
          <td class="title">{{ schema.output.summary }}</td>
          <td>{{ detailData.summary }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.startDateTime }}</td>
          <td>{{ detailData.startDateTime }}</td>
          <td class="title">{{ schema.output.endDateTime }}</td>
          <td>{{ detailData.endDateTime }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.opUser.summary }}</td>
          <td>{{ detailData.opUser?detailData.opUser.summary:'' }}</td>
          <td class="title">{{ schema.output.opUser.ip }}</td>
          <td>{{ detailData.opUser?detailData.opUser.ip:'' }}</td>
        </tr>
        <tr>
          <td class="title">{{ schema.output.failCount }}</td>
          <td colspan="3">{{ detailData.failCount }}</td>
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
