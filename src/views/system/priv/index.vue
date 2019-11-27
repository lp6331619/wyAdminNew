<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        权限设置
        <el-tag class="ml10" type="danger">完成权限勾选后，请点页面底部的 "保存" 按钮完成设置 ！</el-tag>
      </div>
      <div v-if="privBoxAll.roles">
        角色选择:
        <el-select v-model="roles" filterable placeholder="请选择角色名称" @change="selectPriv">
          <el-option
            v-for="(val, key, index) in privBoxAll.roles"
            :key="index"
            :label="val.name"
            :value="key"
          />
        </el-select>
      </div>
    </el-card>

    <div class="mt20 privList">
      <template>
        <!-- 第一层 -->
        <el-collapse v-model="activeName" accordion>
          <div v-for="(item,index) in privilegeList" :key="index" :status="index">
            <collapseItem :item="item" :index="index" :level="1" @statusMonitor="backStatus" />
          </div>
        </el-collapse>
      </template>
    </div>
    <div class="text-center mt20">
      <el-button type="primary" @click="subimt()">提交</el-button>
    </div>
  </div>
</template>

<script>
import privJs from './priv'
export default privJs
</script>

<style lang="scss" >
.privList {
  .el-collapse {
    border: none;
  }
  .el-collapse-item {
    background: #fff;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    -webkit-transition: 0.3s;
    transition: 0.3s;
    .el-collapse-item__header {
      border-bottom: 1px solid #eee;
      height: 53px;
      line-height: 53px;
      .title {
        i {
          font-size: 20px;
          margin-right: 10px;
        }
        width: 300px;
      }
      .allSelect {
        position: relative;
        z-index: 100;
      }
    }
    .el-collapse-item__header {
      padding: 0 20px;
    }
    &.is-active {
      margin: 10px 0;
    }
  }
  .el-collapse-item__content {
    padding: 0;
  }
  .childBox {
    .el-collapse {
      border: 1px solid #eee;
      border-width: 1px 0;
    }
    .el-collapse-item {
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    .el-collapse-item__header {
      &.is-active {
        margin: 0;
      }
    }
  }
}
.text-center {
  text-align: center;
}
</style>
