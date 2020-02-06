<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="header flex">
        实名认证详情
        <div>
          <el-button
            v-if="!detailData.realInfo"
            v-operatePriv="{priv:'user:member:apply_realinfo'}"
            type="primary"
            size="mini"
            @click="toAuthentication"
          >申请实名</el-button>
          <el-button
            v-if="detailData.realInfo && detailData.realInfo.id"
            v-operatePriv="{priv:'user:member:realInfo_update'}"
            type="primary"
            size="mini"
            @click="toAuthentication"
          >修改实名信息</el-button>
        </div>
      </div>
      <table
        v-if="detailData.realInfo"
        class="tableBox text-left"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="title">状态</td>
          <td>
            <span
              :class="statusClass(detailData.realInfo.status.value)"
            >{{ detailData.realInfo.status.name }}</span>
          </td>
          <td class="title">证件类型</td>
          <td>{{ detailData.realInfo.certificate.type.name }}</td>
        </tr>
        <tr>
          <td class="title">认证类型</td>
          <td>{{ detailData.realInfo.type.name }}</td>
          <td class="title">证件号</td>
          <td>{{ detailData.realInfo.certificate.no }}</td>
        </tr>
        <tr>
          <td class="title">{{ detailData.realInfo.type.value === 1 ? "姓名" : "企业名称" }}</td>
          <td>{{ detailData.realInfo.certificate.name }}</td>
          <td class="title">地址</td>
          <td>
            {{ detailData.realInfo.address.province }}
            {{ detailData.realInfo.address.city }}
            {{ detailData.realInfo.address.area }}
            {{ detailData.realInfo.address.address }}
          </td>
        </tr>
        <tr v-if="detailData.realInfo.type.value === 2">
          <td class="title">企业联系人</td>
          <td>{{ detailData.realInfo.managerCertificate.name }}</td>
          <td class="title">联系人身份证号码</td>
          <td>{{ detailData.realInfo.managerCertificate.no }}</td>
        </tr>
        <tr>
          <td class="title">认证有效期</td>
          <td colspan="3">
            <div class="text-left">{{ detailData.realInfo.certificate.expireTime }} &nbsp;</div>
          </td>
        </tr>
        <tr>
          <td class="title">证件照</td>
          <td colspan="3">
            <div v-if="detailData.realInfo.certificate.files" class="flex flexStart">
              <div
                v-for="(key,index) in getKeys(detailData.realInfo.certificate.files)"
                :key="index"
                class="ml20 text-center"
              >
                <img
                  :src="imgUrl + photoUrl +'?type=' +key +'&id=' +detailData.realInfo.id"
                  width="250px"
                  height="150px"
                  @click="photoBox(key)"
                />
                <p>{{ detailData.realInfo.certificate.files[key].typeName }}</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </el-card>
    <el-card
      v-if="detailData.realInfo && detailData.realInfo.canAudit"
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
      <div slot="header" class="header flex">实名记录</div>
      <el-table :loading="listLoading" :data="list" style="width: 100%">
        <el-table-column prop="auditInfo.auditTime" label="审核时间"></el-table-column>
        <el-table-column prop="auditInfo.auditUser" label="审核人"></el-table-column>
        <el-table-column prop="type.name" label="类型"></el-table-column>
        <el-table-column prop="status.name" label="状态"></el-table-column>
        <el-table-column prop="certificate.type.name" label="认证类型"></el-table-column>
        <el-table-column prop="certificate.name" label="姓名/企业姓名"></el-table-column>
        <el-table-column prop="certificate.type.name" label="证件类型"></el-table-column>
        <el-table-column prop="certificate.no" label="证件号"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { realInfoMemberDetail, realInfoList, realInfoAudit } from '@/api/member'
export default {
  name: 'RealName',
  components: {},
  data() {
    return {
      detailData: {},
      list: [],
      prepare: {},
      loading: true,
      form: {
        note: '',
        status: '',
        expireTime: ''
      },
      formRules: {
        expireTime: [{ required: true, message: '不能为空!' }],
        note: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      listLoading: false,
      photoUrl: '/user/member/getRealInfoPicture'
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      realInfoMemberDetail({ memberId: this.userId }, 'withSchema').then(
        res => {
          if (res.result.isSuccess) {
            this.detailData = res.data
          }
        }
      )
      realInfoList(
        { member: { field: 'id', search: this.userId, strict: '0' } },
        'withSchema'
      ).then(res => {
        if (res.result.isSuccess) {
          this.list = res.data
          this.listLoading = false
        }
      })
      realInfoAudit({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    // 根据状态颜色选取不同的类名
    statusClass(status) {
      if (status === '2') {
        return 'remind'
      } else if (status === '1') {
        return 'adopt'
      } else {
        return 'proh'
      }
    },
    // 获取属性值的方法
    getKeys(item) {
      if (typeof item !== 'undefined') {
        return Object.keys(item)
      }
    },
    // 打开图片
    photoBox(key) {
      this.$alert(
        `<img style="max-width:100%;max-height:100%" src="${this.imgUrl}${this.photoUrl}?type= ${key}&id=${this.detailData.realInfo.id}" /><p>${this.detailData.realInfo.certificate.files[key].typeName}</p> `,
        '',
        {
          dangerouslyUseHTMLString: true,
          center: true,
          showConfirmButton: false,
          closeOnClickModal: true,
          closeOnPressEscape: true
        }
      )
    },
    selectStatus() {
      this.loading = false
    },
    // 审核
    Submission() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = {
            ...this.form,
            id: this.detailData.realInfo.id
          }
          realInfoAudit(data).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.getData()
            }
          })
        }
      })
    },
    // 去审核
    toAuthentication() {
      this.$router.push(`/member/list/realInfo/${this.userId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
