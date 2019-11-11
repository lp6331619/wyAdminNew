<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        权限设置
        <el-tag class="ml10" type="danger">完成权限勾选后，请点页面底部的 "保存" 按钮完成设置 ！</el-tag>
      </div>
      <div v-if="privBox.roles">
        角色选择:
        <el-select v-model="roles" filterable placeholder="请选择角色名称" @change="selectPriv">
          <el-option
            v-for="(val, key, index) in privBox.roles"
            :key="index"
            :label="val.name"
            :value="key"
          />
        </el-select>
      </div>
    </el-card>

    <div class="mt20 privList">
      <!-- 第一层 -->
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,index) in privilegeList" :key="index" :name="index">
          <template slot="title">
            <div class="title">
              <i class="el-icon-share" />
              {{ item.meta.title }}
            </div>
            <el-checkbox
              v-model="item.status"
              :indeterminate="item.indeterminate"
              class="allSelect"
              @click.stop.native
              @change="checkBox(item)"
            >全选</el-checkbox>
            <div v-if="item.actions" class="specialSelect">
              <el-checkbox-group v-model="item.checked" @change="handleCheckedCitiesChange(item)">
                <el-checkbox
                  v-for="(val,key,actionsIndex) in item.actions"
                  :key="actionsIndex"
                  :label="key"
                >{{ val.title }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
          <!-- <collapseItem :item="item" /> -->
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import privJs from './priv'
export default privJs
</script>

<style lang="scss" >
.privList {
  .specialSelect {
    margin: 5px 0 0 60px;
  }
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
    padding: 0 10px;
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
</style>
