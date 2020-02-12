<template>
  <div>
    <el-card class="box-card pt0">
      <div slot="header" class="header flex">{{ edit?'编辑新闻':'新闻详情' }}</div>
      <comDetail
        v-if="dataBox"
        :init-data="dataBox"
        :scene="edit?'edit':'detail'"
        :prepare="prepare"
        :operate-priv="{edit:'site:article:update'}"
        @outData="outData"
        @cancel="getData"
      ></comDetail>
    </el-card>
  </div>
</template>

<script>
import detailJs from './detail'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
