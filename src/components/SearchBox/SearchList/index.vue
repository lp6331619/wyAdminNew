<template>
  <div v-if="prepareData && searchData " :class="{'flexBox':maxHeight<=50}">
    <div class="searchBox" :style="`height:${height}px`">
      <div ref="searchData" class="searchData">
        <template v-for="(item,index) in searchListData">
          <!--selectInput 类型-->
          <template v-if="item.mode==='SearchInput'">
            <div :key="index" class="searchInput mb10" :style="`width:${item.width || ''}`">
              <SearchInput
                :search-type="item.type"
                :init-data="searchData[item.type]"
                :search-name="item.typeName"
                :prepare-data="prepareData"
                :disabled="item.disabled"
                @emitData="emitData($event)"
              />
            </div>
          </template>
          <!--select 类型-->
          <template v-if="item.mode==='SearchSelect'">
            <div :key="index" class="mr20 mb10" :style="`width:${item.width || ''}`">
              <SearchSelect
                :search-type="item.type"
                :prepare-type="item.prepareType"
                :init-data="searchData[item.type]"
                :search-name="item.typeName"
                :filterable="item.selectType"
                :prepare-data="prepareData"
                :disabled="item.disabled"
                :relation="searchData[item.relation]"
                @emitData="emitData($event)"
              />
            </div>
          </template>
          <!--时间段 类型-->
          <template v-if="item.mode==='SearchTime'">
            <div :key="index" class="mr20 mb10" :style="`width:${item.width || ''}`">
              <SearchTime
                :search-type="item.type"
                :init-data="searchData[item.type]"
                :search-name="item.typeName"
                :disabled="item.disabled"
                @emitData="emitData($event)"
              />
            </div>
          </template>
          <!--值段 类型-->
          <template v-if="item.mode==='SearchRank'">
            <div :key="index" class="mr20 mb10" :style="`width:${item.width || ''}`">
              <SearchRank
                :search-type="item.type"
                :init-data="searchData[item.type]"
                :search-name="item.typeName"
                :disabled="item.disabled"
                @emitData="emitData($event)"
              />
            </div>
          </template>
          <!-- input类型 -->
          <template v-if="item.mode==='Input'">
            <div :key="index" class="mr20 mb10" :style="`width:${item.width || ''}`">
              <el-input
                v-model="searchData[item.type]"
                :disabled="item.disabled"
                :placeholder="item.typeName"
              />
            </div>
          </template>
        </template>
      </div>
      <div
        v-if="maxHeight>50"
        class="moreBtn"
        :class="heightBool?'action':''"
        @click="more()"
      >{{ heightBool ? '关闭':'展开' }}</div>
    </div>
    <div class="text-center mt20" :class="{'ping':maxHeight<=50}">
      <el-button v-operatePriv="{priv:operatePriv['search']}" type="primary" @click="outData()">查询</el-button>
      <el-button v-operatePriv="{priv:operatePriv['search']}" @click="clear()">清空</el-button>
      <el-button
        v-if="exportExcel"
        v-operatePriv="{priv:operatePriv['excel']}"
        type="danger"
        @click="excelOut(exportExcel)"
      >导出Excel</el-button>
    </div>
  </div>
</template>
<script>
import SearchInput from '@/components/SearchBox/SearchInput'
import SearchSelect from '@/components/SearchBox/SearchSelect'
import SearchTime from '@/components/SearchBox/SearchTime'
import SearchRank from '@/components/SearchBox/SearchRank'
export default {
  name: 'SearchList',
  components: {
    SearchInput,
    SearchSelect,
    SearchTime,
    SearchRank
  },
  props: {
    // prepare 数据
    prepareData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 搜索列表数据  组件根据此数据渲染
    searchData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 搜索列表名字
    searchListData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 权限控制
    operatePriv: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 其余的数据
    otherData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 导出 excel
    exportExcel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      height: 40,
      heightBool: false,
      maxHeight: null
    }
  },
  computed: {},
  mounted() {
    this.maxHeight = this.$refs.searchData.offsetHeight
    console.log(this.$refs.searchData.offsetHeight, 123)
  },
  methods: {
    emitData(e) {
      this.searchData[e.type] = e.data
    },
    // 更多
    more() {
      this.heightBool = !this.heightBool
      this.height = this.heightBool ? this.maxHeight : 40
    },
    // 导出数据
    outData() {
      const data = { searchData: this.searchData, otherData: this.otherData }
      this.$emit('emitData', data)
    },
    // 清空
    clear() {
      if (this.searchData) {
        for (const i in this.searchData) {
          const type = typeof this.searchData[i]
          this.searchData[i] =
            type === 'object' ? this.objectBack(this.searchData[i]) : ''
        }
      }
      if (this.otherData) {
        for (const i in this.otherData) {
          const type = typeof this.otherData[i]
          if (type === 'object') {
            this.otherData[i] = this.objectBack(this.otherData[i])
          } else if (i === 'page') {
            this.otherData[i] = 1
          } else if (i === 'pageSize') {
            this.otherData[i] = 10
          } else {
            this.otherData[i] = ''
          }
        }
      }
      const data = { searchData: this.searchData, otherData: this.otherData }
      data.clear = true
      this.$emit('emitData', data)
    },
    // 清空 object
    objectBack(data) {
      if (data) {
        for (const i in data) {
          i !== 'strict' ? (data[i] = '') : (data[i] = '0')
        }
        return data
      }
    },
    // 导出 excel
    excelOut(url) {
      const object = Object.assign(this.searchData, this.otherData)
      this.upExcel(url + '?_csv=1', object)
    },
    upExcel(URL, PARAMS) {
      var temp = document.createElement('form')
      temp.action = process.env.VUE_APP_BASE_API + URL
      temp.method = 'post'
      temp.enctype = 'application/json'
      temp.style.display = 'none'
      for (var x in PARAMS) {
        var opt
        if (this.IsJsonString(JSON.stringify(PARAMS[x]))) {
          for (const a in PARAMS[x]) {
            const chenOpt = document.createElement('textarea')
            chenOpt.name = x + '[' + a + ']'
            chenOpt.value = PARAMS[x][a]
            temp.appendChild(chenOpt)
          }
        } else {
          opt = document.createElement('textarea')
          opt.name = x
          opt.value = PARAMS[x]
          temp.appendChild(opt)
        }
      }
      document.body.appendChild(temp)
      temp.submit()
      return temp
    },
    IsJsonString(str) {
      try {
        if (typeof JSON.parse(str) === 'object') {
          return true
        }
      } catch (e) {
        console.log(e)
      }
      return false
    }
  }
}
</script>

<style scoped lang="scss">
.searchBox {
  position: relative;
  // height: 40px;
  padding-right: 50px;
  overflow: hidden;
  transition: height 0.3s;
  -webkit-transition: height 0.3s;
  .moreBtn {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 14px;
    color: #409eff;
    padding-right: 10px;
    cursor: pointer;
    &:before {
      content: '';
      position: absolute;
      right: 2px;
      top: 3px;
      display: block;
      width: 5px;
      height: 5px;
      border: 1px solid #409eff;
      border-width: 0 1px 1px 0;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
    &.action:before {
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
      top: 7px;
    }
  }
  .searchData {
    display: flex;
    flex-wrap: wrap;
    .searchInput {
      width: 280px;
      margin-right: 20px;
    }
  }
}
.flexBox {
  display: flex;
  justify-content: flex-start;
  .searchBox {
    padding-right: 0;
  }
}
.ping {
  margin-top: 0 !important;
}
</style>
