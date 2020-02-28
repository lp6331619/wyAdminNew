<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="`${scene==='edit'?'修改':'新建'}IP分组`"
      :visible.sync="setStatusStatus"
      width="700px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        v-if="dateBox || scene==='create'"
        ref="setDetail"
        v-loading="loading"
        :class="{'upDate': !edit}"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-width="100px"
        label-position="right"
      >
        <el-form-item v-if="scene==='create'" label="IP段:" prop="cidr">
          <el-input v-model="form.cidr" type="text" placeholder="请输入IP段" />
        </el-form-item>
        <el-form-item v-if="scene==='create'" label="网关地址:" prop="gatewayIp">
          <div v-if="!edit && scene==='edit'">{{ dateBox.gatewayIp }}</div>
          <template v-if="edit">
            <el-input v-model="form.gatewayIp" placeholder="请输入网关地址" />
          </template>
        </el-form-item>
        <el-form-item class="null" label="类型:" prop="type">
          <div v-if="!edit && scene==='edit'">{{ dateBox.type.name }}</div>
          <template v-if="edit && prepare ">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option v-for="(val,key) in prepare.type" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item class="null" label="机房:" prop="room">
          <div v-if="!edit && scene==='edit'">{{ dateBox.room.name }}</div>
          <template v-if="edit && prepare ">
            <el-select v-model="form.room" placeholder="请选择机房" @change="form.line = ''">
              <el-option v-for="(val,key) in prepare.room" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item class="null" label="线路:" prop="line">
          <div v-if="!edit && scene==='edit'">{{ dateBox.line.name }}</div>
          <template v-if="edit && prepare ">
            <el-select v-model="form.line" placeholder="请选择线路">
              <el-option
                v-for="(val,key) in prepare.line[form.room]"
                :key="key"
                :label="val"
                :value="key"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item class="null" label="分组:" prop="zone">
          <div v-if="!edit && scene==='edit'">{{ dateBox.zone.name }}</div>
          <template v-if="edit && prepare ">
            <el-select v-model="form.zone" placeholder="请选择分组">
              <el-option
                v-for="(val,key) in prepare.ipzone"
                :key="key"
                :label="val.name"
                :value="val.id"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item class="null" label="所有者:" prop="owner">
          <div v-if="!edit && scene==='edit'">{{ dateBox.owner.name }}</div>
          <template v-if="edit && prepare ">
            <el-select v-model="form.owner" placeholder="请选择所有者">
              <el-option v-for="(val,key) in prepare.owner" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item class="null" label="在用:" prop="inUse">
          <div v-if="!edit && scene==='edit'">{{ dateBox.useStatus.name }}</div>
          <template v-if="edit && prepare ">
            <el-select v-model="form.inUse" placeholder="请选择在用">
              <el-option v-for="(val,key) in prepare.inUse" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item class="null" label="启用:" prop="isEnable">
          <div v-if="!edit && scene==='edit'">{{ dateBox.enableStatus.name }}</div>
          <template v-if="edit && prepare ">
            <el-select v-model="form.isEnable" placeholder="请选择启用">
              <el-option
                v-for="(val,key) in prepare.isEnable"
                :key="key"
                :label="val"
                :value="key"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item class="null" label="内部:" prop="isInner">
          <div v-if="!edit && scene==='edit'">{{ dateBox.innerStatus.name }}</div>
          <template v-if="edit && prepare ">
            <el-select v-model="form.isInner" placeholder="请选择内部">
              <el-option v-for="(val,key) in prepare.isInner" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <template v-if="scene==='edit'">
          <el-form-item class="null" label="添加时间">{{ dateBox.stat.createDateTime }}</el-form-item>
          <el-form-item class="null" label="修改时间">{{ dateBox.stat.updateDateTime }}</el-form-item>
          <div class="tip">IP段信息</div>
          <el-form-item class="null" label="IP段:" prop="cidr">
            <div v-if="!edit && scene==='edit'">{{ dateBox.cidr }}</div>
            <template v-if="edit">
              <el-input v-model="form.cidr" placeholder="请输入IP段" />
            </template>
          </el-form-item>
          <el-form-item class="null" label="Ip 总数">{{ dateBox.cidrInfo?dateBox.cidrInfo.ipNum:'' }}</el-form-item>
          <el-form-item class="null" label="网关地址:" prop="gatewayIp">
            <div v-if="!edit && scene==='edit'">{{ dateBox.gatewayIp }}</div>
            <template v-if="edit">
              <el-input v-model="form.gatewayIp" placeholder="请输入网关地址" />
            </template>
          </el-form-item>
          <el-form-item
            class="null"
            label="网络地址"
          >{{ dateBox.cidrInfo?dateBox.cidrInfo.networkIp:'' }}</el-form-item>
          <el-form-item
            class="null"
            label="广播地址"
          >{{ dateBox.cidrInfo?dateBox.cidrInfo.broadcastIp:'' }}</el-form-item>
          <div class="tip">互联地址</div>
          <el-form-item class="null" label="互联地址">{{ dateBox.routeInfo?dateBox.routeInfo.cidr:'' }}</el-form-item>
          <el-form-item
            class="null"
            label="本地互联地址"
          >{{ dateBox.routeInfo?dateBox.routeInfo.localIp:'' }}</el-form-item>
          <el-form-item
            class="null"
            label="对端互联地址"
          >{{ dateBox.routeInfo?dateBox.routeInfo.remoteIp:'' }}</el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:idc:cidr:update'}"
          type="danger"
          @click="editFun"
        >编辑</el-button>
        <el-button v-if="scene ==='create' || edit" @click="handleClose">取 消</el-button>
        <el-button v-if="scene ==='create' || edit" type="primary" @click="editDetailBox()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  resourceIdcCidrCreate,
  resourceIdcCidrDetail,
  resourceIdcCidrUpdate
} from '@/api/resource'
export default {
  name: 'EditUpdate',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    operationId: {
      type: Number,
      default: null
    },
    scene: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      setStatusStatus: false,
      form: {
        type: '', // "类型"
        cidr: '', // "IP段"
        gatewayIp: '', // "网关地址"
        room: '', // "机房"
        line: '', // "线路"
        zone: '', // "分组"
        owner: '', // "所有者"
        inUse: '', // "是否在用"
        isInner: '', // "是否内部使用"
        isEnable: '' // "是否启用"
      },
      formRules: {
        type: [{ required: true, trigger: 'change', message: '不能为空!' }],
        cidr: [{ required: true, trigger: 'change', message: '不能为空!' }],
        gatewayIp: [
          { required: true, trigger: 'change', message: '不能为空!' }
        ],
        room: [{ required: true, trigger: 'change', message: '不能为空!' }],
        line: [{ required: true, trigger: 'change', message: '不能为空!' }],
        zone: [{ required: true, trigger: 'change', message: '不能为空!' }],
        owner: [{ required: true, trigger: 'change', message: '不能为空!' }],
        inUse: [{ required: true, trigger: 'change', message: '不能为空!' }],
        isInner: [{ required: true, trigger: 'change', message: '不能为空!' }],
        isEnable: [{ required: true, trigger: 'change', message: '不能为空!' }]
      },
      loading: false,
      prepare: undefined,
      edit: true, // 编辑状态
      dateBox: undefined
    }
  },
  mounted() {
    switch (this.scene) {
      case 'create':
        this.getRuleCreate()
        break
      case 'edit':
        this.edit = false
        this.getDetail()
        break
    }
    this.setStatusStatus = this.status
  },
  methods: {
    getRuleCreate() {
      resourceIdcCidrCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceIdcCidrUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceIdcCidrDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          this.form = {
            id: box.id,
            type: box.type ? box.type.key : '', // "类型"
            cidr: box.cidr, // "IP段"
            gatewayIp: box.gatewayIp, // "网关地址"
            room: box.room ? box.room.id : '', // "机房"
            line: box.line ? box.line.id : '', // "线路"
            zone: box.zone ? box.zone.id : '', // "分组"
            owner: box.owner ? box.owner.key : '', // "所有者"
            inUse: box.useStatus ? box.useStatus.key : '', // "是否在用"
            isInner: box.innerStatus ? box.innerStatus.key : '', // "是否内部使用"
            isEnable: box.enableStatus ? box.enableStatus.key : '' // "是否启用"
          }
          this.loading = false
        }
      })
    },
    editDetailBox() {
      this.$refs.setDetail.validate(valid => {
        if (valid) {
          switch (this.scene) {
            case 'create':
              resourceIdcCidrCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceIdcCidrUpdate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
          }
        }
      })
    },
    // 传出数据
    emitOut() {
      this.$emit('emitOut', this.setStatusStatus)
    },
    // 关闭传出
    handleClose() {
      this.$emit('emitOut', this.setStatusStatus, true)
    },
    // 编辑状态
    editFun() {
      this.getRuleEdit()
    }
  }
}
</script>
<style lang="scss" scoped>
.tip {
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
</style>
