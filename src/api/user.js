import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
// 获取加密公钥
export function getJsconfig() {
  return request({
    url: '/jsconfig',
    method: 'post'
  })
}

export function loginSchema() {
  return request({
    url: '/auth/login?_schema=1',
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/auth/userinfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
