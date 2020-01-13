<template>
  <div>
    <el-card class="box-card title">
      <p>可提交个人证件，或者企业证件，通过审核后账号将拥有真实可靠的认证依据，会员名称与实名信息一致。</p>
      <p class="red">
        实名审核时间：周一至周六 8:30至17:30
        ，其余时间段提交的实名，审核将在24小时内完成，以上节假日除外，如：紧急请联系信安部审核。
      </p>
    </el-card>
    <AuitInfo
      v-if="getIsShowInfo() && dataInfo && prepare"
      :data-info="dataInfo"
      :prepare="prepare"
      @emitOut="emitOut"
    />
    <el-card v-if="!getIsShowInfo()" v-loading="loading" class="box-card title">
      <el-form ref="form" :model="form" :rules="formRules" auto-complete="on" label-position="left">
        <table
          v-if="dataInfo"
          class="tableBox text-left"
          border="0"
          cellspacing="0"
          cellpadding="0"
        >
          <tr>
            <td class="title">当前实名状态：</td>
            <td>
              <span
                :class="statusClass(dataInfo.realInfoStatus.key)"
              >{{ dataInfo.realInfoStatus.name }}</span>
            </td>
          </tr>
          <tr v-if="detailData && detailData.status.value === 3">
            <td class="title">失败原因：</td>
            <td>
              <span>{{ detailData.auditInfo.note || "" }}</span>
            </td>
          </tr>
          <tr>
            <td class="title">认证类型：</td>
            <td>
              <el-form-item class="w400">
                <el-radio-group v-model="form.type" @change="changeType">
                  <el-radio :label="1">个人</el-radio>
                  <el-radio :label="2">企业</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="title">
              <i class="red">*</i>
              {{ form.type===1?'姓名':'企业名称' }}：
            </td>
            <td>
              <el-form-item prop="name" class="w400">
                <el-input v-model="form.certificate.name" />
              </el-form-item>
            </td>
          </tr>
          <tr v-if="form.type===2">
            <td class="title">
              <i class="red">*</i>企业联系人：
            </td>
            <td>
              <el-form-item prop="managerCertificate.name" class="w400">
                <el-input v-model="form.managerCertificate.name" />
              </el-form-item>
            </td>
          </tr>
          <tr v-if="form.type===2">
            <td class="title">
              <i class="red">*</i>联系人身份证号码：
            </td>
            <td>
              <el-form-item prop="managerCertificate.no" class="w400">
                <el-input v-model="form.managerCertificate.no" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="title">
              <i class="red">*</i>区域：
            </td>
            <td>
              <div class="flex">
                <el-form-item v-if="provinces" prop="address.province" class="mr10">
                  <el-select
                    v-model="form.address.province"
                    placeholder="请选择省"
                    @change="selectProvinces"
                  >
                    <el-option v-for="(val,key,i) in provinces" :key="i" :label="val" :value="key" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.address.city || citys" prop="address.city" class="mr10">
                  <el-select v-model="form.address.city" placeholder="请选择市" @change="selectCitys">
                    <el-option v-for="(val,key,i) in citys" :key="i" :label="val" :value="key" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.address.area || areas" prop="address.area" class="mr10">
                  <el-select v-model="form.address.area" placeholder="请选择市">
                    <el-option v-for="(val,key,i) in areas" :key="i" :label="val" :value="key" />
                  </el-select>
                </el-form-item>
              </div>
            </td>
          </tr>
          <tr>
            <td class="title">
              <i class="red">*</i> 地址：
            </td>
            <td>
              <el-form-item prop="name" class="w400">
                <el-input v-model="form.address.address" />
              </el-form-item>
            </td>
          </tr>
          <tr v-if="prepare">
            <td class="title">
              <i class="red">*</i> 证件类型:
            </td>
            <td>
              <el-form-item prop="type" class="w400">
                <el-select
                  v-model="form.certificate.type"
                  placeholder="请选择"
                  @change="changeCertificateType"
                >
                  <el-option
                    v-for="(key,val,i) in prepare.certificateType[form.type]"
                    :key="i"
                    :label="key"
                    :value="val"
                  />
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="title">
              <i class="red">*</i> 证件号：
            </td>
            <td>
              <el-form-item prop="name" class="w400">
                <el-input v-model="form.certificate.no" />
              </el-form-item>
            </td>
          </tr>
          <tr v-if="form.certificate.type">
            <td class="title">
              <i class="red">*</i> 证件照：
            </td>
            <td>
              <el-form-item prop="files">
                <Upload
                  v-if="prepare && form && form.certificate "
                  :prepare-data="prepare"
                  :type="{typeChild:form.certificate.type,type:form.type}"
                  photo-url="/user/member/getRealInfoPicture"
                  :files="form.certificate.files"
                  :init-data="certificateImg"
                  @emitOut="fileOut"
                />
              </el-form-item>
            </td>
          </tr>
          <!-- <tr v-if="form.type===2">
            <td class="title">可选证件类型：</td>
            <td>
              <div class="w400 flex">
                <el-select v-model="moreFileVal" placeholder="请选择" style="width:300px">
                  <el-option
                    v-for="(key,val,i) in moreFileType"
                    :key="i"
                    :label="key"
                    :value="val"
                  />
                </el-select>
                <el-button class="ml20" type="primary" :disabled="!moreFileVal" @click="add()">添加</el-button>
              </div>
            </td>
          </tr>
          <tr v-if="form.certificate.type && form.type===2">
            <td class="title">可选证件类型</td>
            <td>
              <el-form-item prop="files">
                <Upload
                  v-if="prepare && form && form.certificate "
                  :prepare-data="prepare"
                  :type="{typeChild:form.certificate.type,type:form.type}"
                  photo-url="/user/member/getRealInfoPicture"
                  :files="form.certificate.files"
                  :init-data="detailData"
                  @emitOut="fileOut"
                />
              </el-form-item>
            </td>
          </tr>-->
        </table>
      </el-form>
    </el-card>
    <div v-if="!getIsShowInfo() && detailData" class="text-center mt20">
      <el-button
        type="primary"
        @click="subForm()"
      >{{ detailData.status.value === 2 && detailData.type.value === form.type ? "修改" : "提交" }}</el-button>
    </div>
    <!-- getIsTrue(2) -->
  </div>
</template>

<script>
import realinfoJs from './realinfo'
export default realinfoJs
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
}
.w400 {
  width: 400px;
}
.flex {
  justify-content: flex-start;
}
</style>
