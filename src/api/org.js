import request from '@/utils/request'

// 新建会员等级折扣
export function orgUserList(data, schema) {
  return request({
    url: `/org/user/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 删除会员
export function orgUserDelete(data, schema) {
  return request({
    url: `/org/user/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 会员详情
export function orgUserDetail(data, schema) {
  return request({
    url: `/org/user/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 登录会员
export function orgUserAdminLogin(data, schema) {
  return request({
    url: `/org/user/adminLogin${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改密码
export function orgUserUpdatePassword(data, schema) {
  return request({
    url: `/org/user/updatePassword${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改状态
export function orgUserUpdateStatus(data, schema) {
  return request({
    url: `/org/user/updateStatus${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改详情
export function orgUserUpdate(data, schema) {
  return request({
    url: `/org/user/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 设置二次密码
export function orgUserSetSeccode(data, schema) {
  return request({
    url: `/org/user/setSeccode${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建员工
export function orgUserCreate(data, schema) {
  return request({
    url: `/org/user/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新角色
export function orgUserUpdateRoles(data, schema) {
  return request({
    url: `/org/user/updateRoles${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

// 分公司列表
export function orgAreaList(data, schema) {
  return request({
    url: `/org/area/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建分公司
export function orgAreaCreate(data, schema) {
  return request({
    url: `/org/area/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 删除分公司
export function orgAreaDelete(data, schema) {
  return request({
    url: `/org/area/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新分公司
export function orgAreaUpdate(data, schema) {
  return request({
    url: `/org/area/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 分公司详情
export function orgAreaDetail(data, schema) {
  return request({
    url: `/org/area/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
