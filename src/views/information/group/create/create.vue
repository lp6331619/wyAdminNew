<template>
  <div>
    <el-card class="box-card pt0">
      <div slot="header" class="header flex">创建新闻</div>
      <comDetail
        :prepare="prepare"
        :scene="'create'"
        :operate-priv="{edit:'site:article:create'}"
        @outData="outData"
      ></comDetail>
    </el-card>
  </div>
</template>

<script>
import createJs from './create'
export default createJs
</script>

<style lang="scss" scoped>
</style>
