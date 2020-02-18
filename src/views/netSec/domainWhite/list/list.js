import list from '../components/list.vue'
export default {
  components: {
    list
  },
  computed: {
    isDetail() {
      return this.$route.name === 'domainWhiteList'
    }
  }
}
