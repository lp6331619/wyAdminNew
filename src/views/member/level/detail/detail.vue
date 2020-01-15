<template>
  <div>
    <el-card v-loading="loading" class="box-card">
      <div slot="header" class="header flex">会员等级</div>
      <div v-if="prepare" class="selectBox">
        <create v-operatePriv="{priv:'user:level:create'}" @refresh="getRule(),getData()" />
        <el-select v-model="product" placeholder="产品类型" class="ml20" @change="selectData">
          <el-option v-for="(val,key,i) in prepare.nodes" :key="i" :label="val.name" :value="key" />
        </el-select>
        <el-select
          v-if="product"
          v-model="node"
          placeholder="节点"
          class="ml20"
          @change="selectDataProduct"
        >
          <el-option
            v-for="(item,i) in prepare.nodes[product].nodes"
            :key="i"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div v-if="prepare" class="box">
        <table class="table mt20" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="tit"></td>
            <td v-for="(item,i) in prepare.memberLevel" :key="i">
              <update
                v-operatePriv="{priv:'user:level:update_discount'}"
                :item="item"
                @refresh="getRule(),getData()"
              />
            </td>
          </tr>
          <tbody v-if="detailData">
            <tr>
              <td class="tit">当前会员数</td>
              <td v-for="(val,key,i) in detailData.memberNum" :key="i">{{ val }}</td>
            </tr>
            <tr v-for="(val,key,i) in form[product]" :key="i">
              <td>{{ prepare.product[product][key] }}</td>
              <td v-for="(v,k,x) in val" :key="x">
                <div :class="{'error':!val[k]}" class="text-center">
                  <el-input v-if="!editStatus" v-model="val[k]" type="number" />
                  <span v-if="editStatus">{{ v }}</span>
                  <p v-if="!val[k]" class="red">不能为空!</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pt20">
        <el-button
          v-if="editStatus"
          v-operatePriv="{priv:'user:level:update_discount'}"
          type="primary"
          :disabled="JSON.stringify(form)==='[]' || JSON.stringify(form)==='{}'"
          @click.native.prevent="editStatus=false"
        >编辑折扣</el-button>
        <el-button v-if="!editStatus" type="primary" @click.native.prevent="Submission">确认</el-button>
        <el-button v-if="!editStatus" @click.native.prevent="editStatus=true">取消</el-button>
        <small class="ml20">编辑产品折扣，默认为10,不打折，如输入9即是9折。</small>
      </div>
    </el-card>
  </div>
</template>

<script>
import detailJs from './detail.js'
export default detailJs
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  overflow-x: auto;
}
.table {
  min-width: 100%;
  border: 1px solid #eee;
  border-width: 0 1px 1px 0;
  td {
    text-align: center;
    border: 1px solid #eee;
    border-width: 1px 0 0 1px;
    padding: 10px;
  }
  .tit {
    width: 150px;
  }
}
.selectBox {
  display: flex;
}
</style>
