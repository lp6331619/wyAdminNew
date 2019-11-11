<template>
  <div>12222</div>
</template>

<script>
export default {
  props: {
    // item: Object
  },
  data() {
    return {}
  },
  created() {
    // console.log(this.item, 111)
  },
  methods: {
    // 第一级全选选择
    checkBox(item) {
      item.checked = item.status ? Object.keys(item.actions) : []
    },
    // 二级选择
    handleCheckedCitiesChange(item) {
      const length = item.checked.length
      const actions = Object.keys(item.actions)
      item.status = item.checked.length === actions.length
      item.indeterminate = length > 0 && length < actions.length
    }
  }
}
</script>

<style lang="scss" >
</style>
