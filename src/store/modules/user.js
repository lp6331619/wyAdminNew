import { login, getJsconfig, loginSchema, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'
import { resetRouter } from '@/router'
import { JSEncrypt } from 'jsencrypt'
const state = {
  token: getToken(),
  name: getName(),
  data: ''
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DATA: (state, data) => {
    state.data = data
  },
  SET_PRIV: (state, data) => {
    state.privileges = data
  }
}
var publicKey = ''
// 加密函数
function encryptedData(publicKey, data) {
  // 新建JSEncrypt对象
  const encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey(publicKey)
  // 加密数据
  return encryptor.encrypt(data)
}
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, seccode } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: encryptedData(publicKey, username.trim()), password: encryptedData(publicKey, password), seccode: seccode }).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { loginName } = data
        commit('SET_NAME', loginName)
        // commit('SET_DATA', data.data)
        setName(loginName)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取 token 步骤
  loginSchema({ commit }) {
    return new Promise((resolve, reject) => {
      loginSchema({}).then(response => {
        const { headers } = response
        const token = headers['x-admin-csrf-token']
        commit('SET_TOKEN', token)
        setToken(token)
        // 获取公钥
        getJsconfig().then(res => {
          publicKey = res.data.jsencryptKey
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo({}).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { loginName } = data
        commit('SET_NAME', loginName)
        commit('SET_DATA', data)
        setName(loginName)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        removeName()
        commit('SET_DATA', {})
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      removeName()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

