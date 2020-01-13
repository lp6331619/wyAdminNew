import request from '@/utils/request'
// 获取会员列表
export function getMemberList(data, schema) {
  return request({
    url: `/user/member/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 获取会员列表统计
export function getMemberCount() {
  return request({
    url: '/user/member/count',
    method: 'post'
  })
}
// 创建 会员
export function createMember(data, schema) {
  return request({
    url: `/user/member/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 关联用户
export function relationUser(data, schema) {
  return request({
    url: `/user/member/addAssociation${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改会员等级
export function modifyLevel(data, schema) {
  return request({
    url: `/user/member/updateLevel${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 获取销售列表
export function getUserList(data, schema) {
  return request({
    url: `/org/user/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改所属销售
export function modifySaler(data, schema) {
  return request({
    url: `/user/member/updateSaler${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 登录会员
export function toMember(data, schema) {
  return request({
    url: `/user/member/adminLogin${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 获取会员详情
export function getMemberDetail(data, schema) {
  return request({
    url: `/user/member/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 员工列表
export function getOrgLIst(data, schema) {
  return request({
    url: `/org/user/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 会员详情
export function getDetail(data, schema) {
  return request({
    url: `/user/member/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改重要程度
export function updateimportance(data, schema) {
  return request({
    url: `/user/member/updateimportance${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改商业类型
export function updatebusinesstype(data, schema) {
  return request({
    url: `/user/member/updatebusinesstype${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改账号状态
export function updateStatus(data, schema) {
  return request({
    url: `/user/member/updateStatus${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改所属行业
export function updateindustry(data, schema) {
  return request({
    url: `/user/member/updateindustry${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改电话
export function updateMobile(data, schema) {
  return request({
    url: `/user/member/updateMobile${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改邮箱
export function updateEmail(data, schema) {
  return request({
    url: `/user/member/updateEmail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改密码
export function setPassword(data, schema) {
  return request({
    url: `/user/member/setPassword${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改所属地区
export function updateregion(data, schema) {
  return request({
    url: `/user/member/updateregion${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 会员产品统计
export function productCounter(data, schema) {
  return request({
    url: `/user/member/productCounter${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改用户联系人
export function updateContact(data, schema) {
  return request({
    url: `/user/member/updateContact${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 实名审核
export function realInfoAudit(data, schema) {
  return request({
    url: `/user/member/realInfoAudit${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 实名详情
export function realInfoMemberDetail(data, schema) {
  return request({
    url: `/user/member/realInfoMemberDetail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// 实名列表
export function realInfoList(data, schema) {
  return request({
    url: `/user/member/realInfoList${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// 实名详情
export function realInfoDetail(data, schema) {
  return request({
    url: `/user/member/realInfoDetail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 会员登录日志列表
export function memberLoginLog(data, schema) {
  return request({
    url: `/log/memberLoginLog/list${schema ? schema === 'withSchema' ? `?_withSchema=all&memberId=${data.id}` : '?_prepare=1' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: schema === 'withSchema' ? '' : data
  })
}
// 操作日志列表
export function opLogList(data, schema) {
  return request({
    url: `/log/opLog/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 申请实名
export function applyRealInfo(data, schema) {
  return request({
    url: `/user/member/applyRealInfo${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 实名更新
export function realInfoUpdate(data, schema) {
  return request({
    url: `/user/member/realInfoUpdate${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 实名统计
export function realInfoCount(data, schema) {
  return request({
    url: `/user/member/realInfo/count${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

// 实名统计
export function realInfoLogList(data, schema) {
  return request({
    url: `/user/member/realInfoLogList${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// 会员通行证列表
export function passportList(data, schema) {
  return request({
    url: `/user/passport/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 会员通行证
export function passportUpdate(data, schema) {
  return request({
    url: `/user/passport/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 会员通行证详情
export function passportDetail(data, schema) {
  return request({
    url: `/user/passport/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

// 会员等级折扣详情
export function discountDetail(data, schema) {
  return request({
    url: `/user/level/discountDetail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
