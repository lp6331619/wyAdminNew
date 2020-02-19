<template>
  <div>
    <el-card class="box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="(item, index) in prepareData"
          :key="index"
          :label="item.text"
          :name="item.value"
          :lazy="true"
        >
          <editTable :pid="item.value"></editTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getCateList } from '@/api/netSec'
import editTable from './components/editTable/editTable'
export default {
  components: { editTable },
  data() {
    return {
      prepareData: null,
      activeName: ''
    }
  },
  created() {
    this.getPrepare()
  },
  methods: {
    getPrepare() {
      getCateList({}, 'prepare').then(res => {
        const data = res.data || {}
        delete data.SPREAD
        delete data.ONLINE_PART
        delete data.INFO_MODEL
        this.prepareData = this.common.FilterArray(data)
        this.activeName = this.prepareData[0].value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
