export default {
  components: {
  },
  data() {
    return {
      activeName: this.$route.params.type ? this.$route.params.type : this.$route.name
    }
  },
  created() {
    console.log(this.activeName, 123)
  },
  methods: {
    tabsClick(e) {
      let url
      switch (e.name) {
        case 'resourceCloudNodeList': case 'node':
          url = '/resource/cloud/node/node/list'
          break
        case 'resourceDiskType':
          url = '/resource/cloud/diskType/list'
          break
        case 'resourceCloudVersion':
          url = '/resource/cloud/version/list'
          break
        case 'resourceCloudIp':
          url = '/resource/cloud/ip/list'
          break
      }
      this.$router.push(url)
    }
  }
}
