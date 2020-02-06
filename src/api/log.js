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
