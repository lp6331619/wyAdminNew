<template>
  <div>
    <el-button
      size="mini"
      type="primary"
      :disabled="selectTable.length <=0"
      @click="displayBox=true"
    >修改所属销售</el-button>
    <el-dialog title="修改所属销售" :visible.sync="displayBox" width="500px">
      <div class="el-message el-message--warning tip">
        <p class="el-message__content">
          <strong>请谨慎操作！</strong> 批量选中的会员将修改为以下所属销售：
        </p>
      </div>
      <el-form
        v-if="prepare"
        ref="createMember"
        class="mt20"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item label="所属销售:" prop="saler" :label-width="formLabelWidth">
          <el-select
            v-model="form.saler"
            :multiple="false"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getUser"
            :loading="loading"
          >
            <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改销售原因:" prop="note" :label-width="formLabelWidth">
          <el-input
            v-model="form.note"
            placeholder="请输入修改销售原因(必填)"
            auto-complete="off"
            @keyup.enter.native="createMemberBox()"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayBox = false">取 消</el-button>
        <el-button type="primary" @click="createMemberBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { modifySaler, getUserList } from '@/api/member'
export default {
  props: {
    prepare: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectTable: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      formLabelWidth: '160px',
      form: {
        saler: '',
        note: ''
      },
      formRules: {
        saler: [{ required: true, trigger: 'change', message: '不能为空!' }],
        note: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      rules: {},
      displayBox: false,
      loading: false,
      list: []
    }
  },
  created() {},
  methods: {
    createMemberBox() {
      this.$refs.createMember.validate(valid => {
        if (valid) {
          const ids = []
          this.selectTable.forEach(item => {
            ids.push(item.id)
          })
          const data = Object.assign(this.form, {
            ids: ids
          })
          modifySaler(data).then(res => {
            if (res.result.isSuccess) {
              this.displayBox = false
              this.$message.success(res.result.message)
              this.form = {
                saler: '',
                note: ''
              }
              this.$emit('refresh', true)
            }
          })
        }
      })
    },
    getUser(query) {
      this.loading = true
      const data = {
        saler: 1,
        search: query
      }
      getUserList(data).then(res => {
        if (res.result.isSuccess) {
          this.list = res.data
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
