<template>
  <div>
    <el-card v-if="detailData" class="box-card">
      <div slot="header" class="header flex">账号信息</div>
      <el-form
        ref="form"
        :model="form"
        :rules="formRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <table class="tableBox text-left" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="title">会员</td>
            <td>{{ detailData.member.name }}</td>
          </tr>
          <tr>
            <td class="title">wyId</td>
            <td>{{ detailData.wyId }}</td>
          </tr>
          <tr>
            <td class="title">状态</td>
            <td>
              <el-form-item v-if="prepare" prop="status">
                <el-select :disabled="!editStatus" v-model="form.status" placeholder="请选择审核状态">
                  <el-option
                    v-for="(val,key,i) in prepare.status"
                    :key="i"
                    :label="val"
                    :value="key"
                  />
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="title">通行证编号</td>
            <td>
              <el-form-item prop="code">
                <el-input
                  :disabled="!editStatus"
                  v-model="form.code"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入备注"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div class="text-center pt20">
        <el-button v-if="!editStatus" type="primary" @click.native.prevent="editStatus=true">编辑</el-button>
        <el-button v-if="editStatus" type="primary" @click.native.prevent="Submission">确认</el-button>
        <el-button v-if="editStatus" @click.native.prevent="editStatus=false">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
