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
      return this.$route.query.detail ? this.$route.query.detail : 'node'
    }
  },
  created() {
    console.log(this.type)
    this.activeName = this.type
  },
  methods: {
    tabsClick(e) {
      this.$router.push(`/resource/cloud/node/${e.name}/list?detail=${e.name}`)
    }
  }
}
