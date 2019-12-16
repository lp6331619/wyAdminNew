<template>
  <div v-if="dataBox">
    <el-card class="box-card p0">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="备注信息" name="1" :accordion="true">
          <template slot="title" class="p20">
            备注信息
            <el-button class="ml20" type="primary" size="mini" plain>
              <i class="el-icon-circle-plus blue mr5"></i>添加
            </el-button>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>
<script>
// import { setPassword } from '@/api/member'
export default {
  name: 'RemarkCard',
  props: {
    initData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dataBox: {},
      activeNames: 0
    }
  },
  mounted() {
    this.dataBox = this.initData
  },
  methods: {
    emitOut(status) {}
  }
}
</script>

<style lang="scss">
.p0 {
  .el-card__body {
    padding: 0;
  }
  .el-collapse-item__header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: normal;
    height: 55px;
  }
}
</style>
