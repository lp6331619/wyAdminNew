import list from './components/list.vue'
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
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {

  },

  methods: {

  }
}
