import request from '@/utils/request'

/**
 * 获取白名单列表
 */
export function getDomainwhiteList(data, schema) {
  return request({
    url: `/netsec/domainwhitelist/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
/**
 * 保存审核结果
 */
export function savaStatus(data, schema) {
  return request({
    url: `/netsec/domainwhitelist/setauditstatus${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
/**
 * 创建
 */
export function createDomainwhite(data, schema) {
  return request({
    url: `/netsec/domainwhitelist/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
/**
 * 更新
 */
export function updateDomainwhite(data) {
  return request({
    url: '/netsec/domainwhitelist/update',
    method: 'post',
    data: data
  })
}
/**
 * 查询产品
 */
export function findproduct(data) {
  return request({
    url: '/netsec/domainwhitelist/findproduct',
    method: 'post',
    data: data
  })
}
/**
 * 获取详情
 */
export function detail(data) {
  return request({
    url: '/netsec/domainwhitelist/detail',
    method: 'post',
    data: data
  })
}
/**
 * 检车域名
 */
export function checkdomain(data) {
  return request({
    url: '/netsec/domainwhitelist/checkdomain',
    method: 'post',
    data: data
  })
}
/**
 * 检查备案
 */
export function checkbeian(data) {
  return request({
    url: '/netsec/domainwhitelist/checkbeian',
    method: 'post',
    data: data
  })
}
/**
 * 获取日志
 */
export function getLog(data) {
  return request({
    url: '/netsec/domainwhitelist/log',
    method: 'post',
    data: data
  })
}
/**
 * 获取防火墙
 */
export function getFirewallList(data) {
  return request({
    url: `/resource/idc/firewall/list`,
    method: 'post',
    data: data
  })
}
/**
 * 导入防火墙
 */
export function importfirewall(data) {
  return request({
    url: '/netsec/domainwhitelist/importfirewall',
    method: 'post',
    data: data
  })
}
/**
 * 产品域名限制管理列表
 */
export function getDomainLimitList(data, schema) {
  return request({
    url: `/netsec/domainLimit/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
/**
 * 获取全局列表
 */
export function getGlobalList(data) {
  return request({
    url: '/netsec/domainlimit/globallist',
    method: 'post',
    data: data
  })
}
/**
 * 更新
 */
export function globalUpdate(data) {
  return request({
    url: '/netsec/domainlimit/globalupdate',
    method: 'post',
    data: data
  })
}
/**
 * 更新限制数量
 */
export function updateNum(data) {
  return request({
    url: '/netsec/domainlimit/update',
    method: 'post',
    data: data
  })
}
/**
 * 获取类别列表
 */
export function getCateList(data, schema) {
  return request({
    url: `/netsec/cate/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: 'post',
    data: data
  })
}
/**
 * 新增类别
 */
export function createCate(data) {
  return request({
    url: '/netsec/cate/create',
    method: 'post',
    data: data
  })
}
/**
 * 更新类别
 */
export function updateCate(data) {
  return request({
    url: '/netsec/cate/update',
    method: 'post',
    data: data
  })
}
/**
 * 删除类别
 */
export function deleteCate(data) {
  return request({
    url: '/netsec/cate/delete',
    method: 'post',
    data: data
  })
}
/**
 * 获取有害信息列表
 */
export function getHarmfulList(data, schema) {
  return request({
    url: `/netsec/harmfullist/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: 'post',
    data: data
  })
}
/**
 * 处理有害信息
 */
export function setProcess(data, schema) {
  return request({
    url: `/netsec/harmfullist/setprocess${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: 'post',
    data: data
  })
}
