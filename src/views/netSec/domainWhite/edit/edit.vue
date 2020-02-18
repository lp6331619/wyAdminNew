<template>
  <div>
    <el-card class="box-card">
      <el-form ref="editForm" :model="rulesForm" :rules="rules" label-width="100px">
        <el-form-item v-if="!!!rulesForm.id" label="产品类型" prop="type">
          <el-select v-model="rulesForm.type" style="width: 500px" placeholder="请选择产品类型" @change="onChange">
            <el-option v-for="(item, index) in typeData" :key="index" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品编号" prop="no">
          <el-autocomplete
            v-if="!!!rulesForm.id"
            ref="auto"
            v-model="rulesForm.no"
            value-key="no"
            class="inline-input"
            style="width: 500px"
            :fetch-suggestions="querySearch"
            placeholder="请输入产品编号/IP/资产编号"
            @select="handleSelect"
          >
          </el-autocomplete>
          <span v-else>{{ rulesForm.no }}</span>
        </el-form-item>
        <el-form-item label="会员名">
          {{ name }}
        </el-form-item>
        <el-form-item label="关联IP">
          {{ getIpsStr() }}
        </el-form-item>
        <el-form-item label="网站域名" prop="domains">
          <el-input v-model="rulesForm.domains" :disabled="rulesForm.no === ''" style="width: 500px" type="textarea" @blur="onBlur"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="rulesForm.name" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机" prop="mobile">
          <el-input v-model="rulesForm.mobile" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="联系人QQ" prop="qq">
          <el-input v-model="rulesForm.qq" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="联系人邮箱" prop="email">
          <el-input v-model="rulesForm.email" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createDomainwhite, updateDomainwhite, findproduct, detail, checkdomain } from '@/api/netSec'

export default {
  data() {
    return {
      name: '--',
      ip: '--',
      typeData: [],
      rulesForm: {
        id: '',
        type: '',
        no: '',
        name: '',
        domains: '',
        mobile: '',
        qq: '',
        email: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ],
        no: [
          { required: true, message: '请选择产品编号', trigger: 'change' }
        ],
        domains: [
          { required: true, message: '请输入网站域名', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '请输入正确的电话！',
            trigger: 'blur'
          }
        ],
        qq: [
          {
            pattern: /^\d{5,11}$/,
            message: '请输入正确的QQ！',
            trigger: 'blur'
          }
        ],
        email: [
          {
            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            message: '请输入正确的邮箱！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.$route.params.id && this.getDetail()
    this.getPrepare()
  },
  methods: {
    getPrepare() {
      createDomainwhite({}, 'prepare').then(res => {
        this.typeData = this.FilterArray(res.data.type)
      })
    },
    /**
     * 获取详情
     */
    getDetail() {
      this.rulesForm.id = this.$route.params.id
      detail({
        id: this.rulesForm.id
      }).then(res => {
        if (res.result.isSuccess) {
          const detail = res.data.detail
          this.name = detail.member.name
          this.ip = detail.ips
          this.rulesForm.type = detail.typeInfo.id
          this.rulesForm.no = detail.info.no
          this.rulesForm.domains = detail.domain
          this.rulesForm.name = detail.contact.name
          this.rulesForm.mobile = detail.contact.mobile
          this.rulesForm.qq = detail.contact.qq
          this.rulesForm.email = detail.contact.email
        }
      })
    },
    /**
     * 检查domain
     */
    onBlur() {
      !!this.rulesForm.domains && checkdomain({
        domain: this.rulesForm.domains,
        prod: this.rulesForm.no
      }).then(res => {})
    },
    clearVal() {
      this.rulesForm.no = ''
      this.name = '--'
      this.ip = '--'
    },
    onChange(e) {
      this.clearVal()
    },
    /**
     * 查询产品
     */
    findproduct(val, cb) {
      const obj = {
        type: this.rulesForm.type,
        search: {
          field: '',
          search: val || '',
          strict: ''
        }
      }
      if (val === '') {
        this.clearVal()
      }
      findproduct(obj).then(res => {
        if (res.result.isSuccess) {
          cb ? cb(res.data) : (this.$refs.auto.suggestions = res.data)
        }
      })
    },
    /**
     * 提交
     */
    onSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.getReq().then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.$router.push('/netSec/domainWhiteList')
            }
          })
        }
      })
    },
    getReq() {
      return this.rulesForm.id ? updateDomainwhite({ domain: this.rulesForm.domains, ...this.rulesForm }) : createDomainwhite(this.rulesForm)
    },
    querySearch(queryString, cb) {
      this.findproduct(queryString, cb)
    },
    handleSelect(item) {
      if (this.rulesForm.domains && this.rulesForm.domains !== '') {
        this.onBlur()
      }
      this.name = item.member.name || '--'
      this.ip = item.ips
    },
    getIpsStr() {
      return !!this.ip && typeof this.ip !== 'string' ? this.ip.length > 0 ? this.ip.join('，') : '--' : '--'
    },
    // 转换数组
    FilterArray(data) {
      if (data) {
        const box = []
        for (const i in data) {
          box.push({
            text: data[i],
            value: i
          })
        }
        return box
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
