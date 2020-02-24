<template>
  <div>
    <el-card v-if="member" v-loading="loading" class="box-card">
      <div slot="header" class="header flex">
        会员信息
      </div>
      <div class="account">
        <el-row class="SimilarTable">
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">会员</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >
                <div>
                  <el-button v-operatePriv="{priv:'user:member:detail'}" type="text" @click="onGoDetail">
                    {{ member.realInfoName }} | {{ member.mobile }}
                  </el-button>
                </div>
                <div class="btnBox">
                  <el-button
                    v-operatePriv="{priv:'user:member:admin_login'}"
                    size="mini"
                    type="primary"
                    plain
                    @click="onLogin"
                  >登入账号</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">会员等级/区域</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >
                <div>{{ member.level ? member.level.name : "-" }}／{{ member.region.name || "-" }}</div>
                <div class="btnBox">
                  <el-button
                    v-operatePriv="{priv:'user:member:update_region'}"
                    size="mini"
                    type="primary"
                    plain
                    @click="onUpdateRegion"
                  >修改区域</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">手机/邮箱</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >
                {{ mobileAndEmail() }}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">所属销售</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >
                {{ nameAndDeptName() || "-" }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <Configurable v-if="updateregionInitData.display" :init-data="updateregionInitData" @emitOut="emitOut"></Configurable>
  </div>
</template>

<script>
import { toMember, updateregion } from '@/api/member'
import { Configurable } from '@/components/Dialog'
import request from '@/utils/request'

export default {
  components: {
    Configurable
  },
  props: {
    member: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      loading: false,
      updateregionInitData: {
        title: '修改客户所属区域',
        display: false,
        formLabelWidth: '80px',
        width: '500px',
        tip: '当前客户所属区域:',
        type: 'region',
        typeData: [
          {
            type: 'select',
            name: 'region',
            itemName: '请选择客户所属区域',
            title: '所属区域'
          }
        ],
        form: {
          region: ''
        }
      }
    }
  },
  methods: {
    mobileAndEmail() {
      let info = ''
      if (this.member.mobile) {
        info = this.member.mobile
      }
      if (this.member.email) {
        info += (info ? ' / ' : '') + this.member.email
      }
      return info
    },
    nameAndDeptName() {
      const info = this.deptName
      if (info) {
        return this.member.saler
          ? this.member.saler.name
          : '' + ' - ' + info
      } else {
        return this.member.saler ? this.member.saler.name : ''
      }
    },
    onLogin() {
      toMember({ id: this.member.id }).then(res => {
        if (res.result.isSuccess) {
          window.open(res.data.url, '_blank')
        }
      })
    },
    onUpdateRegion() {
      updateregion({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.updateregionInitData.prepare = res.data
          this.updateregionInitData.form.region = this.member.region.name
          this.updateregionInitData.display = true
          this.updateregionInitData.tip = `当前所属区域:${this.member.region.name}`
        }
      })
    },
    onGoDetail() {
      this.common.openWindow(`/member/list/detail/${this.member.id}`)
    },
    emitOut(e) {
      this.loading = true
      request({
        url: '/user/member/updateregion',
        method: 'post',
        data: {
          id: this.member.id,
          ...e.form
        }
      }).then(res => {
        if (res.result.isSuccess) {
          this.$message.success(res.result.message)
          this.getData()
        }
        this.loading = false
      })
    },
    // 获取数据
    getData() {
      this.$emit('getData', true)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
