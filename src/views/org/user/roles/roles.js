
import { UpdateRoles } from '../../components'
export default {
  name: 'Roles',
  components: {
    UpdateRoles
  },
  data() {
    return {
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {

  },
  methods: {

  }
}
