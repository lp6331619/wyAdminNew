export default {
  components: {
  },
  data() {
    return {
      activeName: 'node',
      operatePriv: [{
        priv: 'resource:idc:device:list',
        label: '设备管理',
        name: 'resourceIdcDeviceList'
      }, {
        priv: 'resource:idc:device:type:list',
        label: '设备类型',
        name: 'resourceIdcDeviceType'
      }, {
        priv: 'resource:idc:device:spec:list',
        label: '设备规格',
        name: 'resourceIdcDeviceSpec'
      }, {
        priv: 'resource:idc:device:oem:list',
        label: '设备品牌',
        name: 'resourceIdcDeviceOem'
      }]
    }
  },
  computed: {
    type() {
      return this.$route.name
    }
  },
  created() {
    this.activeName = this.type
  },
  methods: {
    tabsClick(e) {
      let url
      switch (e.name) {
        case 'resourceIdcDeviceList':
          url = 'manage'
          break
        case 'resourceIdcDeviceType':
          url = 'type'
          break
        case 'resourceIdcDeviceSpec':
          url = 'spec'
          break
        case 'resourceIdcDeviceOem':
          url = 'oem'
          break
      }
      this.$router.push(`/resource/idc/device/${url}/list`)
    }
  }
}
