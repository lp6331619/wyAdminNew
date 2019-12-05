<template>
  <div v-if="prepareData && searchType">
    <div class="timeBox">
      <el-date-picker
        v-model="searchData"
        type="daterange"
        range-separator="至"
        value-format="yyyy/MM/dd"
        :start-placeholder="`${searchName}开始`"
        :end-placeholder="`${searchName}结束`"
        @change="outData"
      />
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
      type: Object,
      default: () => {
        return {}
      }
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
      // 搜索的数据
      searchData: [],
      prepareBox: {} // prepareBox数据
    }
  },
  computed: {},
  mounted() {
    this.searchData[0] = this.initData.start
    this.searchData[1] = this.initData.end
    console.log(
      this.searchType,
      this.searchName,
      this.initData,
      this.prepareData
    )
  },
  methods: {
    // 导出数据
    outData() {
      if (this.searchData.length > 1) {
        this.$emit('emitData', {
          data: { start: this.searchData[0], end: this.searchData[1] },
          type: this.searchType
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.timeBox {
  width: 350px;
}
</style>
