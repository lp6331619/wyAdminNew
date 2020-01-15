<template>
  <div>
    <el-button
      v-operatePriv="{priv:'user:level:update'}"
      type="primary"
      size="mini"
      plain
      @click="updateDiscount(item.id)"
    >
      {{ item.name }}
      <i class="el-icon-edit" />
    </el-button>
    <el-dialog title="修改会员等级" :visible.sync="displayBox" width="500px" append-to-body>
      <template slot="title">
        {{ delStatus ? '修改会员等级': membersStatus?' 迁移会员' :'删除会员' }}
        <el-button
          v-if="delStatus"
          class="fr mr20"
          type="danger"
          size="mini"
          @click="delLevel()"
        >删除会员等级</el-button>
        <el-button v-else class="fr mr20" type="primary" size="mini" @click="delLevel()">修改会员等级</el-button>
      </template>
      <formBox v-if="delStatus" :init-data="initData" @returnForm="returnForm" />
      <div v-else class="text-center">
        <p>您将删除等级:"{{ initData.name }}"</p>
        <p>当前会员等级:"{{ initData.name }}"</p>
        <p>当前会员数: {{ initData.membersCount }}</p>
        <div v-if="prepare && membersStatus">
          <el-select v-model="to" placeholder="请选择要迁移的等级">
            <el-option
              v-for="level in prepare.level"
              :key="level.id"
              :label="level.name"
              :value="level.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="displayBox = false">取 消</el-button>
        <el-button type="primary" :disabled="editStatus" @click="updataDiscountBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  levelDetail,
  updateDiscount,
  levelMove,
  levelDelete
} from '@/api/member'
import formBox from './form'
export default {
  components: {
    formBox
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      displayBox: false,
      editStatus: true, // 是否可以提交
      form: {},
      initData: undefined,
      delStatus: true, // 是否删除状态
      prepare: undefined,
      to: undefined, // 要修改的等级
      membersStatus: false
    }
  },
  created() {},
  methods: {
    returnForm(e, s) {
      this.editStatus = !s
      this.form = e
    },
    getData() {
      // 获取等级详情
      levelDetail({ id: this.item.id }).then(res => {
        if (res.result.isSuccess) {
          this.initData = res.data
          this.membersStatus = this.initData.membersCount > 0
          this.membersStatus ? this.getPrepare() : ''
        }
      })
    },
    getPrepare() {
      // 获取迁移信息
      levelMove({ from: this.initData.id }, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    // 修改或者删除
    updataDiscountBox() {
      if (this.delStatus) {
        // 修改等级信息
        updateDiscount({ ...this.form, id: this.initData.id }).then(res => {
          if (res.result.isSuccess) {
            this.displayBox = false
            this.$message.success(res.result.message)
            this.$emit('refresh', true)
          }
        })
      } else {
        if (this.membersStatus) {
          // 迁移等级账号
          levelMove({ from: this.initData.id, to: this.to }).then(res => {
            if (res.result.isSuccess) {
              this.displayBox = false
              this.$message.success(res.result.message)
              this.$emit('refresh', true)
            }
          })
        } else {
          // 删除等级信息
          levelDelete({ id: this.initData.id }).then(res => {
            if (res.result.isSuccess) {
              this.displayBox = false
              this.$message.success(res.result.message)
              this.$emit('refresh', true)
            }
          })
        }
      }
    },
    // 更新会员等级
    updateDiscount(e) {
      this.getData()
      this.displayBox = true
    },
    delLevel(e) {
      this.delStatus = !this.delStatus
      console.log(this.initData, 444)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
