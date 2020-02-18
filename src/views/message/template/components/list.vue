<template>
  <div>
    <div class="fatherBox">
      <el-card v-if="schema" v-loading="loading" class="box-card pt0">
        <div slot="header" class="header flex">
          <div>{{ schema.title }}</div>
        </div>
        <el-table
          v-if="listData"
          ref="multipleTable"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          :data="listData.data"
        >
          <el-table-column prop="id" :label="schema.output.id" width="200"></el-table-column>
          <el-table-column prop="name" :label="schema.output.name"></el-table-column>
          <el-table-column
            prop="category.name"
            :label="schema.output.category[':title']"
            width="80"
          ></el-table-column>

          <el-table-column prop="systemParams" :label="schema.output.systemParams"></el-table-column>
          <el-table-column prop="params" :label="schema.output.params" width="200"></el-table-column>
          <el-table-column prop="allowChannels" :label="schema.output.allowChannels"></el-table-column>
          <el-table-column
            prop="priority.name"
            :label="schema.output.priority[':title']"
            width="80"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                v-operatePriv="{priv:'message:template:content'}"
                plain
                type="primary"
                size="mini"
                @click="common.openWindow(`/message/template/detail/${scope.row.id}`)"
              >内容设置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import listJs from './list'
export default listJs
</script>

<style lang="scss" scoped>
</style>
