import { SearchList } from '@/components/SearchBox'
import list from './components/list.vue'
export default {
  components: {
    SearchList, // 搜索
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
