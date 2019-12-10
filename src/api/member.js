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
    url: `/user/member/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
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
