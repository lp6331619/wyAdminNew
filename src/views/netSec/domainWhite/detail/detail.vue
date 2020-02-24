<template>
  <div>
    <MemberInfo :member="memberData" @getData="getDetail"></MemberInfo>
    <el-card v-if="detailData" v-loading="loading" class="box-card">
      <div slot="header" class="header flex">
        白名单信息
      </div>
      <div class="account">
        <el-row class="SimilarTable">
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">产品编号</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.detail.prodInfo.no }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">关联IP</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >
                <el-tooltip v-if="detailData.detail.ips.length > 1" class="item" effect="dark" :content="detailData.detail.ips.join(',')" placement="right-end">
                  <div>{{ detailData.detail.ips[0] }}</div>
                </el-tooltip>
                <div v-else>{{ detailData.detail.ips.length > 0 ? detailData.detail.ips[0] : '-' }}</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">网站域名</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.detail.domain }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">联系人姓名</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.detail.contact.name }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">网站开通时间</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.detail.stat.createDateTime }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">联系人手机</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.detail.contact.mobile }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">工信部许可/备案号</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >
                <div>{{ detailData.domainInfo.icpNo }}</div>
                <div class="btnBox">
                  <el-button
                    v-operatePriv="{priv:'net_sec:domain_white_list:check_bei_an'}"
                    size="mini"
                    type="primary"
                    plain
                    @click="onCheckBA"
                  >检索</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">联系人QQ</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.detail.contact.qq || '-' }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">公安机关备案号</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.domainInfo.policeNo || '-' }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">联系人邮箱</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.detail.contact.email }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">导入防火墙</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >
                <div>{{ detailData.detail.firewall ? detailData.detail.firewall.join(",") || "-" : '-' }}</div>
                <div class="btnBox">
                  <editFirewall :id="id" :firewalls="defFirewalls" @refresh="getDetail()"></editFirewall>
                </div></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">审核状态</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ detailData.detail.auditStatus.name }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title">备案单位</el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              >{{ fomatCompanys(detailData.domainInfo.companys) }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="9" class="title"></el-col>
              <el-col
                :span="15"
                class="contentBox flex"
              ></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <RemarkCard
      v-operatePriv="{priv:'net_sec:domain_white_list:note_list'}"
      :remark-urls="remarkUrls"
      :user-id="id"
    />
    <el-card v-if="detailData && detailData.detail.auditStatus.key !== 'INVALID' && detailData.detail.auditStatus.key !== 'FOUL' && detailData.detail.auditStatus.key !== 'NO_ICP'" class="box-card">
      <div slot="header" class="header flex">
        信安处理信息
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审核状态" prop="auditStatus">
          <el-select v-model="form.auditStatus" placeholder="请选择">
            <el-option v-for="item in auditStatus" :key="item.key" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="companysList && companysList.length > 0" label="备案单位">
          <el-checkbox-group v-model="form.companys">
            <el-checkbox v-for="item in companysList" :key="item.key" :label="item.name" name="companys"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="header flex">
        审核记录
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column label="操作时间" prop="opDateTime">
        </el-table-column>
        <el-table-column label="操作人" prop="opUser.name">
        </el-table-column>
        <el-table-column label="审核状态" prop="auditStatus">
        </el-table-column>
        <el-table-column label="备案单位" prop="company">
        </el-table-column>
        <el-table-column label="审核意见" prop="note">
        </el-table-column>
        <el-table-column label="防火墙" prop="firewall">
        </el-table-column>
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
