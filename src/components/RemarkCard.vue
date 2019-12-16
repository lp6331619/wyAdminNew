<template>
  <div v-if="dataBox">
    <el-card class="box-card p0">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="备注信息" name="1">
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
  name: 'Configurable',
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
    emitOut(status) {
      status === 'right' ? this.setPass() : (this.dataBox.display = false)
    },
    handleChange(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.el-card__body {
  padding: 0;
}
</style>
