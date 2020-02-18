
import request from '@/utils/request'

export function messageTemplate(data, schema) {
  return request({
    url: `/message/template/templateId${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 消息设置详情
export function messageTemplateDetail(data, schema) {
  return request({
    url: `/message/template/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 消息设置
export function messageTemplateContent(data, schema) {
  return request({
    url: `/message/template/content${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 自定义列表
export function messageSubscribeList(data, schema) {
  return request({
    url: `/message/subscribe/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 删除自定义
export function messageSubscribeDetele(data, schema) {
  return request({
    url: `/message/subscribe/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 自定义详情
export function messageSubscribeDetail(data, schema) {
  return request({
    url: `/message/subscribe/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 新增自定义
export function messageSubscribeCreate(data, schema) {
  return request({
    url: `/message/subscribe/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 新增自定义
export function messageSubscribeUpdate(data, schema) {
  return request({
    url: `/message/subscribe/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 修改分组用户
export function messageSubscribeSetuser(data, schema) {
  return request({
    url: `/message/subscribe/setUser${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
