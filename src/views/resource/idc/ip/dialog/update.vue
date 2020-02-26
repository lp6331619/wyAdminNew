<template>
  <div>
    <!-- 修改详情 -->
    <el-dialog
      :title="titleBox"
      :visible.sync="setStatusStatus"
      width="500px"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        v-if="(dateBox || scene==='create') && scene!=='status'"
        ref="setDetail"
        v-loading="loading"
        :model="form"
        :rules="formRules"
        auto-complete="on"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="ip:" prop="ip">
          <div v-if="!edit && scene==='edit'">{{ dateBox.ip }}</div>
          <template v-if="edit && prepare">
            <el-input v-model="form.ip" type="text" :disabled="scene===edit" placeholder="请输入ip" />
          </template>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <div v-if="!edit && scene==='edit'">{{ dateBox.type.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option v-for="(val,key) in prepare.type" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="机房:" prop="room">
          <div v-if="!edit && scene==='edit'">{{ dateBox.room.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.room" placeholder="请选择机房" @change="form.line=''">
              <el-option v-for="(val,key) in prepare.room" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="线路:" prop="line">
          <div v-if="!edit && scene==='edit'">{{ dateBox.line.name }}</div>
          <template v-if="edit && prepare">
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
        <el-form-item label="分组:" prop="zone">
          <div v-if="!edit && scene==='edit'">{{ dateBox.zone.name }}</div>
          <template v-if="edit && prepare">
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
        <el-form-item label="所有者:" prop="owner">
          <div v-if="!edit && scene==='edit'">{{ dateBox.owner.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.owner" placeholder="请选择所有者">
              <el-option v-for="(val,key) in prepare.owner" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="在用:" prop="inUse">
          <div v-if="!edit && scene==='edit'">{{ dateBox.useStatus.name }}</div>
          <template v-if="edit && prepare">
            <el-select v-model="form.inUse" placeholder="请选择在用">
              <el-option v-for="(val,key) in prepare.inUse" :key="key" :label="val" :value="key" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="启用:" prop="isEnable">
          <div v-if="!edit && scene==='edit'">{{ dateBox.enableStatus.name }}</div>
          <template v-if="edit && prepare">
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
        <el-form-item v-if="scene==='edit'" label="添加时间">{{ dateBox.stat.createDateTime }}</el-form-item>
        <el-form-item v-if="scene==='edit'" label="修改时间">{{ dateBox.stat.updateDateTime }}</el-form-item>
      </el-form>
      <div v-if="scene==='status' && dateBox">
        <el-form
          v-if="sealUp && dateBox"
          ref="setStatus"
          v-loading="loading"
          :model="formStatus"
          :rules="formRulesStatus"
          auto-complete="on"
          label-width="100px"
          label-position="right"
        >
          <div
            class="tip text-center"
          >确认 {{ dateBox.ddosStatus.block.key === 'OK'?'封停':'解禁' }}IP {{dateBox.ip}}</div>
          <el-form-item label="仅修改状态:" prop="force">
            <el-radio-group v-model="formStatus.force">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注:" prop="note">
            <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="formStatus.note"></el-input>
          </el-form-item>
        </el-form>

        <table v-else class="tableBox text-left" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td class="title">封停状态</td>
            <td>
              {{ dateBox.ddosStatus.block ?dateBox.ddosStatus.block.name:'' }}
              <el-button
                v-if="dateBox.ddosStatus.block.key === 'OK'"
                v-operatePriv="{priv:'resource:idc:ip:block'}"
                size="mini"
                type="primary"
                plain
                class="ml20"
                @click="sealUp=true"
              >封停</el-button>
              <el-button
                v-if="dateBox.ddosStatus.block.key === 'BLOCK'"
                v-operatePriv="{priv:'resource:idc:ip:un_block'}"
                size="mini"
                type="primary"
                plain
                class="ml20"
                @click="sealUp=true"
              >解禁</el-button>
              <span
                v-if="dateBox.ddosStatus.blockDateTime && dateBox.ddosStatus.block.key === 'BLOCK'"
              >{{ dateBox.ddosStatus.blockDateTime }}</span>
            </td>
          </tr>
          <tr>
            <td class="title">攻击状态</td>
            <td>
              {{ dateBox.ddosStatus.attack?dateBox.ddosStatus.attack.name:'' }}
              <span
                v-if="dateBox.ddosStatus.attackDateTime && dateBox.ddosStatus.attack.key === 'ATTACK'"
              >{{ dateBox.ddosStatus.attackDateTime }}</span>
            </td>
          </tr>
          <tr>
            <td class="title">本次攻击最大流量</td>
            <td>{{ dateBox.ddosStatus.maxFlow?dateBox.ddosStatus.maxFlow.valueWithUnit:'' }}</td>
          </tr>
        </table>
      </div>
      <div v-if slot="footer" class="dialog-footer">
        <el-button
          v-if="!edit && scene !=='create' && scene !=='status'"
          v-loading="loading"
          v-operatePriv="{priv:'resource:idc:ip:update'}"
          type="danger"
          @click="editFun"
        >编辑</el-button>
        <el-button
          v-if="(scene ==='create' || edit) || (scene ==='status' && sealUp)"
          @click="handleClose"
        >取 消</el-button>
        <el-button
          v-if="(scene ==='create' || edit) && scene !=='status'"
          type="primary"
          @click="editDetailBox()"
        >确 定</el-button>
        <el-button v-if="scene ==='status' && sealUp" type="primary" @click="editStatus()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  resourceIdcIpCreate,
  resourceIdcIpDetail,
  resourceIdcIpUpdate,
  resourceIdcIpBlock
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
  computed: {
    titleBox() {
      let title = ''
      switch (this.scene) {
        case 'edit':
          title = '修改IP信息'
          break
        case 'create':
          title = '新建IP信息'
          break
        case 'status':
          title = '防御状态'
          break
      }
      return title
    }
  },
  data() {
    return {
      setStatusStatus: false,
      form: {
        ip: '', // "IP"
        type: '', // "类型"
        room: '', // "机房"
        line: '', // "线路"
        zone: '', // "分组"
        owner: '', // "所有者"
        inUse: '', // "是否在用"
        isEnable: '' // "是否启用"
      },
      formRules: {
        ip: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        type: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        room: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        line: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        zone: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        owner: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        inUse: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        isEnable: [{ required: true, trigger: 'blur', message: '不能为空!' }]
      },
      formStatus: {
        ip: '',
        note: '',
        force: 0
      },
      formRulesStatus: {
        force: [{ required: true, trigger: 'blur', message: '不能为空!' }],
        note: [{ required: true, trigger: 'blur', message: '不能为空!' }]
      },
      loading: false,
      prepare: undefined,
      edit: true, // 编辑状态
      dateBox: undefined,
      sealUp: false // 封停状态
    }
  },
  mounted() {
    switch (this.scene) {
      case 'create':
        this.getRuleCreate()
        break
      case 'edit':
      case 'status':
        this.edit = false
        this.getDetail()
        break
    }
    this.setStatusStatus = this.status
  },
  methods: {
    getRuleCreate() {
      resourceIdcIpCreate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
        }
      })
    },
    getRuleEdit() {
      resourceIdcIpUpdate({}, 'prepare').then(res => {
        if (res.result.isSuccess) {
          this.prepare = res.data
          this.edit = true
        }
      })
    },
    getDetail() {
      this.loading = true
      resourceIdcIpDetail({ id: this.operationId }).then(res => {
        if (res.result.isSuccess) {
          const box = res.data
          this.dateBox = res.data
          this.formStatus.ip = this.dateBox.ip
          this.form = {
            ip: box.ip, // "IP"
            id: box.id,
            type: box.type ? box.type.value : '', // "类型"
            room: box.room ? box.room.id : '', // "机房"
            line: box.line ? box.line.id : '', // "线路"
            zone: box.zone ? box.zone.id : '', // "分组"
            owner: box.owner ? box.owner.key : '', // "所有者"
            inUse: box.useStatus ? box.useStatus.key : '', // "是否在用"
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
              resourceIdcIpCreate(this.form).then(res => {
                if (res.result.isSuccess) {
                  this.$message.success(res.result.message)
                  this.emitOut()
                }
              })
              break
            case 'edit':
              delete this.form.ip
              resourceIdcIpUpdate(this.form).then(res => {
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
    editStatus() {
      this.$refs.setStatus.validate(valid => {
        if (valid) {
          resourceIdcIpBlock(this.formStatus).then(res => {
            if (res.result.isSuccess) {
              this.$message.success(res.result.message)
              this.emitOut()
            }
          })
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
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  padding-bottom: 20px;
}
</style>
