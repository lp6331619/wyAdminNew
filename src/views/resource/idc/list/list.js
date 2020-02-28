export default {
  components: {
  },
  data() {
    return {
      activeName: this.$route.params.type ? this.$route.params.type : this.$route.name
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
        case 'resourceIdcIp':
          url = '/resource/idc/ip/list'
          break
        case 'resourceIdcCidr':
          url = '/resource/idc/cidr/list'
          break
        case 'resourceIdcCabinet':
          url = '/resource/idc/cabinet/list'
          break
        case 'resourceIdcDevice': case 'device':
          url = '/resource/idc/device/manage/list'
          break
      }
      this.$router.push(url)
    }
  }
}
