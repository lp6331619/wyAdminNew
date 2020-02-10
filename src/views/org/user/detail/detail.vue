<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header flex">
        实名认证详情
        <div>
          <el-button
            v-operatePriv="{priv:'org.user:set_seccode'}"
            type="primary"
            @click="setCode"
          >设置二次密码</el-button>
          <el-button
            v-operatePriv="{priv:'user:member:admin_login'}"
            type="primary"
            @click="toLogin"
          >登录</el-button>
        </div>
      </div>
      <table
        v-if="detailData.id"
        class="tableBox text-left"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="title">部门名称</td>
          <td>{{ detailData.dept?detailData.dept.name:'' }}</td>
          <td class="title">邮箱</td>
          <td>{{ detailData.email }}</td>
        </tr>
        <tr>
          <td class="title">员工ID</td>
          <td>{{ detailData.id }}</td>
          <td class="title">手机</td>
          <td>{{ detailData.mobile }}</td>
        </tr>
        <tr>
          <td class="title">姓名</td>
          <td>{{ detailData.name }}</td>
          <td class="title">QQ</td>
          <td>{{ detailData.qq }}</td>
        </tr>
        <tr>
          <td class="title">微信</td>
          <td>{{ detailData.weixin }}</td>
          <td class="title">角色</td>
          <td>{{ detailData.qq }}</td>
        </tr>
        <tr>
          <td class="title">状态</td>
          <td>{{ detailData.status?detailData.status.name :'' }}</td>
          <td class="title">添加时间</td>
          <td>{{ detailData.stat?detailData.stat.updateDateTime :'' }}</td>
        </tr>
        <tr>
          <td class="title">更新时间</td>
          <td>{{ detailData.stat?detailData.stat.updateDateTime :'' }}</td>
          <td class="title"></td>
          <td></td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
