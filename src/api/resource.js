import request from '@/utils/request'

// 云服务器资源节点列表
export function resourceCloudNodeList(data, schema) {
  return request({
    url: `/resource/cloud/node/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点 创建
export function resourceCloudNodeCreate(data, schema) {
  return request({
    url: `/resource/cloud/node/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点 详情
export function resourceCloudNodeDetail(data, schema) {
  return request({
    url: `/resource/cloud/node/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点 更新
export function resourceCloudNodeUpdate(data, schema) {
  return request({
    url: `/resource/cloud/node/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -------云服务器资源节点 线路
export function resourceCloudLineList(data, schema) {
  return request({
    url: `/resource/cloud/node/line/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点详情
export function resourceCloudLineDetail(data, schema) {
  return request({
    url: `/resource/cloud/node/line/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点更新
export function resourceCloudLineUpdate(data, schema) {
  return request({
    url: `/resource/cloud/node/line/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点 创建
export function resourceCloudLineCreate(data, schema) {
  return request({
    url: `/resource/cloud/node/line/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ----- 镜像
// -------云服务器资源节点 镜像
export function resourceCloudImageList(data, schema) {
  return request({
    url: `/resource/cloud/node/image/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点镜像详情
export function resourceCloudImageDetail(data, schema) {
  return request({
    url: `/resource/cloud/node/image/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点镜像更新
export function resourceCloudImageUpdate(data, schema) {
  return request({
    url: `/resource/cloud/node/image/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点镜像创建
export function resourceCloudImageCreate(data, schema) {
  return request({
    url: `/resource/cloud/node/image/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ----- 节点 磁盘类型
// -------云服务器资源节点 磁盘类型
export function resourceCloudNodeDiskTypeList(data, schema) {
  return request({
    url: `/resource/cloud/node/diskType/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点磁盘类型详情
export function resourceCloudNodeDiskTypeDetail(data, schema) {
  return request({
    url: `/resource/cloud/node/diskType/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点磁盘类型更新
export function resourceCloudNodeDiskTypeUpdate(data, schema) {
  return request({
    url: `/resource/cloud/node/diskType/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点磁盘类型创建
export function resourceCloudNodeDiskTypeCreate(data, schema) {
  return request({
    url: `/resource/cloud/node/diskType/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -----
// ----- 节点 cpu内存
// -------云服务器资源节点 cpu内存
export function resourceCloudNodeCpuMemList(data, schema) {
  return request({
    url: `/resource/cloud/node/cpuMem/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点cpu内存详情
export function resourceCloudNodeCpuMemDetail(data, schema) {
  return request({
    url: `/resource/cloud/node/cpuMem/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点cpu内存更新
export function resourceCloudNodeCpuMemUpdate(data, schema) {
  return request({
    url: `/resource/cloud/node/cpuMem/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源节点cpu内存创建
export function resourceCloudNodeCpuMemCreate(data, schema) {
  return request({
    url: `/resource/cloud/node/cpuMem/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -----
// 云服务器资源磁盘类型列表
export function resourceCloudDiskTypeList(data, schema) {
  return request({
    url: `/resource/cloud/diskType/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源操作系统版本列表
export function resourceOsVersionList(data, schema) {
  return request({
    url: `/resource/os/version/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源IP列表
export function resourceCloudIpList(data, schema) {
  return request({
    url: `/resource/cloud/noipde/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
