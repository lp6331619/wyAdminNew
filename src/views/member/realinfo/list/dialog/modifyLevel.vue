<template>
  <div>
    <el-button
      size="mini"
      type="primary"
      :plain="plain"
      :disabled="selectTable.length <=0"
      @click="displayBox=true"
    >
      <slot>修改会员等级</slot>
    </el-button>
    <el-dialog title="修改会员等级" :visible.sync="displayBox" width="500px" append-to-body>
      <div class="el-message el-message--warning tip">
        <p class="el-message__content">
          <strong>请谨慎操作！</strong> 选中的会员将修改为以下等级：
        </p>
      </div>
      <el-form
        ref="createMember"
        class="mt20"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-position="right"
      >
        <el-form-item v-if="prepare" label="会员等级:" prop="level" :label-width="formLabelWidth">
          <el-select v-model="form.level" placeholder="请选择">
            <el-option v-for="item in prepare" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
import { modifyLevel } from '@/api/member'
export default {
  props: {
    prepare: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectTable: {
      type: Array,
      default: () => {
        return []
      }
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: '160px',
      form: {
        level: ''
      },
      formRules: {
        level: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      rules: {},
      displayBox: false
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
          const data = {
            level: this.form.level,
            ids: ids
          }
          modifyLevel(data).then(res => {
            if (res.result.isSuccess) {
              this.displayBox = false
              this.$message.success(res.result.message)
              this.form = {
                level: ''
              }
              this.$emit('refresh', true)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
