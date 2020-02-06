<template>
  <el-card class="box-card">
    <div slot="header" class="header flex">产品统计列表</div>
    <table v-if="list && list.items" class="generalTab" border="0" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th></th>
          <th
            v-for="(item,index) in getKeys(list.items)"
            :key="index"
            :class="statusColor(item)"
          >{{ list.items[item] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in list.data" :key="index">
          <td>{{ product.name }}</td>
          <td v-for="(item,index2) in getKeys(list.items)" :key="index2">
            <a
              v-if="product.type !== 'total'"
              class="link"
              target="_blank"
              @click="toProductList(product,item)"
            >{{ product.values[item] }}</a>
            <span v-if="product.type === 'total'">{{ product.values[item] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </el-card>
</template>

<script>
import { productCounter } from '@/api/member'
export default {
  name: 'Product',
  data() {
    return {
      list: {}
    }
  },
  computed: {
    userId() {
      return this.$route.params.id ? JSON.parse(this.$route.params.id) : null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      productCounter({ id: this.userId }).then(res => {
        if (res.result.isSuccess) {
          this.list = res.data
        }
      })
    },
    getKeys(obj) {
      return obj ? Object.keys(obj) : []
    },
    statusColor(key) {
      if (key === 'expire'.toUpperCase()) {
        return 'proh'
      } else if (key === 'ok'.toUpperCase()) {
        return 'adopt'
      } else if (key === 'owed'.toUpperCase() || key === 'lock'.toUpperCase()) {
        return 'proh'
      } else if (key === 'will_expire'.toUpperCase()) {
        return 'remind'
      } else if (key === 'total'.toUpperCase()) {
        return ''
      } else {
        return 'remind'
      }
    },
    // 跳转到订单列表方法
    toProductList(type, item) {
      let url = ''
      switch (type.type) {
        case 'cloud_vm':
          url = '/cloud-server-manage/cloud-server/list'
          break
        case 'ddos':
          url = '/ddos-manage/ddos/list'
          break
        case 'idc_cabinet':
          url = '/idc/cabinet-new/list'
          break
        case 'idc_rent':
          url = '/idc/rent-new/list'
          break
        case 'idc_trust':
          url = '/idc/trust-new/list'
          break
        default:
          break
      }
      this.$router.push({
        path: url,
        query: {
          bizStatus: item,
          member: JSON.stringify({
            search: this.userId,
            strict: '0',
            field: 'id'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.generalTab {
  border: 1px solid #ebeef5;
  border-width: 1px 1px 0 0;
  color: #606266;
  width: 100%;
  td,
  th {
    border: 1px solid #ebeef5;
    border-width: 0 0 1px 1px;
    text-align: center;
    padding: 10px;
  }
  tr:nth-child(2n) {
    background: #fafafa;
  }
}
</style>
