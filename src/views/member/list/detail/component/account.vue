<template>
  <el-card v-if="detailBool" v-loading="loading" class="box-card">
    <div slot="header" class="header flex">会员列表</div>
    <div class="account">
      <el-row class="SimilarTable">
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">ID</el-col>
            <el-col :span="18" class="contentBox flex">
              <div>
                {{ detailData.id }}
                <span
                  v-if="detailData.passport"
                >( WYID: {{ detailData.passport.wyId }} )</span>
              </div>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:admin_login'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="toMember()"
                >登入账号</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">注册时间</el-col>
            <el-col
              :span="18"
              class="contentBox flex"
            >{{ detailData.stat?detailData.stat.createDateTime:'暂无数据' }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">重要程度</el-col>
            <el-col :span="18" class="contentBox flex">
              <span
                :class="getLevelColor(detailData.importance.key)"
              >{{ detailData.importance?detailData.importance.name:'暂无数据' }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:update_importance'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="updateLevel()"
                >修改</el-button>
                <Configurable
                  v-if="importanceInitData.display"
                  :init-data="importanceInitData"
                  @emitOut="emitOut"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">商业类型</el-col>
            <el-col :span="18" class="contentBox flex">
              <span
                :class="getLevelColor(detailData.businessType.key)"
              >{{ detailData.businessType.name }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:update_business_type'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="businessType()"
                >修改</el-button>
                <Configurable
                  v-if="businessTypeInitData.display"
                  :init-data="businessTypeInitData"
                  @emitOut="emitOut"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">账号状态</el-col>
            <el-col :span="18" class="contentBox flex">
              <span
                :class="selectStatusColor('status',detailData.status.isOk)"
              >{{ detailData.status.name }}</span>
              <div class="btnBox">
                <el-button
                  v-if="!detailData.status.isOk"
                  v-operatePriv="{priv:'user:member:update_status'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="statusDialog('OK')"
                >开启</el-button>
                <el-button
                  v-if="detailData.status.isOk"
                  v-operatePriv="{priv:'user:member:update_status'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="statusDialog('LOCK')"
                >禁用</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">所属行业</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.industry?detailData.industry.name:'暂无数据' }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:update_industry'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="updateindustryBox()"
                >修改</el-button>
                <Configurable
                  v-if="updateindustryInitData.display"
                  :init-data="updateindustryInitData"
                  @emitOut="emitOut"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">实名认证状态</el-col>
            <el-col :span="18" class="contentBox flex">
              <span :class="selectStatusColor('realInfoStatus',detailData.realInfoStatus.key)">
                {{ detailData.realInfoStatus?detailData.realInfoStatus.name:'暂无数据' }}
                <span
                  v-if="detailData.realInfoStatus && detailData.realInfoStatus.key != 'NO' && detailData.realInfoStatus.key != 'REJECT' && detailData.name"
                >({{ detailData.name }})</span>
              </span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:realinfo_detail'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="tabsClick('3')"
                >查看</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">所属销售</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.saler?detailData.saler.name:'暂无数据' }}</span>
              <div class="btnBox">
                <modifySaler
                  v-if="idArray.length>0"
                  :select-table="idArray"
                  :plain="true"
                  @refresh="getData"
                >
                  <slot>修改</slot>
                </modifySaler>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">手机号码</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.mobile }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:update_mobile'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="editSimple('mobile',detailData.mobile)"
                >修改</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">账户余额</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.account?detailData.account.balance.balance:'暂无数据' }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'business:discount:coupon:list'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="getCouponLink()"
                >查看优惠券</el-button>
                <el-button
                  v-operatePriv="{priv:'finance:record:list'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="viewFlow()"
                >查看流水</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">电子邮箱</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.email }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:update_email'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="editSimple('email',detailData.email)"
                >修改</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">累计消费额</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.account?detailData.account.consume.consume:'暂无数据' }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:update_email'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="viewOrder()"
                >查看订单</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">会员等级</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.level?detailData.level.name:'暂无数据' }}</span>
              <div class="btnBox">
                <modifyLevelBox
                  v-if="idArray.length>0"
                  class="fl ml10"
                  :select-table="idArray"
                  :prepare="LevelPrepare"
                  :plain="true"
                  @refresh="getData"
                >
                  <slot>修改</slot>
                </modifyLevelBox>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">
              可开票金额
              <el-tooltip
                class="item"
                effect="dark"
                content="统计可开票的未开票账单及余额未开票金额"
                placement="right"
              >
                <i class="el-icon-warning blue"></i>
              </el-tooltip>
            </el-col>
            <el-col
              :span="18"
              class="contentBox flex"
            >{{ detailData.account?detailData.account.invoice.invoice:'暂无数据' }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">密码</el-col>
            <el-col :span="18" class="contentBox flex">
              <span></span>
              <div class="btnBox">
                <Password
                  v-operatePriv="{priv:'user:member:set_password'}"
                  :init-data="passwordInit"
                  @reset="getData"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">
              已开票金额
              <el-tooltip class="item" effect="dark" content="统计历史账单及余额已开票金额" placement="right">
                <i class="el-icon-warning blue"></i>
              </el-tooltip>
            </el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.account?detailData.account.invoice.out.amount:'暂无数据' }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'finance:invoice:list'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="viewInvoice"
                >查看</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">客户所属区域</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.region?detailData.region.name : '暂无数据' }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'user:member:update_region'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="updateregion"
                >修改</el-button>
                <Configurable
                  v-if="updateregionInitData.display"
                  :init-data="updateregionInitData"
                  @emitOut="emitOut"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6" class="title">即将到期产品</el-col>
            <el-col :span="18" class="contentBox flex">
              <span>{{ detailData.willExpireProduct || '暂无数据' }}</span>
              <div class="btnBox">
                <el-button
                  v-operatePriv="{priv:'product:cloud_vm:list'}"
                  size="mini"
                  type="primary"
                  plain
                  @click="viewProduct"
                >查看</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import {
  toMember,
  updateimportance,
  updatebusinesstype,
  updateStatus,
  updateindustry,
  updateMobile,
  updateEmail,
  modifyLevel,
  updateregion
} from '@/api/member'
import { Configurable, Password } from '@/components/Dialog'
import modifySaler from '../../list/dialog/modifySaler.vue'
import modifyLevelBox from '../../list/dialog/modifyLevel.vue'
import request from '@/utils/request'
export default {
  name: 'Account',
  components: {
    Configurable,
    Password,
    modifySaler,
    modifyLevelBox
  },
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      importanceInitData: {
        title: '修改重要程度',
        display: false,
        formLabelWidth: '80px',
        width: '500px',
        tip: '当前重要程度:',
        type: 'importance',
        typeData: [
          {
            type: 'select',
            name: 'importance',
            itemName: '请选择客户重要程度',
            title: '重要程度'
          }
        ],
        form: {
          importance: ''
        }
      },
      businessTypeInitData: {
        title: '修改商业类型',
        display: false,
        formLabelWidth: '80px',
        width: '500px',
        tip: '当前商业类型:',
        type: 'businessType',
        typeData: [
          {
            type: 'select',
            name: 'businessType',
            itemName: '请选择商业类型',
            title: '商业类型'
          }
        ],
        form: {
          businessType: ''
        }
      },
      updateindustryInitData: {
        title: '修改所属行业',
        display: false,
        formLabelWidth: '80px',
        width: '500px',
        tip: '当前所属行业:',
        type: 'industry',
        typeData: [
          {
            type: 'inputSelect',
            name: 'industry',
            itemName: '请选择所属行业',
            title: '所属行业'
          }
        ],
        form: {
          industry: ''
        }
      },
      updateregionInitData: {
        title: '修改客户所属区域',
        display: false,
        formLabelWidth: '80px',
        width: '500px',
        tip: '当前客户所属区域:',
        type: 'region',
        typeData: [
          {
            type: 'select',
            name: 'region',
            itemName: '请选择客户所属区域',
            title: '所属区域'
          }
        ],
        form: {
          region: ''
        }
      },
      loading: false,
      // 当前 id
      idArray: [],
      userId: this.$route.params.id ? JSON.parse(this.$route.params.id) : null,
      // 等级 prepare
      LevelPrepare: [],
      // 修改密码
      passwordInit: {
        display: false,
        id: this.$route.params.id ? JSON.parse(this.$route.params.id) : null
      }
    }
  },
  computed: {
    detailBool() {
      return JSON.stringify(this.detailData) !== '{}'
    }
  },
  mounted() {
    // 获取 id
    this.idArray = [{ id: JSON.parse(this.$route.params.id) }]
    // 获取会员等级
    modifyLevel({}, 'prepare').then(res => {
      if (res.result.isSuccess) {
        const box = []
        for (const i in res.data.userLevels) {
          box.push(res.data.userLevels[i])
        }
        this.LevelPrepare = box
      }
    })
  },
  methods: {
    // 登录账号
    toMember() {
      toMember({ id: this.detailData.id }).then(res => {
        if (res.result.isSuccess) {
          window.open(res.data.url, '_blank')
        }
      })
    },
    // 重要程度 颜色
    getLevelColor(key) {
      if (key === 'WILL_VIP' || key === 'COMPANY') {
        return 'adopt'
      } else if (key === 'PERSONAL' || key === 'VIP') {
        return 'link'
      } else if (key === 'SUPER_VIP' || key === 'CDN') {
        return 'remind'
      } else if (key === 'AGENT' || key === 'DIAMOND_VIP') {
        return 'proh'
      } else {
        return ''
      }
    },
    // 根据状态选择状态颜色颜色
    selectStatusColor(type, status) {
      if (type === 'status') {
        if (status) {
          return 'adopt'
        } else {
          return 'proh'
        }
      } else if (type === 'realInfoStatus') {
        if (status === 'AUDIT') {
          return 'remind'
        } else if (status === 'OK') {
          return 'adopt'
        } else {
          return 'proh'
        }
      }
    },
    // 修改会员等级弹窗
    updateLevel() {
      updateimportance({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.importanceInitData.prepare = res.data
          this.importanceInitData.form.importance = this.detailData.importance.name
          this.importanceInitData.display = true
          this.importanceInitData.tip = `当前重要程度:${this.detailData.importance.name}`
        }
      })
    },
    // 修改商业类型弹窗
    businessType() {
      updatebusinesstype({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          const prepare = res.data
          this.businessTypeInitData.prepare = prepare
          this.businessTypeInitData.form.businessType = this.detailData.businessType.name
          this.businessTypeInitData.display = true
          this.businessTypeInitData.tip = `当前商业类型:${this.detailData.businessType.name}`
        }
      })
    },
    // 改变账号状态
    updateStatus(s) {
      updateStatus({
        id: this.detailData.id,
        status: s
      }).then(res => {
        this.getData()
        this.$message.success(res.result.message)
      })
    },
    // 改变账号状态
    statusDialog(s) {
      if (s === 'LOCK') {
        this.$confirm('禁用后将无法登入账号请谨慎操作!', '状态', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.updateStatus(s)
          })
          .catch(() => {})
      } else {
        this.updateStatus(s)
      }
    },
    // 修改所属行业
    updateindustryBox() {
      updateindustry({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          const prepare = res.data
          this.updateindustryInitData.prepare = prepare
          this.updateindustryInitData.form.industry = this.detailData.industry.key
          this.updateindustryInitData.display = true
          this.updateindustryInitData.tip = `当前所属行业:${this.detailData.industry.name}`
        }
      })
    },
    // 修改电话
    editSimple(e, data) {
      let title = ''
      let pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      switch (e) {
        case 'mobile':
          title = '手机号码'
          pattern = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
          break

        case 'email':
          title = '邮箱'
          pattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
          break
      }
      this.$prompt(`旧${title}:${data}`, '修改手机号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: pattern,
        inputErrorMessage: '格式不正确!'
      })
        .then(({ value }) => {
          switch (e) {
            case 'mobile':
              updateMobile({
                id: JSON.parse(this.$route.params.id),
                mobile: value,
                mobileAuth: 1
              }).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.getData()
                }
              })
              break
            case 'email':
              updateEmail({
                id: JSON.parse(this.$route.params.id),
                email: value,
                emailAuth: 1
              }).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.getData()
                }
              })
              break
          }
        })
        .catch(() => {})
    },
    // 导出数据
    emitOut(e) {
      if (!e.close) {
        this.loading = true
        e.form.id = this.detailData.id
        let url = ''
        switch (e.type) {
          // 重要程度
          case 'importance':
            url = '/user/member/updateimportance'
            break
          // 商业类型
          case 'businessType':
            url = '/user/member/updatebusinesstype'
            break
          // 行业类型
          case 'industry':
            url = '/user/member/updateindustry'
            break
          // 客户所属地区
          case 'region':
            url = '/user/member/updateregion'
            break
        }
        request({
          url: url,
          method: 'post',
          data: e.form
        }).then(res => {
          if (res.result.isSuccess) {
            this.$message.success(res.result.message)
            this.getData()
          }
          this.loading = false
        })
      }
    },
    // 获取数据
    getData() {
      this.$emit('getData', true)
    },
    // 查看优惠券
    getCouponLink() {
      this.$router.push({
        path: '/coupon-manage/coupon-list/list',
        query: {
          member: JSON.stringify({
            field: '',
            search: this.detailData.id,
            strict: '0'
          })
        }
      })
    },
    // 点击查看流水
    // 暂时是靠模糊搜索
    viewFlow() {
      const memberJson = {
        search: this.userId,
        strict: '1',
        field: 'id'
      }
      const searchGather = {
        page: 1,
        pageSize: 10,
        payment: '',
        recordType: '',
        member: JSON.stringify(memberJson)
      }
      this.$router.push({ path: '/finance/flow/list', query: searchGather })
    },
    // 查看订单
    viewOrder() {
      const memberJson = {
        search: this.userId,
        strict: '1',
        field: 'id'
      }
      const searchGather = {
        page: 1,
        member: JSON.stringify(memberJson)
      }
      this.$router.push({
        path: '/order/orderlist/list',
        query: searchGather
      })
    },
    // 切换tab
    tabsClick(e) {
      this.$emit('tabsClick', { index: e })
    },
    // 查看已开票金额
    viewInvoice() {
      const memberJson = {
        search: this.userId,
        strict: '1',
        field: 'id'
      }
      const searchGather = {
        page: 1,
        member: JSON.stringify(memberJson)
      }
      this.$router.push({ path: '/finance/invoice/list', query: searchGather })
    },
    // 修改会员等级弹窗
    updateregion() {
      updateregion({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.updateregionInitData.prepare = res.data
          this.updateregionInitData.form.region = this.detailData.region.name
          this.updateregionInitData.display = true
          this.updateregionInitData.tip = `当前所属区域:${this.detailData.region.name}`
        }
      })
    },
    // 查看即将到期的产品,目前没有产品列表,只能先查看云服务器列表
    viewProduct() {
      const memberJson = {
        search: this.userId,
        strict: '1',
        field: 'id'
      }
      const searchGather = {
        page: 1,
        member: JSON.stringify(memberJson),
        bizStatus: 'WILL_EXPIRE'
      }
      this.$router.push({
        path: '/cloud-server-manage/cloud-server/list',
        query: searchGather
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
