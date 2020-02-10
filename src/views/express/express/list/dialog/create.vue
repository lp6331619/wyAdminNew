<template>
  <div>
    <el-dialog
      title="创建快递信息"
      :visible.sync="setStatusStatus "
      width="800px"
      :before-close="handleClose"
      :close-on-press-escape="true"
      append-to-body
    >
      <el-form
        ref="setDetail"
        v-loading="loading"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item v-if="form.member" label="快递公司:" prop="memberId" label-width="100px">
          <el-select v-if="prepare" v-model="form.memberId" placeholder="请选择快递公司名称">
            <el-option
              v-for="(item,i) in prepare.company"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.express" label="快递公司:" prop="area" label-width="100px">
          <el-select v-if="prepare" v-model="form.express" placeholder="请选择快递公司名称">
            <el-option
              v-for="(item,i) in prepare.company"
              :key="i"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事业部:" prop="status" label-width="100px">
          <el-select v-if="prepare" v-model="form.status" placeholder="请选择上级事业部名称">
            <el-option v-for="(key,val,i) in prepare.status" :key="i" :label="val" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称:" prop="name" label-width="100px">
          <el-input v-model="form.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序:" label-width="100px">
          <el-input
            v-model="form.displayOrder"
            type="text"
            placeholder="请输入显示顺序"
            @keyup.enter.native="editDetailBox"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="editDetailBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { expressCreate } from '@/api/express'
export default {
  name: 'EditUpdate',
  props: {
    status: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 修改密码表单
      setStatusStatus: false,
      form: {
        no: '',
        payType: '', // 付款方式
        payAmount: '',
        origId: '',
        receiver: '',
        phone: '',
        address: '',
        postcode: '',
        info: '',
        sendTime: '',
        recvTime: '',
        status: '' // 状态
      },
      formRules: {
        memberId: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        express: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        origType: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        origId: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        payType: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        payAmount: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        sendTime: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        recvTime: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        status: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        no: [
          {
            required: true,
            max: 16,
            trigger: 'change',
            message: '不能为空!'
          },
          {
            pattern: /^[0-9a-zA-Z]+$/,
            message: '快递编号无效',
            trigger: 'change'
          }
        ],
        receiver: [
          {
            required: true,
            max: 16,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        phone: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          },
          {
            pattern: /^((\d{3,4}-)?\d{7,8}(-\d{0,5})?)$|(1[0-9]{10})$/,
            message: '电话或手机号码格式有误，请重新输入！',
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            max: 128,
            trigger: 'change',
            message: '不能为空!'
          }
        ],
        postcode: [
          {
            required: true,
            trigger: 'change',
            message: '不能为空!'
          },
          {
            pattern: /^[1-9][0-9]{5}$/,
            message: '邮编无效',
            trigger: 'change'
          }
        ],
        info: [
          {
            required: true,
            max: 255,
            trigger: 'change',
            message: '不能为空!'
          }
        ]
      },
      loading: false,
      prepare: undefined
    }
  },
  mounted() {
    this.getRule('prepare')
    this.getRule('schema')
    this.setStatusStatus = this.status
  },
  methods: {
    getRule(rule) {
      this.loading = true
      expressCreate({}, rule).then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          expressCreate(this.form).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.emitOut()
            }
          })
        }
      })
    },
    emitOut() {
      this.$emit('emitOut', this.setStatusStatus)
    },
    handleClose() {
      this.$emit('emitOut', this.setStatusStatus, true)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
