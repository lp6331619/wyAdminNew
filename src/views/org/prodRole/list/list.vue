<template>
  <div>
    <el-card v-if="schema" class="box-card pt0">
      <div slot="header" class="header flex">
        <div>{{ schema.title }}</div>
      </div>
      <el-form
        v-if="prepare && listData"
        ref="setDetail"
        v-loading="loading"
        :model="listData"
        auto-complete="on"
        label-position="right"
      >
        <table class="table" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th
                v-for="(mem,i) in getKeys(prepare.magicRole)"
                :key="i"
                class="actionTh"
              >{{ prepare.magicRole[mem] }}</th>
            </tr>
            <tr v-for="(val,key,i) in listData" :key="i">
              <td>{{ prepare.prodType[key] }}</td>
              <td v-for="(valC,keyC,iC) in val" :key="iC">
                <div v-if="edit">
                  <el-select
                    v-if="prepare && valC.role"
                    v-model="valC.role.id"
                    filterable
                    placeholder="请选择角色名称"
                  >
                    <el-option
                      v-for="(item,index) in prepare.role"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                  <div v-else>无</div>
                </div>
                <div v-else>{{ valC.role.name }}</div>
              </td>
            </tr>
          </thead>
        </table>
      </el-form>
      <div class="btnBox mt20">
        <el-button v-if="!edit" type="danger" @click="edit = !edit">编辑</el-button>
        <el-button v-if="edit" type="danger" @click="submit">保存</el-button>
        <el-button v-if="edit" @click="edit = !edit">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  text-align: center;
  border: 1px solid #eee;
  border-width: 1px 1px 0 0;
  td,
  th {
    padding: 10px;
    border: 1px solid #eee;
    border-width: 0 0 1px 1px;
  }
  th {
    padding: 20px;
  }
  tr:nth-child(2n) {
    background: #f9f9f9;
  }
}
.btnBox {
  text-align: center;
}
</style>
