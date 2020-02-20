export default {
  components: {
  },
  data() {
    return {
      activeName: 'node'
    }
  },
  computed: {
    type() {
      return this.$route.params ? this.$route.params.type : ''
    }
  },
  created() {
    this.activeName = this.type
  },
  methods: {
    tabsClick(e) {
      this.$router.push(`/resource/cloud/${e.name === 'node' ? 'node/node' : e.name}/list`)
    }
  }
}
