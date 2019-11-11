import { getPrivilegeDetail } from '@/api/system'
import { asyncRoutes } from '@/router/asyncRoutes'
import collapseItem from './collapse-item'
export default {
  components: { collapseItem },
  data() {
    return {
      privBox: {}, // 权限数据
      roles: '', // 选择的角色
      activeName: '1', // 列标识
      privilegeList: asyncRoutes // 权限列表数据
    }
  },
  created() {
    this.getData()
    this.addPrive()
  },
  methods: {
    // 获取数据
    getData() {
      getPrivilegeDetail().then(res => {
        this.privBox = res.data
        this.roles = Object.keys(this.privBox.roles)[0] // 默认选择第一个
      })
    },
    // 选择角色
    selectPriv(e) {
      console.log(e, 11)
    },

    // 递归添加状态
    addStatus(item) {
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          this.addStatus(child)
        })
      }
      this.$set(item, 'activeName', '1')
      this.$set(item, 'indeterminate', false)
      this.$set(item, 'checked', [])
      this.$set(item, 'status', false)
    },
    // 特殊权限添加
    addPrive() {
      this.privilegeList.forEach((item) => {
        this.addStatus(item)
      })
      this.privilegeList.unshift({
        meta: { title: '特殊权限' },
        status: false,
        indeterminate: false,
        checked: [],
        actions: {
          '_special:all': {
            title: '所有权限',
            priv: '_special:all'
          },
          '_special:fuzzy_search': {
            title: '模糊搜索',
            priv: '_special:fuzzy_search'
          },
          '_special:export_csv': {
            title: '导出Excel',
            priv: '_special:export_csv'
          }
        }
      })
    }
  }
}
