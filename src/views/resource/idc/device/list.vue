<template>
  <div>
    <div class="fatherBox">
      <el-card class="box-card">
        <div class="flex">
          <el-tabs v-model="activeName" tab-position="left" @tab-click="tabsClick">
            <el-tab-pane
              v-for="(item,i) in operatePriv"
              :key="i"
              v-operatePriv="{priv:item.priv}"
              :label="item.label"
              :name="item.name"
            ></el-tab-pane>
          </el-tabs>
          <div class="w100">
            <router-view />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
.flex {
  justify-content: flex-start;
}
.el-tabs {
  width: 120px;
}
.w100 {
  width: 100%;
}
</style>
