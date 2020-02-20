
import request from '@/utils/request'

// 套餐列表
export function businessList(data, schema) {
  return request({
    url: `/business/combo/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 套餐详情
export function businessDetail(data, schema) {
  return request({
    url: `/business/combo/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 套餐新建
export function businessCreate(data, schema) {
  return request({
    url: `/business/combo/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
