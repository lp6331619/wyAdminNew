<template>
  <div>
    <div v-if="(!edit && scene==='detail') && dataBox" class="detail">
      <h3 class="title">
        {{ dataBox.title }}
        <small>发布于: {{ dataBox.stat.updateDateTime }}，文章状态：{{ dataBox.status.name }}</small>
      </h3>
      <div class="content" v-html="dataBox.content"></div>
    </div>
    <div v-if="edit || scene==='create'">
      <el-form
        ref="form"
        :model="form"
        :rules="Rules"
        label-width="80px"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item v-if="prepare" prop="cate_id" label="文章分类">
          <el-select v-model="form.cate_id" placeholder="请选择文章分类">
            <el-option
              v-for="(item,i) in prepare.cate"
              :key="i"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="文章标题">
          <el-input v-model="form.title" placeholder="文章标题" type="text" />
        </el-form-item>
        <el-form-item prop="displayOrder" label="文章序号">
          <el-input v-model="form.displayOrder" type="number" placeholder="文章序号" />
        </el-form-item>
        <el-form-item prop="status" label="文章状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="(name,key,i) in prepare.status" :label="key">{{ name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="content" label="文章内容">
          <div id="wangeditor">
            <div ref="editorElem" style="text-align:left;"></div>
          </div>
          <el-input v-model="form.content" type="text" style="display:none" />
        </el-form-item>
      </el-form>
    </div>
    <div class="btnBox text-center mt20">
      <el-button
        v-if="edit || scene==='create'"
        v-operatePriv="{priv:operatePriv.edit}"
        type="primary"
        @click="sub()"
      >确定</el-button>
      <el-button
        v-if="edit && scene==='detail'"
        v-operatePriv="{priv:operatePriv.edit}"
        @click="cancel"
      >取消</el-button>

      <el-button
        v-if="!edit && scene==='detail'"
        v-operatePriv="{priv:operatePriv.edit}"
        type="primary"
        @click="editorElemBox()"
      >编辑</el-button>
    </div>
  </div>
</template>

<script>
import detailJs from './detail'
export default detailJs
</script>

<style lang="scss" scoped>
.detail {
  .title {
    font-size: 24px;
    text-align: center;
    small {
      display: block;
      padding-top: 20px;
      font-size: 14px;
      font-weight: normal;
      color: #999;
    }
  }
}
</style>
