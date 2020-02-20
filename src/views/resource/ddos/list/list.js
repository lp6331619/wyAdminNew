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
        case 'resourceDdosRegion':
          url = '/resource/ddos/region/list'
          break
        case 'resourceDdosLine':
          url = '/resource/ddos/line/list'
          break
        case 'resourceDdosIp':
          url = '/resource/ddos/ip/list'
      }
      this.$router.push(url)
    }
  }
}
