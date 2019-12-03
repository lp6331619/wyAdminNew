<template>
  <div v-if="prepareData" v-clickoutside="closePrepare">
    <div class="selectBox">
      <el-input
        v-model="searchData.search"
        :placeholder="getPlaceholder"
        type="text"
        @blur="outData()"
        @focus="prepareBool=true"
      />
      <span class="strict" @click="changeStrict()">{{ searchData.strict==='0'?'模糊' :'精确' }}</span>
      <div v-if="prepareData && searchType && prepareBool">
        <ul class="prepareData">
          <li
            v-for="(name,key,index) in getPrepare()"
            :key="index"
            @click="selectData(key)"
          >{{ name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// 点击 空白处关闭弹窗
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}

export default {
  directives: { clickoutside },
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
      searchData: {
        field: '',
        search: '',
        strict: '0'
      }, // 搜索的数据
      prepareBool: false, // 下拉框状态
      prepareBox: {}, // prepareBox数据
      searchKey: '' // 选中的搜索类型
    }
  },
  computed: {
    // 获取 placeholder
    getPlaceholder() {
      let str = ''
      if (this.prepareData && this.searchName) {
        if (!this.searchKey || this.searchKey === '') {
          let lastkey
          for (const keyname in this.prepareData[this.searchType]) {
            lastkey = keyname
          }
          for (const x in this.prepareData[this.searchType]) {
            if (x !== lastkey) {
              str += this.prepareData[this.searchType][x] + '/'
            } else {
              str += this.prepareData[this.searchType][x]
            }
          }
        } else {
          str += this.prepareData[this.searchType][this.searchKey]
        }
      }
      return this.searchName + ':' + str
    }
  },
  created() {
    console.log(
      this.searchType,
      this.searchName,
      this.initData,
      this.prepareData
    )
  },
  methods: {
    // 选择搜索类型
    selectData(data) {
      this.searchKey = data === 'all' ? '' : data
      this.searchData.field = this.searchKey
      this.prepareBool = false
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
    // 搜索形式
    changeStrict() {
      this.searchData.strict = this.searchData.strict === '0' ? '1' : '0'
      this.outData()
    },
    // 关闭下拉
    closePrepare() {
      this.prepareBool = false
    },
    // 导出数据
    outData() {
      this.$emit('emitData', { data: this.searchData, type: this.searchType })
    }
  }
}
</script>

<style scoped lang="scss">
.selectBox {
  position: relative;
  .strict {
    position: absolute;
    right: 2px;
    top: 10px;
    height: 20px;
    line-height: 20px;
    border-left: 1px solid #eee;
    padding: 0 10px;
    background: #fff;
    color: #2196f3;
    font-size: 12px;
    cursor: pointer;
  }
  .prepareData {
    position: absolute;
    left: 0;
    top: 30px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    li {
      padding: 0 20px;
      line-height: 35px;
      background: #fff;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background: #f6f6f6;
      }
    }
  }
}
</style>
