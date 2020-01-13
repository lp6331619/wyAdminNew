<template>
  <div>
    <el-card v-if="detailData" class="box-card">
      <div slot="header" class="header flex">会员等级</div>123123
      <div class="text-center pt20">
        <el-button type="primary" @click.native.prevent="Submission">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
