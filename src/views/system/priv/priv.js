import { getPrivilegeDetail, setPriv } from '@/api/system'
import { asyncRoutes } from '@/router/asyncRoutes'
import collapseItem from './collapse-item'
export default {
  components: { collapseItem },
  data() {
    return {
      privBoxAll: {}, // 所有权限数据
      privBox: {}, // 现在角色权限数据
      roles: '', // 选择的角色
      activeName: '1', // 列标识
      privilegeList: asyncRoutes, // 权限列表数据
      loading: this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      }),
      privBoxSubmit: []// 要提交的权限
    }
  },
  created() {
    this.addPrive()
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      getPrivilegeDetail().then(res => {
        this.privBoxAll = res.data
        this.$nextTick(() => {
          this.roles = this.roles ? this.roles : Object.keys(this.privBoxAll.roles)[0] // 默认选择第一个
          this.selectPriv(this.roles)
          this.privBoxSubmit = []
          this.loading.close()
        })
      })
    },
    // 选择角色
    selectPriv(e) {
      this.privBox = this.privBoxAll.privileges[e] ? this.privBoxAll.privileges[e] : {}
      this.privilegeList.forEach((item) => {
        this.ergodicPermission(item)
      })
    },
    // 递归遍历权限
    ergodicPermission(item) {
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          this.ergodicPermission(child)
        })
      }
      item.actions ? this.assignment(item) : ''
      if (item.tabs) {
        if (item.tabs.child) {
          item.tabs.child.forEach(tab => {
            this.assignment(tab)
          })
        }
      }
    },
    // 根据权限赋值
    assignment(item) {
      const actions = this.arrayPriv(item.actions)
      item.checked = actions.filter(action => this.privBox[action])
      item.indeterminate = item.checked.length > 0 && item.checked.length !== actions.length
      item.status = item.checked.length === actions.length
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
      if (item.tabs) {
        this.$set(item.tabs, 'indeterminate', false)
        this.$set(item.tabs, 'checked', [])
        this.$set(item.tabs, 'status', false)
        if (item.tabs.child) {
          item.tabs.child.forEach(tab => {
            this.$set(tab, 'indeterminate', false)
            this.$set(tab, 'checked', [])
            this.$set(tab, 'status', false)
          })
        }
      }
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
    },
    // 返回第一级状态
    backStatus(item) {
      if (item.children) {
        const childLength = item.children.filter(tab => !tab.hidden).length
        const objIndeterminate = item.children.filter(tab => !tab.hidden && tab.indeterminate)
        const objStatus = item.children.filter(tab => !tab.hidden && tab.status)
        item.indeterminate =
          (objStatus.length > 0 && objStatus.length !== childLength) ||
          (objIndeterminate.length > 0 &&
            objIndeterminate.length !== childLength)
        item.status = objStatus.length === childLength
      }
    },
    // 权限数组组成
    arrayPriv(item) {
      if (item) {
        const arr = []
        for (const i in item) {
          !item[i].hidden ? arr.push(item[i].priv) : ''
        }
        return arr
      }
    },
    // 获取权限提交
    subimt() {
      this.privilegeList.forEach(item => {
        this.getPriv(item)
      })
      const priv = this.distinct(this.privBoxSubmit)
      const privData = { privileges: {} }
      privData.privileges[this.roles] = priv
      setPriv(privData).then(res => {
        this.$message.success(res.result.message)
        this.getData()
      })
    },
    // 获取所选权限
    getPriv(item) {
      if (item.children) {
        item.children.forEach(child => {
          this.getPriv(child)
        })
      }
      // 获取第一级的权限
      item.priv && (item.status || item.indeterminate) ? this.privBoxSubmit.push(item.priv) : ''
      item.actions && (item.status || item.indeterminate) ? this.privBoxSubmit.push(...item.checked) : ''
      if (item.tabs && (item.status || item.indeterminate)) {
        item.tabs.child.forEach(tab => {
          tab.status || tab.indeterminate ? this.privBoxSubmit.push(...tab.checked) : ''
        })
      }
    },
    // 去重
    distinct(a) {
      const arr = a || []
      const result = []
      const obj = {}
      for (const i of arr) {
        if (!obj[i]) {
          result.push(i)
          obj[i] = 1
        }
      }
      return result
    }
  }
}
