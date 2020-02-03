<template>
  <div>
    <el-card v-if="detailData" class="box-card">
      <div slot="header" class="header flex">事业部详情</div>
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
            <td class="title">事业部ID</td>
            <td>{{ detailData.id }}</td>
          </tr>
          <tr>
            <td class="title">上级事业部</td>
            <td>
              <el-form-item v-if="prepare">
                <el-select :disabled="!editStatus" v-model="form.parent" placeholder="请选择上级事业部">
                  <el-option
                    v-for="(item,i) in prepare.depts"
                    :key="i"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="title">事业部名称</td>
            <td>
              <el-form-item prop="name">
                <el-input :disabled="!editStatus" v-model="form.name" placeholder="请输入事业部名称"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="title">展示排序</td>
            <td>
              <el-form-item>
                <el-input
                  :disabled="!editStatus"
                  v-model="form.displayOrder"
                  type="number"
                  placeholder="请输入展示排序"
                ></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div class="text-center pt20">
        <el-button v-if="!editStatus" type="primary" @click.native.prevent="editStatus=true">编辑</el-button>
        <el-button v-if="editStatus" type="primary" @click.native.prevent="Submission">提交</el-button>
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
