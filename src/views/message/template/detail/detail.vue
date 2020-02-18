<template>
  <div>
    <el-card class="box-card pt0">
      <div v-if="schema" slot="header" class="header flex">{{ schema.schema.title }}</div>
      <table v-if="dataBox" class="tableBox text-left" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td class="title">模板ID</td>
          <td>{{ dataBox.info.id }}</td>
        </tr>
        <tr>
          <td class="title">模板名称</td>
          <td>{{ dataBox.info.name }}</td>
        </tr>
        <tr>
          <td class="title">模板类型</td>
          <td>{{ dataBox.info.category.name }}</td>
        </tr>
        <tr>
          <td class="title">优先级</td>
          <td>{{ dataBox.info.priority.name }}</td>
        </tr>
        <tr>
          <td class="title">允许渠道</td>
          <td>
            <div v-if="dataBox.info.allowChannels">
              <p v-for="(item,i) in dataBox.info.allowChannels" :key="i">{{ item.name }}</p>
            </div>
          </td>
        </tr>
        <tr v-if="dataBox.info.systemParamInfos!==''">
          <td class="title">系统参数</td>
          <td>
            <table class="tableBox mt10 text-center" border="0" cellspacing="0" cellpadding="0">
              <thead>
                <tr class="topTitle">
                  <th width="120">ID</th>
                  <th>名称</th>
                  <th>默认值</th>
                  <th>值</th>
                  <th>描述</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(idx,i) in getKeys(dataBox.info.systemParamInfos)" :key="i">
                  <td>
                    <div v-if="idx">{{ idx }}</div>
                    <div v-else>--</div>
                  </td>
                  <td>
                    <div v-if="dataBox.info.systemParamInfos[idx].name">
                      <span class="gray">{{ dataBox.info.systemParamInfos[idx].name }}</span>
                    </div>
                    <div v-else>--</div>
                  </td>
                  <td>
                    <div v-if="dataBox.info.systemParamInfos[idx].default">
                      <span class="gray">{{ dataBox.info.systemParamInfos[idx].default }}</span>
                    </div>
                    <div v-else>--</div>
                  </td>
                  <td>
                    <div v-if="dataBox.info.systemParamInfos[idx].value">
                      <span class="gray">{{ dataBox.info.systemParamInfos[idx].value }}</span>
                    </div>
                    <div v-else>--</div>
                  </td>
                  <td>
                    <div v-if="dataBox.info.systemParamInfos[idx].description">
                      <span class="gray">{{ dataBox.info.systemParamInfos[idx].description }}</span>
                    </div>
                    <div v-else>--</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr v-if="dataBox.info.params!==''">
          <td class="title">自定义参数</td>
          <td>
            <ul>
              <li v-for="(idx,i) in getKeys(dataBox.info.params)" :key="i">
                <span>{{ dataBox.info.params[idx] }}</span>
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </el-card>
    <el-form v-if="contents" ref="form" :model="{contents}" label-width="80px">
      <el-card v-for="(item,i) in contents" :key="i" class="box-card">
        <el-form-item label="渠道">
          <el-select v-model="item.channel.key" placeholder="请选择渠道" disabled>
            <el-option v-for="(key,val) in channel" :key="key" :label="key" :value="val" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="item.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="订阅分组">
          <el-checkbox-group v-model="item.subscribeGroups">
            <el-checkbox
              v-for="(group,index) in item.groupList"
              :key="index"
              :label="group.id"
            >{{ group.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="模板内容">
          <el-input v-model="item.content" type="textarea" :rows="2" placeholder="请输入模板内容"></el-input>
        </el-form-item>
      </el-card>
      <div class="mt20 text-center">
        <el-button type="primary" @click="sub">确定</el-button>
        <el-button @click="$router.push('/message/template')">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import detailJs from './detail'
export default detailJs
</script>

<style lang="scss" scoped>
.tableBox {
  word-wrap: bread-word;
  word-break: break-all;
  table-layout: fixed;
  .title {
    width: 200px;
  }
  .topTitle {
    th {
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-width: 0 0 1px 1px;
    }
  }
}
</style>
