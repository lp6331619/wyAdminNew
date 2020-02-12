import list from '../components/list.vue'
export default {
  components: {
    list
  },
  data() {
    return {
    }
  },
  computed: {
    isDetail() {
      return this.$route.query.id ? JSON.parse(this.$route.query.id) : null
    }
  },
  created() {

  },

  methods: {

  }
}
