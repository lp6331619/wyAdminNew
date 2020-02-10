
import request from '@/utils/request'

// 快递列表
export function expressList(data, schema) {
  return request({
    url: `/express/express/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 快递详情
export function expressDetail(data, schema) {
  return request({
    url: `/express/express/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建快递
export function expressCreate(data, schema) {
  return request({
    url: `/express/express/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 快递公司列表
export function expressCompanyList(data, schema) {
  return request({
    url: `/express/company/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 快递公司详情
export function expressCompanyDetail(data, schema) {
  return request({
    url: `/express/company/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建快递公司
export function expressCompanyCreate(data, schema) {
  return request({
    url: `/express/company/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建快递公司
export function expressCompanyDelete(data, schema) {
  return request({
    url: `/express/company/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

