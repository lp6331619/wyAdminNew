<template>
  <div>
    <div class="box">
      <div class="title">现有的角色权限 {{ roles }}</div>
      <div v-if="roles" class="p20">
        <div v-for="(item,i) in roles" :key="i" class="item">
          {{ item.name }}
          <el-select v-if="prepare" v-model="item.dept" style="width:250px" placeholder="请选择">
            <el-option
              v-for="t in prepare.areaDepts"
              :key="t.id"
              :label="t.name"
              :value="`${t.id}`"
            />
          </el-select>
          <el-button type="primary" class="ml10" round @click="addProd(item)">
            <i class="el-icon-circle-plus" />
          </el-button>
        </div>
      </div>
    </div>
    <div class="box mt20">
      <div class="title">请选择新增角色 {{ checkList }}</div>
      <el-checkbox-group v-if="prepare" v-model="checkList" class="p20" @change="handleChecked">
        <el-checkbox v-for="(item,i) in prepare.roles" :key="i" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <!-- org:user:change_role -->
  </div>
</template>
<script>
import { orgUserDetail, orgUserUpdateRoles } from '@/api/org'
export default {
  name: 'UpdateRoles',
  props: {
    type: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      prepare: undefined,
      detailData: undefined,
      checkList: [],
      roles: []
    }
  },
  created() {
    this.getRule()
    this.getDetail()
  },
  methods: {
    // 获取 prepare
    getRule() {
      orgUserUpdateRoles({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    // 获取详情
    getDetail() {
      orgUserDetail({ id: this.id }).then(res => {
        if (res.result.isSuccess) {
          this.detailData = res.data
          this.roles = []
          const check = []
          for (var x in res.data.roles) {
            const dept = res.data.roles[x].dept
              ? res.data.roles[x].dept.id + ''
              : ''
            const newData = {
              id: res.data.roles[x].role.id,
              name: res.data.roles[x].role.name,
              dept: dept
            }
            this.roles.push(newData)
            check.push(res.data.roles[x].role.id)
          }
          this.checkList = Array.from(new Set(check))
        }
      })
    },
    // 新增现有角色
    addProd(item) {
      var newData = {
        id: item.id,
        name: item.name,
        dept: ''
      }
      this.roles.push(newData)
    },
    // 选择新增角色
    handleChecked(e) {
      e.forEach(item => {
        var result = this.roles.some(child => {
          return child.id === item
        })
        if (!result) {
          let obj = []
          obj = this.prepare.roles.find(r => {
            return Number(r.id) === Number(item)
          })
          if (obj) {
            this.addProd({
              id: obj.id,
              name: obj.name,
              dept: ''
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  border: 1px solid #ddd;
  .title {
    padding: 0 15px;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
  }
  .el-checkbox-group {
    .el-checkbox {
      margin: 5px;
    }
  }
}
.item {
  padding: 10px 20px;
}
</style>
