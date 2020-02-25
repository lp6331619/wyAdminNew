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
        case 'resourceIdcLine':
          url = '/resource/idc/line/list'
          break
        case 'resourceIdcRoom':
          url = '/resource/idc/room/list'
          break
        case 'resourceIdcIpzone':
          url = '/resource/idc/ipzone/list'
          break
      }
      this.$router.push(url)
    }
  }
}
