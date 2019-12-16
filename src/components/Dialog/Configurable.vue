<template>
  <div v-if="dataBox && dataBox.display">
    <el-dialog
      :title="dataBox.title"
      :visible.sync="dataBox.display"
      :width="dataBox.width"
      append-to-body
    >
      <div v-if="dataBox.tip" class="el-message el-message--warning tip mb20">
        <p class="el-message__content">
          <strong>{{ dataBox.tip }}</strong>
        </p>
      </div>
      <el-form :model="dataBox.form">
        <el-form-item
          v-for="(item,index) in dataBox.typeData"
          :key="index"
          :label="item.title+':'"
          :label-width="dataBox.formLabelWidth"
        >
          <el-select
            v-if="item.type === 'select' && dataBox.prepare"
            v-model="dataBox.form[item.name]"
            style="width:100%"
            :placeholder="item.itemName"
          >
            <el-option
              v-for="(val,key,i) in dataBox.prepare[item.name]"
              :key="i"
              :label="val"
              :value="key"
            />
          </el-select>
          <el-select
            v-if="item.type==='inputSelect'"
            v-model="dataBox.form[item.name]"
            filterable
            remote
            style="width:100%"
            reserve-keyword
            :placeholder="item.itemName"
            :remote-method="remoteMethod"
          >
            <el-option v-for="(val,key,i) in list" :key="i" :label="val" :value="key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="emitOut('close')">取 消</el-button>
        <el-button type="primary" @click="emitOut('right')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
      list: {}
    }
  },
  mounted() {
    this.dataBox = this.initData
    // 当有inputSelect 时
    let isLIst = ''
    isLIst = this.dataBox.typeData.findIndex(
      item => item.type === 'inputSelect'
    )
    isLIst > -1 ? (this.list = this.dataBox.prepare[this.dataBox.type]) : ''
  },
  methods: {
    emitOut(status) {
      this.dataBox.display = false
      status === 'right' ? this.$emit('emitOut', this.dataBox) : ''
    },
    remoteMethod(key) {
      this.list = {}
      const list = this.dataBox.prepare[this.dataBox.type]
      for (const i in list) {
        list[i].indexOf(key) > -1 ? (this.list[i] = list[i]) : ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-dialog__body {
  padding-top: 10px;
}
</style>
