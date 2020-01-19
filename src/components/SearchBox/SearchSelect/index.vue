<template>
  <div v-if="prepareData && searchType">
    <div class="selectBox">
      <el-select
        v-model="searchData"
        :filterable="filterable"
        :placeholder="searchName"
        @change="selectData"
      >
        <el-option
          v-for="(item,i) in getPrepare()"
          :key="i"
          :label="item.name"
          :value="String(item.id)"
        />
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
    prepareType: {
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
    },
    filterable: {
      type: Boolean,
      default: false
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
      if (
        this.prepareData &&
        this.prepareData[
          this.prepareType ? this.prepareType : this.searchType
        ] &&
        (this.searchType || this.prepareType)
      ) {
        let box = []
        const array = JSON.parse(
          JSON.stringify(
            this.prepareData[
              this.prepareType ? this.prepareType : this.searchType
            ]
          )
        )
        // 判断是否是数组
        if (Array.isArray(array)) {
          box = array
        } else {
          for (const i in array) {
            box.push({ id: i, name: array[i] })
          }
        }
        box.unshift({ id: 'all', name: '全部' })
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
