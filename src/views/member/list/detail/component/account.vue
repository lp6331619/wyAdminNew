<template>
  <div v-if="detailBool" class="account">
    <el-row class="SimilarTable">
      <el-col :span="12">
        <el-row>
          <el-col :span="6" class="title">ID</el-col>
          <el-col :span="18" class="contentBox flex">
            <div>
              {{ detailData.id }}
              <span
                v-if="detailData.passport"
              >( WYID: {{ detailData.passport.wyId }} )</span>
            </div>
            <el-button
              v-operatePriv="'user:member:admin_login'"
              size="mini"
              type="primary"
              plain
              @click="toMember()"
            >登入账号</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="6" class="title">注册时间</el-col>
          <el-col :span="18" class="contentBox flex">{{ detailData.stat.createDateTime }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="6" class="title">重要程度</el-col>
          <el-col :span="18" class="contentBox flex">
            <span :class="getLevelColor(detailData.importance.key)">{{ detailData.importance.name }}</span>
            <el-button
              v-operatePriv="'user:member:admin_login'"
              size="mini"
              type="primary"
              plain
              @click="updateLevel('importance',detailData.importance.key,detailData.importance.name)"
            >修改</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="6" class="title">商业类型</el-col>
          <el-col :span="18" class="contentBox flex">1111</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="6" class="title">账号状态</el-col>
          <el-col :span="18" class="contentBox flex">1111</el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="6" class="title">所属行业</el-col>
          <el-col :span="18" class="contentBox flex">1111</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { toMember, updateimportance } from '@/api/member'
export default {
  name: 'Account',
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    detailBool() {
      return JSON.stringify(this.detailData) !== '{}'
    }
  },
  mounted() {},
  methods: {
    // 登录账号
    toMember() {
      toMember({ id: this.detailData.id }).then(res => {
        if (res.result.isSuccess) {
          window.open(res.data.url, '_blank')
        }
      })
    },
    // 重要程度 颜色
    getLevelColor(key) {
      if (key === 'WILL_VIP' || key === 'COMPANY') {
        return 'adopt'
      } else if (key === 'PERSONAL' || key === 'VIP') {
        return 'link'
      } else if (key === 'SUPER_VIP' || key === 'CDN') {
        return 'remind'
      } else if (key === 'AGENT' || key === 'DIAMOND_VIP') {
        return 'proh'
      } else {
        return ''
      }
    },

    // 修改会员等级弹窗
    updateLevel(type, key, value) {
      updateimportance({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          const prepare = res.data.importance
          console.log(prepare, 11)
        }
      })
      // const dialogRef = this.dialog.open(DialogUpdateLevel, {
      //     width: "400px",
      //     data: {
      //         url: this.detailUrl,
      //         id: this.userId,
      //         type: type,
      //         key: key,
      //         value: value
      //     }
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //     if (result === "") {
      //     } else {
      //         this.getUserInfo(this.userId, this.detailUrl);
      //     }
      // });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
