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
