export default {
  components: {
  },
  data() {
    return {
      activeName: this.$route.name
    }
  },
  created() {
  },
  methods: {
    tabsClick(e) {
      let url
      switch (e.name) {
        case 'resourceIdcRegion':
          url = '/resource/idc/region/list'
          break
        case 'resourceDdosLine':
          url = '/resource/idc/line/list'
          break
      }
      this.$router.push(url)
    }
  }
}
