<template>
  <div>
    <div class="box-card tabBox">
      <el-tabs v-model="activeName" @tab-click="tabsClick">
        <el-tab-pane label="账号信息" name="0"></el-tab-pane>
        <el-tab-pane label="产品统计" name="1"></el-tab-pane>
        <el-tab-pane label="联系信息" name="2"></el-tab-pane>
        <el-tab-pane label="实名认证" name="3"></el-tab-pane>
        <el-tab-pane label="登录日志" name="4"></el-tab-pane>
        <el-tab-pane label="操作日志" name="5"></el-tab-pane>
      </el-tabs>
    </div>
    <template v-if="activeName==='0'">
      <el-card class="box-card">
        <div slot="header" class="header flex">会员列表</div>
        <account :detail-data="detailBox" @getData="assemblyGetData" @tabsClick="tabsClick" />
      </el-card>

      <RemarkCard
        v-operatePriv="'user:member:note_list'"
        :remark-urls="remarkUrls"
        :user-id="userId"
      />
    </template>
    <template v-if="activeName==='1'">
      <el-card class="box-card">
        <div slot="header" class="header flex">产品统计列表</div>
        <product />
      </el-card>
    </template>
    <template v-if="activeName==='2'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="header flex">业务联系方式</div>
            <contact
              v-if="detailBox.contacts"
              :status="contactsStatus"
              :init-data="detailBox.contacts.business"
              type="business"
              @emitData="emitContacts"
            />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="header flex">
              技术联系方式
              <el-button
                v-if="!contactsStatus"
                class="absolute"
                type="primary"
                size="mini"
                plain
                @click="synchronization('tech')"
              >同步业务信息</el-button>
            </div>
            <contact
              v-if="detailBox.contacts"
              :status="contactsStatus"
              :init-data="detailBox.contacts.tech"
              type="tech"
              @emitData="emitContacts"
            />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="header flex">
              财务联系方式
              <el-button
                v-if="!contactsStatus"
                class="absolute"
                type="primary"
                size="mini"
                plain
                @click="synchronization('finance')"
              >同步业务信息</el-button>
            </div>
            <contact
              v-if="detailBox.contacts"
              :status="contactsStatus"
              :init-data="detailBox.contacts.finance"
              type="finance"
              @emitData="emitContacts"
            />
          </el-card>
        </el-col>
      </el-row>
      <div class="text-center">
        <el-button v-if="contactsStatus" type="primary" @click="contactsStatus=false">编辑</el-button>
        <el-button
          v-if="!contactsStatus"
          :disabled="!disabled"
          type="primary"
          @click="updateContact"
        >保存</el-button>
        <el-button v-if="!contactsStatus" @click="contactsStatus=true;getDetail()">取消</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
</style>
