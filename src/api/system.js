import request from '@/utils/request'
// 获取权限
export function getPrivilegeDetail() {
  return request({
    url: '/system/privilege/detail',
    method: 'post'
  })
}
// 设置权限
export function setPriv(data) {
  return request({
    url: '/system/privilege/config',
    method: 'post',
    data: data
  })
}
