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
// 云服务器资源 磁盘类型列表
export function resourceCloudDiskTypeList(data, schema) {
  return request({
    url: `/resource/cloud/diskType/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源 磁盘类型详情
export function resourceCloudDiskTypeDetail(data, schema) {
  return request({
    url: `/resource/cloud/diskType/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源 磁盘类型创建
export function resourceCloudDiskTypeCreate(data, schema) {
  return request({
    url: `/resource/cloud/diskType/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源 磁盘类型更新
export function resourceCloudDiskTypeUpdate(data, schema) {
  return request({
    url: `/resource/cloud/diskType/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ----
// 云服务器资源操作系统版本列表
export function resourceOsVersionList(data, schema) {
  return request({
    url: `/resource/os/version/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源操作系统版本 详情
export function resourceOsVersionDetail(data, schema) {
  return request({
    url: `/resource/os/version/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源操作系统版本 更新
export function resourceOsVersionUpdate(data, schema) {
  return request({
    url: `/resource/os/version/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 云服务器资源操作系统版本 创建
export function resourceOsVersionCreate(data, schema) {
  return request({
    url: `/resource/os/version/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -------云服务器资源IP列表
export function resourceCloudIpList(data, schema) {
  return request({
    url: `/resource/cloud/ip/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// 详情
export function resourceCloudIpDetail(data, schema) {
  return request({
    url: `/resource/cloud/ip/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// 更新
export function resourceCloudIpUpdate(data, schema) {
  return request({
    url: `/resource/cloud/ip/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -------
// ddos资源 区域列表
export function resourceDDosRegionList(data, schema) {
  return request({
    url: `/resource/ddos/region/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// ddos资源 区域详情
export function resourceDDosRegionDetail(data, schema) {
  return request({
    url: `/resource/ddos/region/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ddos资源 区域更新
export function resourceDDosRegionUpdate(data, schema) {
  return request({
    url: `/resource/ddos/region/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ddos资源 区域创建
export function resourceDDosRegionCreate(data, schema) {
  return request({
    url: `/resource/ddos/region/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -------
// ddos资源 线路列表
export function resourceDDosRegionLineList(data, schema) {
  return request({
    url: `/resource/ddos/region/line/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// ddos资源 线路详情
export function resourceDDosRegionLineDetail(data, schema) {
  return request({
    url: `/resource/ddos/region/line/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ddos资源 线路更新
export function resourceDDosRegionLineUpdate(data, schema) {
  return request({
    url: `/resource/ddos/region/line/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ddos资源 线路创建
export function resourceDDosRegionLineCreate(data, schema) {
  return request({
    url: `/resource/ddos/region/line/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -------
// ddos资源 IP列表
export function resourceDDosReginIpList(data, schema) {
  return request({
    url: `/resource/ddos/ip/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// ddos资源 IP详情
export function resourceDDosReginIpDetail(data, schema) {
  return request({
    url: `/resource/ddos/ip/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ddos资源 IP更新
export function resourceDDosReginIpUpdate(data, schema) {
  return request({
    url: `/resource/ddos/ip/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// ddos资源 IP创建
export function resourceDDosReginIpCreate(data, schema) {
  return request({
    url: `/resource/ddos/ip/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}

// -------
// IDC资源 区域列表
export function resourceIdcRegionList(data, schema) {
  return request({
    url: `/resource/idc/region/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// IDC资源 区域详情
export function resourceIdcRegionDetail(data, schema) {
  return request({
    url: `/resource/idc/region/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 区域更新
export function resourceIdcRegionUpdate(data, schema) {
  return request({
    url: `/resource/idc/region/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 区域创建
export function resourceIdcRegionCreate(data, schema) {
  return request({
    url: `/resource/idc/region/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 区域创建
export function resourceIdcRegionDelete(data, schema) {
  return request({
    url: `/resource/idc/region/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -------
// IDC资源 线路列表
export function resourceIdcLineList(data, schema) {
  return request({
    url: `/resource/idc/line/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// IDC资源 线路详情
export function resourceIdcLineDetail(data, schema) {
  return request({
    url: `/resource/idc/line/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 线路更新
export function resourceIdcLineUpdate(data, schema) {
  return request({
    url: `/resource/idc/line/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 线路创建
export function resourceIdcLineCreate(data, schema) {
  return request({
    url: `/resource/idc/line/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 线路删除
export function resourceIdcLineDelete(data, schema) {
  return request({
    url: `/resource/idc/line/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -------
// IDC资源 机房列表
export function resourceIdcRoomList(data, schema) {
  return request({
    url: `/resource/idc/room/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// IDC资源 机房详情
export function resourceIdcRoomDetail(data, schema) {
  return request({
    url: `/resource/idc/room/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 机房更新
export function resourceIdcRoomUpdate(data, schema) {
  return request({
    url: `/resource/idc/room/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 机房创建
export function resourceIdcRoomCreate(data, schema) {
  return request({
    url: `/resource/idc/room/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 机房删除
export function resourceIdcRoomDelete(data, schema) {
  return request({
    url: `/resource/idc/room/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// -------
// IDC资源 机房列表
export function resourceIdcIpzoneList(data, schema) {
  return request({
    url: `/resource/idc/ipzone/list${schema ? schema === 'prepare' ? '?_prepare=1' : '?_withSchema=all' : ''}`,
    method: schema === 'prepare' ? 'get' : 'post',
    data: data
  })
}
// IDC资源 机房详情
export function resourceIdcIpzoneDetail(data, schema) {
  return request({
    url: `/resource/idc/ipzone/detail${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 机房更新
export function resourceIdcIpzoneUpdate(data, schema) {
  return request({
    url: `/resource/idc/ipzone/update${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 机房创建
export function resourceIdcIpzoneCreate(data, schema) {
  return request({
    url: `/resource/idc/ipzone/create${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
// IDC资源 机房删除
export function resourceIdcIpzoneDelete(data, schema) {
  return request({
    url: `/resource/idc/ipzone/delete${schema ? schema === 'prepare' ? '?_prepare=1' : '?_schema=1' : ''}`,
    method: schema ? 'get' : 'post',
    data: data
  })
}
