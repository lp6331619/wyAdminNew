
import request from '@/utils/request'

// 新闻公告
export function articleList(data, schema) {
  return request({
    url: `/site/article/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 新闻公告删除
export function articleDelete(data, schema) {
  return request({
    url: `/site/article/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 新闻公告详情
export function articleDetail(data, schema) {
  return request({
    url: `/site/article/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 新闻公告详情编辑
export function articleUpdate(data, schema) {
  return request({
    url: `/site/article/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema === 'schema' ? 'get' : 'post',
    data: data
  })
}// 新闻公告详情编辑
export function articleCreate(data, schema) {
  return request({
    url: `/site/article/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema === 'schema' ? 'get' : 'post',
    data: data
  })
}
// 帮助中心
export function articleHelp(data, schema) {
  return request({
    url: `/site/article/help${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 帮助中心
export function articleGroup(data, schema) {
  return request({
    url: `/site/article/group${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 分类管理
export function articleCateList(data, schema) {
  return request({
    url: `/site/articleCate/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 删除分类
export function articleCateDelete(data, schema) {
  return request({
    url: `/site/articleCate/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 创建分类
export function articleCateCreate(data, schema) {
  return request({
    url: `/site/articleCate/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新分类
export function articleCateUpdate(data, schema) {
  return request({
    url: `/site/articleCate/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 分类详情
export function articleCateDetail(data, schema) {
  return request({
    url: `/site/articleCate/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
