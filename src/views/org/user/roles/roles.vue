<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header flex">角色更新</div>
      <UpdateRoles :id="userId" type="user" />
    </el-card>
  </div>
</template>

<script>
import rolesJs from './roles.js'
export default rolesJs
</script>

<style lang="scss" scoped>
</style>
