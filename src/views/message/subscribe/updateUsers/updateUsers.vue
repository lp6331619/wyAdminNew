<template>
  <div>
    <el-card class="box-card">
      <div v-loading="loading" element-loading-text="拼命加载中" class="box">
        <div class="title">现有的分组用户</div>
        <ul v-if="detailData && detailData.groupUser.length" class="userList">
          <li v-for="(item,i) in detailData.groupUser" :key="i" class="item">{{ item.user.name }}</li>
        </ul>
        <div v-else class="tip text-center">暂无数据</div>
      </div>
      <div v-loading="loading" element-loading-text="拼命加载中" class="box mt20">
        <div class="title">请选择新增用户</div>
        <el-checkbox-group v-if="prepare" v-model="checkList" class="p20">
          <el-checkbox v-for="(item,i) in prepare.user" :key="i" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="mt20 text-center">
        <el-button :loading="loading" type="primary" @click="submit">提交</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import updateUsersJs from './updateUsers'
export default updateUsersJs
</script>
<style lang="scss" scoped>
.userList {
  font-size: 14px;
  line-height: 20px;
  margin: 10px;
  border: 1px solid #ddd;
  li {
    border-top: 1px solid #ddd;
    &:first-child {
      border: none;
    }
  }
}
.box {
  border: 1px solid #ddd;
  .title {
    padding: 0 15px;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
  }
  .el-checkbox-group {
    .el-checkbox {
      margin: 5px;
    }
  }
}
.item {
  padding: 10px 20px;
}
.tip {
  padding: 40px;
}
</style>
