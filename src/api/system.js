import request from '@/utils/request'

export function getPrivilegeDetail() {
  return request({
    url: '/system/privilege/detail',
    method: 'post'
  })
}
