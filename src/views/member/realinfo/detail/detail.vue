<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header flex">实名认证详情</div>
      <table
        v-if="detailData.id"
        class="tableBox text-left"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="title">状态</td>
          <td>
            <span :class="statusClass(detailData.status.value)">{{ detailData.status.name }}</span>
          </td>
          <td class="title">证件类型</td>
          <td>{{ detailData.certificate.type.name }}</td>
        </tr>
        <tr>
          <td class="title">认证类型</td>
          <td>{{ detailData.type.name }}</td>
          <td class="title">证件号</td>
          <td>{{ detailData.certificate.no }}</td>
        </tr>
        <tr>
          <td class="title">{{ detailData.type.value === 1 ? "姓名" : "企业名称" }}</td>
          <td>{{ detailData.certificate.name }}</td>
          <td class="title">地址</td>
          <td>
            {{ detailData.address.province }}
            {{ detailData.address.city }}
            {{ detailData.address.area }}
            {{ detailData.address.address }}
          </td>
        </tr>
        <tr v-if="detailData.type.value === 2">
          <td class="title">企业联系人</td>
          <td>{{ detailData.managerCertificate.name }}</td>
          <td class="title">联系人身份证号码</td>
          <td>{{ detailData.managerCertificate.no }}</td>
        </tr>
        <tr>
          <td class="title">认证有效期</td>
          <td colspan="3">
            <div class="text-left">{{ detailData.certificate.expireTime }} &nbsp;</div>
          </td>
        </tr>
        <tr>
          <td class="title">证件照</td>
          <td colspan="3">
            <div v-if="detailData.certificate.files" class="flex flexStart">
              <div
                v-for="(key,index) in getKeys(detailData.certificate.files)"
                :key="index"
                class="ml20 text-center"
              >
                <img
                  :src="imgUrl + photoUrl +'?type=' +key +'&id=' +detailData.id"
                  width="250px"
                  height="150px"
                  @click="photoBox(key)"
                />
                <p>{{ detailData.certificate.files[key].typeName }}</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </el-card>
    <el-card
      v-if="detailData.canAudit"
      v-operatePriv="{priv:'user:member:realInfo_audit'}"
      class="box-card"
    >
      <div slot="header" class="header flex">实名审核</div>
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
            <td class="title">审核状态</td>
            <td>
              <el-select
                v-if="prepare"
                v-model="form.status"
                placeholder="请选择审核状态"
                @change="selectStatus"
              >
                <el-option
                  v-for="(val,key,i) in prepare.realInfoStatus"
                  :key="i"
                  :label="val"
                  :value="key"
                />
              </el-select>
            </td>
          </tr>
          <tr v-if="form.status==='OK'">
            <td class="title">认证有效期</td>
            <td>
              <el-form-item prop="expireTime">
                <el-date-picker
                  v-model="form.expireTime"
                  format="yyyy 年 MM 月 dd 日"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="title">备注</td>
            <td>
              <el-form-item v-if="form.status==='REJECT'" prop="note">
                <el-input v-model="form.note" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
              </el-form-item>
              <el-input v-else v-model="form.note" type="textarea" :rows="2" placeholder="请输入备注"></el-input>
            </td>
          </tr>
        </table>
      </el-form>
      <div class="text-center pt20">
        <el-button :disabled="loading" type="primary" @click.native.prevent="Submission">确认</el-button>
      </div>
    </el-card>
    <el-card v-operatePriv="{priv:'user:member:realInfo_audit'}" class="box-card">
      <div slot="header" class="header flex">实名日志</div>
      <el-table :loading="listLoading" :data="list" style="width: 100%">
        <el-table-column prop="opDateTime" label="操作时间"></el-table-column>
        <el-table-column prop="type.name" label="操作类型"></el-table-column>
        <el-table-column prop="opUser.summary" label="操作用户"></el-table-column>
        <el-table-column prop="realInfo.type.name" label="实名类型"></el-table-column>
        <el-table-column prop="realInfo.name" label="姓名/单位名称"></el-table-column>
        <el-table-column prop="realInfo.no" label="证件号码"></el-table-column>
        <el-table-column prop="opUser.ip" label="操作IP"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
