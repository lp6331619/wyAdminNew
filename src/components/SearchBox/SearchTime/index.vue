<template>
  <div v-if="initData && searchType">
    <div class="timeBox">
      <el-date-picker
        v-model="searchData"
        type="daterange"
        range-separator="至"
        :disabled="disabled"
        value-format="yyyy/MM/dd"
        :start-placeholder="searchName"
        :end-placeholder="searchName"
        @change="outData()"
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
    // 是否disabled
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchData: []
    }
  },
  watch: {
    initData: {
      handler(newValue, oldValue) {
        this.searchData = [
          newValue.start ? newValue.start : '',
          newValue.end ? newValue.end : ''
        ]
        newValue.start === '' && newValue.end === ''
          ? (this.searchData = [])
          : ''
      },
      deep: true
    }
  },
  mounted() {
    this.searchData =
      this.initData.start && this.initData.end
        ? [this.initData.start, this.initData.end]
        : []
  },
  methods: {
    // 导出数据
    outData(data) {
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
  width: 280px;
  .el-date-editor {
    width: 280px;
  }
}
</style>
