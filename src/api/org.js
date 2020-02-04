import request from '@/utils/request'

// 角色列表
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
// 事业部列表
export function orgDeptList(data, schema) {
  return request({
    url: `/org/dept/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 删除事业部
export function orgDeptDelete(data, schema) {
  return request({
    url: `/org/dept/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建事业部
export function orgDeptCreate(data, schema) {
  return request({
    url: `/org/dept/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 事业部详情
export function orgDeptDetail(data, schema) {
  return request({
    url: `/org/dept/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改事业部
export function orgDeptUpdate(data, schema) {
  return request({
    url: `/org/dept/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 事业部列表
export function orgAreaDeptList(data, schema) {
  return request({
    url: `/org/areaDept/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建事业部
export function orgAreaDeptCreate(data, schema) {
  return request({
    url: `/org/areaDept/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 删除事业部
export function orgAreaDeptDelete(data, schema) {
  return request({
    url: `/org/areaDept/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新事业部
export function orgAreaDeptUpdate(data, schema) {
  return request({
    url: `/org/areaDept/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 事业部
export function orgAreaDeptDetail(data, schema) {
  return request({
    url: `/org/areaDept/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

// 分公司部门

// 分公司部门列表
export function orgRoleList(data, schema) {
  return request({
    url: `/org/role/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建分公司部门
export function orgRoleCreate(data, schema) {
  return request({
    url: `/org/role/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 删除分公司部门
export function orgRoleDelete(data, schema) {
  return request({
    url: `/org/role/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新分公司部门
export function orgRoleUpdate(data, schema) {
  return request({
    url: `/org/role/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新分公司部门
export function orgRoleDetail(data, schema) {
  return request({
    url: `/org/role/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

// 角色等级

// 角色等级列表
export function orgRoleLevelList(data, schema) {
  return request({
    url: `/org/roleLevel/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建角色等级
export function orgRoleLevelCreate(data, schema) {
  return request({
    url: `/org/roleLevel/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 删除角色等级
export function orgRoleLevelDelete(data, schema) {
  return request({
    url: `/org/roleLevel/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新角色等级
export function orgRoleLevelUpdate(data, schema) {
  return request({
    url: `/org/roleLevel/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新角色等级
export function orgRoleLevelDetail(data, schema) {
  return request({
    url: `/org/roleLevel/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 事业部角色映射关系详情
export function orgProductRoleDetail(data, schema) {
  return request({
    url: `/org/productRole/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 事业部角色映射关系更新数据
export function orgProductRoleUpdate(data, schema) {
  return request({
    url: `/org/productRole/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

