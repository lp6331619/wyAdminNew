<template>
  <div>
    <el-button
      v-operatePriv="{priv:'net_sec:domain_white_list:import_firewall'}"
      size="mini"
      type="primary"
      plain
      @click="onShowDialog"
    >修改</el-button>
    <el-dialog title="导入防火墙" :visible.sync="dialogVisible" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="防火墙" prop="firewals">
          <el-checkbox-group v-model="form.firewals">
            <el-checkbox v-for="(item, index) in firewallList" :key="index" :label="item.name" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getFirewallList, importfirewall } from '@/api/netSec'

export default {
  props: {
    id: {
      type: Number,
      default: () => {
        return 0
      }
    },
    firewalls: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      firewallList: [],
      form: {
        firewals: []
      },
      rules: {
        firewals: [
          { required: true, message: '请选择防火墙', trigger: 'change' }
        ]
      },
      prepareData: []
    }
  },
  methods: {
    getPrepare() {
      getFirewallList({
        pageSize: 100
      }).then(res => {
        if (res.result.isSuccess) {
          this.prepareData = res.data
          if (this.prepareData) {
            this.prepareData.map(item => {
              if (this.firewalls.indexOf(item.id) !== -1) {
                this.form.firewals.push(item.name)
              }
              this.firewallList.push(item)
            })
          }
        }
      })
    },
    onShowDialog() {
      this.dialogVisible = true
      this.getPrepare()
    },
    getIds() {
      const ids = []
      this.firewallList.map(item => {
        if (this.form.firewals.indexOf(item.name) !== -1) {
          ids.push(item.id)
        }
      })
      return ids
    },
    submitForm() {
      const ids = this.getIds()
      this.$refs.form.validate(valid => {
        if (valid) {
          importfirewall({
            id: this.id,
            firewall: ids
          }).then(res => {
            this.prepareData = []
            this.form.firewals = []
            this.dialogVisible = false
            this.$emit('refresh', true)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
