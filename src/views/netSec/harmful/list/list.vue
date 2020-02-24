<template>
  <div>
    <div v-if="isDetail" class="fatherBox">
      <list></list>
    </div>
    <div v-else class="sonBox">
      <router-view />
    </div>
  </div>
</template>

<script>
import list from '../components/list.vue'
export default {
  components: {
    list
  },
  computed: {
    isDetail() {
      return this.$route.name === 'harmfulList'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
