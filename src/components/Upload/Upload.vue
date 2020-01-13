import { updateContact } from '@/api/member';
<template>
  <div v-if="prepareData " class="upload">
    <div class="tip">{{ prepareData.pictureFormat }}</div>
    <ul v-if="initData && initData.files" class="flex">
      <li v-for="(item,i) in initData.files" :key="i" class="item">
        <i class="el-icon-circle-plus themeColor">
          <input class="hidden" type="file" @change="fileChange($event,item.type)" />
        </i>
        <div class="img">
          <img
            :src="fliesImg[item.type]?fliesImg[item.type]:`${imgUrl}${photoUrl}?id=${initData.id}&type=${item.type}`"
          />
        </div>
        <p>
          <i class="red">*</i>
          {{ item.typeName }}
        </p>
      </li>
    </ul>
    <ul v-else class="flex">
      <li
        v-for="(val,key,i) in prepareData.fileType[type.type][type.typeChild]"
        :key="i"
        class="item"
        :style="`background:url(${picUrl}) no-repeat center 30px`"
      >
        <i class="el-icon-circle-plus themeColor">
          <input class="hidden" type="file" @change="fileChange($event,key)" />
        </i>
        <div class="img">
          <img v-if="fliesImg[key]" :src="fliesImg[key]" />
        </div>
        <p>
          <i class="red">*</i>
          {{ val }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    // 大小
    prepareData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 初始化数据
    initData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 类型
    type: {
      type: Object,
      default: () => {
        return {}
      }
    }, // 需要提交的数据
    files: {
      type: Object,
      default: () => {
        return {}
      }
    },
    photoUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      picUrl: require('@/assets/imgbj.png'),
      fliesImg: {}
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {},
  updated() {
    this.fliesImg = this.files
  },
  methods: {
    fileChange(e, tn) {
      const _this = this
      const file = e.target.files[0]
      const types = this.prepareData.type
      if (file) {
        const fileType = file.name.split('.')[1]
        if (types.indexOf(fileType) !== -1) {
          if (file.size <= this.prepareData.size.value) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function() {
              _this.$set(_this.fliesImg, tn, this.result)
              _this.$emit('emitOut', _this.fliesImg)
            }
          } else {
            this.$message.error('图片大小不能大于2M', 'warning')
          }
        } else {
          this.$message.error('请选择正确的图片格式', 'warning')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.upload {
  .flex {
    justify-content: flex-start;
  }
  .item {
    position: relative;
    margin-left: 20px;
    width: 198px;
    overflow: hidden;
    border: 1px solid #eee;
    .el-icon-circle-plus {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -25px 0 0 -25px;
      font-size: 50px;
      overflow: hidden;
      .hidden {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -20px 0 0 -20px;
        opacity: 0;
        cursor: pointer;
      }
    }
    .img {
      width: 196px;
      height: 134px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      margin: 0;
      padding: 10px 5px 10px;
      line-height: 15px;
      text-align: center;
    }
  }
}
</style>
