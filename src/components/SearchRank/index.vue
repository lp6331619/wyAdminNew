<template>
  <div v-if="prepareData && searchType">
    <div class="rankBox">
      <input
        v-model="searchData[0]"
        :keyup="outData()"
        :placeholder="`${searchName}开始`"
        type="number"
      />
      <span>至</span>
      <!-- eslint-disable-line [vue/html-self-closing]-->
      <input
        v-model="searchData[1]"
        :keyup="outData()"
        :placeholder="`${searchName}结束`"
        type="number"
      />
      <!-- eslint-disable-line [vue/html-self-closing]-->
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
