import request from '@/utils/request'

// IP资源使用日志列表
export function resourceLogList(data, schema) {
  return request({
    url: `/resource/log/ownerLog/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 操作日志
export function opLogList(data, schema) {
  return request({
    url: `/log/opLog/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 会员登录日志
export function opMemberLoginLogList(data, schema) {
  return request({
    url: `/log/memberLoginLog/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 会员登录日志详情
export function opMemberLoginLogDetail(data, schema) {
  return request({
    url: `/log/memberLoginLog/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 员工登录日志
export function userLoginLogList(data, schema) {
  return request({
    url: `/log/userLoginLog/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 员工登录日志详情
export function userLoginLogDetail(data, schema) {
  return request({
    url: `/log/userLoginLog/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 错误日志
export function errorLogList(data, schema) {
  return request({
    url: `/log/errorLog/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 错误日志详情
export function errorLogDetail(data, schema) {
  return request({
    url: `/log/errorLog/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}// 后台任务
export function sysTaskList(data, schema) {
  return request({
    url: `/log/sysTask/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 后台任务详情
export function sysTaskDetail(data, schema) {
  return request({
    url: `/log/sysTask/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

