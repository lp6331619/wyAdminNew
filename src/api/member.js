import request from '@/utils/request'
// 获取会员列表
export function getMemberList(data, schema) {
  return request({
    url: `/user/member/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
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
