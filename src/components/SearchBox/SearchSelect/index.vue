<template>
  <div v-if="prepareData && searchType">
    <div class="selectBox">
      <el-select v-model="searchData" :placeholder="searchName" @change="selectData">
        <el-option v-for="(key,val,i) in getPrepare()" :key="i" :label="key" :value="val" />
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchType: {
      type: String,
      default: ''
    },
    initData: {
      type: String,
      default: ''
    },
    searchName: {
      type: String,
      default: ''
    },
    prepareData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      searchData: '', // 搜索的数据
      prepareBox: {} // prepareBox数据
    }
  },
  watch: {
    initData: {
      handler(newValue, oldValue) {
        this.searchData = newValue
      },
      deep: true
    }
  },
  beforeUpdate() {
    this.searchData = this.initData
  },
  methods: {
    // 选择搜索类型
    selectData(data) {
      data === 'all' ? (this.searchData = '') : ''
      this.outData()
    },
    // 获取 prepare
    getPrepare() {
      if (this.prepareData && this.searchType) {
        const box = Object.assign(
          {
            all: '全部'
          },
          this.prepareData[this.searchType]
        )
        return box
      } else {
        return {}
      }
    },
    // 导出数据
    outData() {
      this.$emit('emitData', { data: this.searchData, type: this.searchType })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
