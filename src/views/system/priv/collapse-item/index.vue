<template>
  <el-collapse-item :name="index">
    <template slot="title">
      <div class="title">
        <i class="el-icon-share" />
        {{ item.meta.title }}
      </div>
      <el-checkbox
        v-model="item.status"
        :indeterminate="item.indeterminate"
        class="allSelect"
        @click.stop.native
        @change="checkBox(item,level)"
      >全选</el-checkbox>
      <div v-if="item.actions" class="specialSelect">
        <el-checkbox-group v-model="item.checked" @change="handleCheckedChange(item)">
          <template v-for="(val,key,actionsIndex) in item.actions">
            <el-checkbox v-if="!val.hidden" :key="actionsIndex" :label="val.priv">{{ val.title }}</el-checkbox>
          </template>
        </el-checkbox-group>
      </div>
    </template>
    <div v-if="item.children && level===1">
      <el-collapse v-model="item.activeName" accordion class="childBox">
        <div v-for="(child,childIndex) in item.children" :key="childIndex" :name="childIndex">
          <collapseItem
            v-if="!child.hidden"
            :item="child"
            :index="childIndex"
            :level="2"
            @statusMonitor="backClick"
          />
        </div>
      </el-collapse>
    </div>
    <div v-if="item.tabs">
      <el-collapse v-model="item.activeName" accordion class="childBox">
        <el-collapse-item
          v-for="(tab,val,tabIndex) in item.tabs.child"
          :key="tabIndex"
          :name="tabIndex"
        >
          <template slot="title">
            <div class="title pl40">{{ tab.title }}</div>
            <el-checkbox
              v-model="tab.status"
              :indeterminate="tab.indeterminate"
              class="allSelect"
              @click.stop.native
              @change="checkBox(tab,3)"
            >全选</el-checkbox>
          </template>
          <template v-if="tab.actions">
            <div class="childBox checkbox">
              <el-checkbox-group v-model="tab.checked" @change="handleCheckedChange(tab)">
                <template v-for="(acions,acionsVal,acionsIndex) in tab.actions">
                  <el-checkbox
                    v-if="!acions.hidden"
                    :key="acionsIndex"
                    :label="acions.priv"
                  >{{ acions.title }}</el-checkbox>
                </template>
              </el-checkbox-group>
            </div>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-collapse-item>
</template>

<script>
export default {
  name: 'CollapseItem',
  props: {
    // 数据
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // index
    index: {
      type: Number,
      default: 0
    },
    // 判断是第几等级的
    level: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    // this.status()
  },
  beforeUpdate() {
    this.status()
  },
  methods: {
    // 状态监测
    status() {
      const item = this.item
      if (item.tabs) {
        let objIndeterminate = []
        let objStatus = []
        const childLength = item.tabs.child.filter(tab => !tab.hidden).length
        objIndeterminate = item.tabs.child.filter(
          tab => !tab.hidden && tab.indeterminate
        )
        objStatus = item.tabs.child.filter(tab => !tab.hidden && tab.status)
        item.indeterminate =
          (objStatus.length > 0 && objStatus.length !== childLength) ||
          (objIndeterminate.length > 0 &&
            objIndeterminate.length !== childLength)
        item.status = objStatus.length === childLength
      }
      this.$emit('statusMonitor', this.item)
    },
    // 权限数组组成
    arrayPriv(item) {
      if (item) {
        const arr = []
        for (const i in item) {
          !item[i].hidden ? arr.push(item[i].priv) : ''
        }
        return arr
      }
    },
    // 全选选择
    checkBox(item, level, status) {
      this.selectAll(item, level, status)
      this.status()
    },
    // 选择方法
    selectAll(item, level, status) {
      switch (level) {
        case 1:
          if (item.children) {
            item.children.forEach(child => {
              this.selectAll(child, 2, item.status)
            })
          } else {
            item.checked = item.status ? this.arrayPriv(item.actions) : []
            item.indeterminate = false
          }
          break
        case 2:
          status !== undefined ? (item.status = status) : ''
          if (item.tabs) {
            for (const i in item.tabs.child) {
              this.selectAll(item.tabs.child[i], 3, item.status)
            }
          } else {
            item.checked = item.status ? this.arrayPriv(item.actions) : []
            item.indeterminate = false
          }
          break
        case 3:
          status !== undefined ? (item.status = status) : ''
          item.checked = item.status ? this.arrayPriv(item.actions) : []
          item.indeterminate = false
          break
      }
    },
    // 二级选择
    handleCheckedChange(item) {
      const length = item.checked.length
      const actions = this.arrayPriv(item.actions)
      item.status = length === actions.length
      item.indeterminate = length > 0 && length < actions.length
      this.status()
    },
    backClick(status) {
      this.$emit('statusMonitor', this.item)
    }
  }
}
</script>

<style lang="scss" >
.privList {
  .pl40 {
    padding-left: 40px;
  }
  .specialSelect {
    margin: 5px 0 0 60px;
  }
  .checkbox {
    background: #f6f6f6;
    line-height: 26px;
    padding: 20px 0 20px 320px;
  }
}
</style>
