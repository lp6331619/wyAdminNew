<template>
  <div>
    <el-card class="box-card pt0">
      <div slot="header" class="header flex">{{ scene ==='detail'?'套餐详情':'新增套餐' }}</div>
      <table
        v-if="detailData && scene==='detail'"
        class="tableBox text-left"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="title">ID</td>
          <td>{{ detailData.id }}</td>
          <td class="title">套餐名称</td>
          <td>{{ detailData.name }}</td>
        </tr>
        <tr>
          <td class="title">购买</td>
          <td>{{ detailData.buy ? '是' :'否' }}</td>
          <td class="title">升级</td>
          <td>{{ detailData.upgrade?'是':'否' }}</td>
        </tr>
        <tr>
          <td class="title">续费</td>
          <td>{{ detailData.renew ? '是':'否' }}</td>
          <td class="title">创建时间</td>
          <td>{{ detailData.stat?detailData.stat.createDateTime:'' }}</td>
        </tr>
      </table>
      <el-row v-else ref="form">
        <el-col :span="24">
          <el-form ref="formBox" :model="form" :rules="formRules" label-width="120px">
            <el-form-item label="套餐名称" prop="name" class="w400">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="产品分类">
              <ul v-if="prepare" class="ul">
                <li v-for="(item,i) in form.attr" :key="i">
                  <span class="title">产品类型 {{ i +1 }}:</span>
                  <el-select v-model="item.type" placeholder="请选择产品类型" @change="changeSelect(item)">
                    <el-option
                      v-for="(val,key) in prepare.prodType"
                      :key="key"
                      :label="val"
                      :value="key"
                    ></el-option>
                  </el-select>
                  <el-button-group class="ml10">
                    <el-button type="danger" round size="mini" plain @click="reduce(i)">
                      <i class="el-icon-minus" />
                    </el-button>
                    <el-button type="primary" round size="mini" plain @click="add(i)">
                      <i class="el-icon-circle-plus" />
                    </el-button>
                  </el-button-group>
                  <template v-if="item.type && item.items">
                    <div v-for="(itemsChild,itmesi) in item.items" :key="itmesi" class="item">
                      <span class="title">产品项目:</span>
                      <el-select
                        v-model="itemsChild.item"
                        placeholder="请选择产品项目"
                        @change="changeSelect(itemsChild)"
                      >
                        <el-option
                          v-for="(val,key) in prepare.prodItem[item.type]"
                          :key="key"
                          :label="val.name"
                          :value="key"
                        ></el-option>
                      </el-select>
                      <el-button-group class="ml20">
                        <el-button
                          type="danger"
                          round
                          size="mini"
                          plain
                          @click="reduce(i,true,itmesi)"
                        >
                          <i class="el-icon-minus" />
                        </el-button>
                        <el-button type="primary" round size="mini" plain @click="add(i,true)">
                          <i class="el-icon-circle-plus" />
                        </el-button>
                      </el-button-group>
                      <template v-if="itemsChild.item && itemsChild.attrs">
                        <div
                          v-for="(lastChils,lasti) in itemsChild.attrs"
                          :key="lasti"
                          class="item"
                        >
                          <span class="title">产品属性:</span>
                          <el-select
                            v-model="lastChils.attr"
                            placeholder="请选择产品属性"
                            @change="changeSelect(lastChils)"
                          >
                            <el-option
                              v-for="(val,key) in prepare.prodItem[item.type][itemsChild.item]['attrs']"
                              :key="key"
                              :label="val.name"
                              :value="key"
                            ></el-option>
                          </el-select>
                          <span
                            v-if="lastChils.attr && prepare.prodItem[item.type][itemsChild.item]['attrs'][lastChils.attr]['unit']"
                            class="title ml20"
                          >{{ prepare.prodItem[item.type][itemsChild.item]['attrs'][lastChils.attr]['unit']['typeName'] }}:</span>
                          <el-select
                            v-if="lastChils.attr && prepare.prodItem[item.type][itemsChild.item]['attrs'][lastChils.attr]['options']"
                            v-model="lastChils.value"
                            class="ml10"
                            placeholder="属性"
                          >
                            <el-option
                              v-for="(val,key) in prepare.prodItem[item.type][itemsChild.item]['attrs'][lastChils.attr]['options']"
                              :key="key"
                              :label="val"
                              :value="key"
                            ></el-option>
                          </el-select>
                          <span
                            v-if="lastChils.attr && !prepare.prodItem[item.type][itemsChild.item]['attrs'][lastChils.attr]['options']"
                          >
                            <el-input v-model="lastChils.value" class="w200" placeholder="请输入">
                              <template
                                v-if="prepare.prodItem[item.type][itemsChild.item]['attrs'][lastChils.attr]['unit']"
                                slot="append"
                              >{{ prepare.prodItem[item.type][itemsChild.item]['attrs'][lastChils.attr]['unit']['unitName'] }}</template>
                            </el-input>
                          </span>
                        </div>
                      </template>
                    </div>
                  </template>
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="业务类型">
              <el-checkbox v-model="form.buy">新购</el-checkbox>
              <el-checkbox v-model="form.renew">续费</el-checkbox>
              <el-checkbox v-model="form.upgrade">升级</el-checkbox>
            </el-form-item>
            <div class="text-center mt20">
              <el-button :disabled="editStatus" type="primary" @click="Submission()">确认提交</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import detailJs from './detail'
export default detailJs
</script>

<style lang="scss" scoped>
.ul {
  border: 1px solid #ddd;
  li {
    padding: 20px;
    border-top: 1px solid #ddd;
    &:first-child {
      border-top: none;
    }
  }
  .item {
    margin: 10px 0 0 20px;
    padding: 10px;
    border-top: 1px solid #ddd;
  }
}
.w200 {
  width: 200px;
}
.w400 {
  width: 400px;
}
</style>
