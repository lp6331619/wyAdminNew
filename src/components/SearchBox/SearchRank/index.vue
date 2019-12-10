<template>
  <div v-if="initData && searchType">
    <div class="rankBox">
      <!-- eslint-disable-next-line-->
      <input v-model="searchData.start" :keyup="outData()" :placeholder="searchName" type="number" />
      <span>至</span>
      <!-- eslint-disable-next-line-->
      <input v-model="searchData.end" :keyup="outData()" :placeholder="searchName" type="number" />
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
    }
  },
  data() {
    return {
      // 搜索的数据
      searchData: {
        start: '',
        end: ''
      }
    }
  },
  mounted() {
    this.searchData = this.initData
  },
  methods: {
    // 导出数据
    outData() {
      this.$emit('emitData', {
        data: this.searchData,
        type: this.searchType
      })
    }
  }
}
</script>

<style scoped lang="scss">
.rankBox {
  display: flex;
  width: 250px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  line-height: 40px;
  height: 40px;
  padding: 5px;
  span,
  input {
    height: 100%;
    margin: 0;
    text-align: center;
    display: inline-block;
    font-size: 14px;
  }
  span {
    padding: 0 5px;
    line-height: 32px;
    width: 10%;
    color: #303133;
  }
  input {
    border: none;
    outline: 0;
    padding: 0;
    width: 45%;
    color: #606266;
  }
  input::-webkit-input-placeholder {
    color: #cbcbcb;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #cbcbcb;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #cbcbcb;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #cbcbcb;
  }
}
</style>
