<template>
  <el-form
    v-if="form"
    ref="form"
    :model="form"
    :rules="formRules"
    auto-complete="on"
    label-position="left"
  >
    <table class="tableBox" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="title">姓名</td>
        <td>
          <span v-if="status">{{ form.name || '暂无' }}</span>
          <el-form-item v-else prop="name">
            <el-input v-model="form.name" size="mini" placeholder="请输入姓名" :keyup="outData()"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td class="title">手机号码</td>
        <td>
          <span v-if="status">{{ form.mobile || '暂无' }}</span>
          <el-form-item v-else prop="mobile">
            <el-input v-model="form.mobile" size="mini" placeholder="请输入手机号码" :keyup="outData()"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td class="title">电子邮箱</td>
        <td>
          <span v-if="status">{{ form.email || '暂无' }}</span>
          <el-form-item v-else prop="email">
            <el-input v-model="form.email" size="mini" placeholder="请输入电子邮箱" :keyup="outData()"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td class="title">QQ</td>
        <td>
          <span v-if="status">{{ form.qq || '暂无' }}</span>
          <el-form-item v-else prop="qq">
            <el-input v-model="form.qq" size="mini" placeholder="请输入QQ" :keyup="outData()"></el-input>
          </el-form-item>
        </td>
      </tr>
      <tr>
        <td class="title">固定电话</td>
        <td>
          <span v-if="status">{{ form.phone || '暂无' }}</span>
          <el-form-item v-else prop="phone">
            <el-input v-model="form.phone" size="mini" placeholder="请输入固定电话" :keyup="outData()"></el-input>
          </el-form-item>
        </td>
      </tr>
    </table>
  </el-form>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    initData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    status: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {},
      formRules: {
        email: [
          {
            min: 2,
            max: 128,
            trigger: 'change',
            message: '长度不可少于 2 个字符不可超过 128 个字符。'
          },
          {
            pattern: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]{0,62}\.)+[A-Za-z]{2,14}$/,
            trigger: 'change',
            message: '邮箱地址格式有误，请重新输入!'
          }
        ],
        mobile: [
          {
            pattern: /^((\d{3,4}-)?\d{7,8}(-\d{0,5})?)$|(1[0-9]{10})$/,
            trigger: 'change',
            message: '电话或手机号码格式有误，请重新输入！'
          }
        ],
        name: [
          {
            min: 2,
            max: 20,
            trigger: 'change',
            message: '长度不可少于 2 个字符不可超过 20 个字符。'
          }
        ],
        phone: [
          {
            min: 2,
            max: 16,
            trigger: 'change',
            message: '长度不可少于 2 个字符不可超过 16 个字符。'
          },
          {
            pattern: /^(\d{3,4}[-]?)?\d{7,8}$/,
            trigger: 'change',
            message: '电话号码格式有误，请重新输入！'
          }
        ],
        qq: [
          {
            min: 2,
            max: 16,
            trigger: 'change',
            message: '长度不可少于 2 个字符不可超过 16 个字符。'
          },
          {
            pattern: /^[1-9][0-9]{4,11}$/,
            trigger: 'change',
            message: 'QQ 号码无效'
          }
        ],
        weixin: [
          {
            min: 2,
            max: 16,
            trigger: 'change',
            message: '长度不可少于 2 个字符不可超过 16 个字符。'
          }
        ]
      }
    }
  },
  watch: {
    initData: {
      handler(newValue, oldValue) {
        this.form = newValue
      },
      deep: true
    }
  },
  mounted() {
    this.form = this.initData
  },
  methods: {
    outData(e) {
      this.$refs.form.validate(valid => {
        this.$emit('emitData', valid, this.type, this.form)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tableBox {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-width: 0 0 1px 1px;
  td {
    text-align: center;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-width: 1px 1px 0 0;
  }
  .title {
    width: 150px;
    background: #f5f5f5;
    color: #a5a5a5;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
