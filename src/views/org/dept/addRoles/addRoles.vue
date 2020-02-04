<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header flex">新增角色</div>
      <UpdateRoles :id="userId" type="dept" />
    </el-card>
  </div>
</template>

<script>
import addRolesJs from './addRoles.js'
export default addRolesJs
</script>

<style lang="scss" scoped>
</style>
