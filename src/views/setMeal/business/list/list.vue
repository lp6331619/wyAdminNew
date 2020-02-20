<template>
  <div>
    <div v-if="!isDetail" class="fatherBox">
      <list type="list" />
    </div>
    <div v-else class="sonBox">
      <router-view />
    </div>
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
</style>
