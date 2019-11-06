import Cookies from 'js-cookie'

const TokenKey = 'wy_admin_token'
const nameKey = 'wy_admin_name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(nameKey)
}

export function setName(name) {
  return Cookies.set(nameKey, name)
}

export function removeName() {
  return Cookies.remove(nameKey)
}
