<template>
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
    <div class="text-center">
      <el-button v-if="contactsStatus" type="primary" @click="contactsStatus=false">编辑</el-button>
      <el-button
        v-if="!contactsStatus"
        :disabled="!disabled"
        type="primary"
        @click="updateContact"
      >保存</el-button>
      <el-button v-if="!contactsStatus" @click="contactsStatus=true;$emit('getData',true)">取消</el-button>
    </div>
  </el-row>
</template>

<script>
import { updateContact } from '@/api/member'
import { contact } from '../component'
export default {
  name: 'ContactBox',
  components: {
    contact
  },
  props: {
    detailBox: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      contactsStatus: true, // 联系信息是否可编辑状态
      disabled: true,
      contacts: {}, // 联系人信息
      prepareContact: {} // 联系人 prepare
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {
    this.prepareContactBox()
  },
  methods: {
    // 返回的数据
    emitContacts(e, type, form) {
      this.disabled = e
      this.contacts[type] = form
    },
    // 更新联系人
    updateContact() {
      const moduleBox = this.filterFeild(
        this.detailBox.module.name,
        this.prepareContact.modules
      )
      updateContact({
        contacts: this.contacts,
        id: this.userId,
        name: this.detailBox.name,
        module: moduleBox
      }).then(res => {
        if (res.result.isSuccess) {
          this.$message.success(res.result.message)
          this.contactsStatus = true
          this.$emit('getData', true)
        }
      })
    },
    // 获取联系人的 prepare
    prepareContactBox() {
      updateContact({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepareContact = res.data
        }
      })
    },
    // 过滤出名称对应的属性名 如（云服务器对应的 cloud）
    filterFeild(name, data) {
      let filterName
      for (var x in data) {
        if (data[x] === name) {
          filterName = x
        }
      }
      return filterName
    },
    // 同步业务信息
    synchronization(type) {
      this.detailBox.contacts[type] = this.contacts['business']
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
