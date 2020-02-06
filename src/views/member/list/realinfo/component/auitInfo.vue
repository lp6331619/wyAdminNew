<template>
  <div>
    <el-card class="box-card">
      <table
        v-if="detailInfoBox"
        class="tableBox text-left"
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="title">当前实名状态：</td>
          <td>
            <span
              :class="statusClass(detailInfoBox.realInfoStatus.key)"
            >{{ detailInfoBox.realInfoStatus.name }}</span>
          </td>
        </tr>
        <tr v-if="detailData.status.value === 3">
          <td class="title">失败原因：</td>
          <td>
            <span>{{ detailData.auditInfo.note || '暂无数据' }}</span>
          </td>
        </tr>
        <tr>
          <td class="title">{{ type === 1 ? '姓名' : '企业名称' }}：</td>
          <td>
            <span>{{ detailData.certificate.name }}</span>
          </td>
        </tr>
        <tr v-if="type===2">
          <td class="title">企业联系人：</td>
          <td>
            <span>{{ detailData.managerCertificate.name }}</span>
          </td>
        </tr>
        <tr v-if="type===2">
          <td class="title">联系人身份证号码：</td>
          <td>
            <span>{{ detailData.managerCertificate.no }}</span>
          </td>
        </tr>
        <tr>
          <td class="title">区域：</td>
          <td>
            <span>{{ `${detailData.address.province } ${detailData.address.city } ${detailData.address.area }` }}</span>
          </td>
        </tr>
        <tr>
          <td class="title">地址：</td>
          <td>
            <span>{{ detailData.address.address }}</span>
          </td>
        </tr>
        <tr>
          <td class="title">证件类型：</td>
          <td>
            <span>{{ detailData.certificate.type.name }}</span>
          </td>
        </tr>
        <tr>
          <td class="title">证件号：</td>
          <td>
            <span>{{ detailData.certificate.no }}</span>
          </td>
        </tr>
        <tr v-if="files.length > 0">
          <td class="title">证件照：</td>
          <td>
            <div class="aut-info-imgs">
              <div v-for="(item,i) in files" :key="i" class="item">
                <p>
                  <img v-if="item.file" :src="item.file" @click="openImg(item)" />
                </p>
                <p>{{ item.name }}</p>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="type === 2 && moreFiles.length > 0">
          <td class="title">可选证件照：</td>
          <td>
            <div class="aut-info-imgs">
              <div v-for="(item,i) in moreFiles" :key="i" class="item">
                <p>
                  <img v-if="item.file" :src="item.file" @click="openImg(item)" />
                </p>
                <p>{{ item.name }}</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </el-card>
    <div class="text-center">
      <el-button type="primary" @click="showMsg">更改实名</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuitInfo',
  props: {
    dataInfo: {
      type: Object,
      default: res => {
        return {}
      }
    },
    prepare: {
      type: Object,
      default: res => {
        return {}
      }
    }
  },
  data() {
    return {
      detailInfoBox: undefined,
      detailData: undefined,
      prepareBox: undefined,
      type: null,
      moreFiles: [],
      files: [],
      phoneUrl: '/user/member/getRealInfoPicture'
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.detailInfoBox = this.dataInfo
      this.detailData = this.dataInfo.realInfo
        ? this.dataInfo.realInfo
        : undefined
      this.prepareBox = this.prepare
      this.type = this.detailData ? this.detailData.type.value : null
      this.setFile()
    },
    // 获取图片
    setFile() {
      Object.keys(this.detailData.certificate.files).map(key => {
        const img = `${this.imgUrl}${this.phoneUrl}?id=${this.detailData.id}&type=${key}`
        // 证件照
        const name1 = this.prepareBox.fileType[this.type][
          this.detailData.certificate.type.value
        ][key]
        if (name1) {
          this.files.push({
            name: name1,
            file: img
          })
        }
        // 可选证件照
        const name2 = this.prepareBox.licenseType[key]
        if (name2) {
          this.moreFiles.push({
            name: name2,
            file: img
          })
        }
      })
      console.log(this.files, this.moreFiles)
    },
    /**
     * 根据状态颜色选取不同的类名
     */
    statusClass(status) {
      if (status === 'AUDIT') {
        return 'remind'
      } else if (status === 'OK') {
        return 'adopt'
      } else {
        return 'proh'
      }
    },
    // 打开图片
    openImg(item) {
      this.$alert(
        `<img style="max-width:100%;max-height:100%" src="${item.file}" /><p>${item.name}</p> `,
        '',
        {
          dangerouslyUseHTMLString: true,
          center: true,
          showConfirmButton: false,
          closeOnClickModal: true,
          closeOnPressEscape: true
        }
      )
    },
    showMsg() {
      const text = `<p> 当前实名状态为： <span class="${this.statusClass(
        this.detailInfoBox.realInfoStatus.key
      )}">已实名(已通过)</span></p>
                    <p>变更实名后，账号将 <span class="red">重新进入实名审核</span>，但不影响您对产品的管理、购买、续费等业务操作。若实名变更审核失败，实名信息将恢复回申请变更前的。</p>`
      this.$confirm(`${text}`, '更改实名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true,
        center: true,
        closeOnClickModal: true,
        closeOnPressEscape: true
      })
        .then(() => {
          this.$emit('emitOut', true)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.aut-info-imgs {
  display: flex;
  .item {
    margin: 10px 10px 0 0;
    border: 1px dashed #ddd;
    text-align: center;
    img {
      width: 250px;
      height: 150px;
    }
  }
}
</style>
