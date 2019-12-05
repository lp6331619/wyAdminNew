<template>
  <div v-if="prepareData && searchData ">
    <div class="searchBox" :style="`height:${height}px`">
      <div ref="searchData" class="searchData">
        <template v-for="(item,index) in searchListData">
          <!--selectInput 类型-->
          <template v-if="item.mode==='SearchInput'">
            <div :key="index" class="searchInput mb10">
              <SearchInput
                :search-type="item.type"
                :init-data="searchData[item.type]"
                :search-name="item.typeName"
                :prepare-data="prepareData"
                @emitData="emitData($event)"
              />
            </div>
          </template>
          <!--select 类型-->
          <template v-if="item.mode==='SearchSelect'">
            <div :key="index" class="mr20 mb10">
              <SearchSelect
                :search-type="item.type"
                :init-data="searchData[item.type]"
                :search-name="item.typeName"
                :prepare-data="prepareData"
                @emitData="emitData($event)"
              />
            </div>
          </template>
          <!--时间段 类型-->
          <template v-if="item.mode==='SearchTime'">
            <div :key="index" class="mr20 mb10">
              <SearchTime
                :search-type="item.type"
                :init-data="searchData[item.type]"
                :search-name="item.typeName"
                :prepare-data="prepareData"
                @emitData="emitData($event)"
              />
            </div>
          </template>
          <!--值段 类型-->
          <template v-if="item.mode==='SearchRank'">
            <div :key="index" class="mr20 mb10">
              <SearchRank
                :search-type="item.type"
                :init-data="searchData[item.type]"
                :search-name="item.typeName"
                :prepare-data="prepareData"
                @emitData="emitData($event)"
              />
            </div>
          </template>
        </template>
      </div>
      <div
        class="moreBtn"
        :class="heightBool?'action':''"
        @click="more()"
      >{{ heightBool ? '关闭':'展开' }}</div>
    </div>
    <div class="text-center mt20">
      <el-button :operate-priv="-['search']" type="primary" @click="outData()">查询</el-button>
      <el-button :operate-priv="operatePriv['search']" @click="outData()">清空</el-button>
      <el-button :operate-priv="operatePriv['excel']" type="danger" @click="outData()">导出Excel</el-button>
    </div>
  </div>
</template>
<script>
import SearchInput from '@/components/SearchInput'
import SearchSelect from '@/components/SearchSelect'
import SearchTime from '@/components/SearchTime'
import SearchRank from '@/components/SearchRank'
export default {
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
    }
  },
  data() {
    return {
      height: 40,
      // height: 'auto',
      heightBool: false
    }
  },
  computed: {},
  created() {
    // console.log(this.searchData, 123)
  },
  methods: {
    emitData(e) {
      this.searchData[e.type] = e.data
    },
    more() {
      this.heightBool = !this.heightBool
      this.height = this.heightBool ? this.$refs.searchData.offsetHeight : 40
    },
    outData() {
      this.$emit('emitData', this.searchData)
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
}
.searchData {
  display: flex;
  flex-wrap: wrap;
  .searchInput {
    width: 280px;
    margin-right: 20px;
  }
}
</style>
