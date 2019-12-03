<template>
  <div v-if="prepareData && searchData ">
    <div class="searchData">
      <template v-for="(item,index) in searchListData">
        <div :key="index" class="search-item">
          <SearchSelect
            :search-type="item.type"
            :init-data="searchData[item.type]"
            :search-name="item.typeName"
            :prepare-data="prepareData"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import SearchSelect from '@/components/SearchSelect'
export default {
  components: {
    SearchSelect
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
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {
    // console.log(this.searchData, 123)
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.searchData {
  display: flex;
}
</style>
