import request from '@/utils/request'

export function getPrivilegeDetail() {
  return request({
    url: '/system/privilege/detail',
    method: 'post'
  })
}

export function setPriv(data) {
  return request({
    url: '/system/privilege/config',
    method: 'post',
    data: data
  })
}
