import { login, loginSchema, getInfo, logout } from '@/api/user'
import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'
import { resetRouter } from '@/router'

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
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, seccode } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, seccode: seccode }).then(response => {
        const { data } = response
        if (!data.data) {
          reject('Verification failed, please Login again.')
        }
        const { loginName } = data.data
        commit('SET_NAME', loginName)
        // commit('SET_DATA', data.data)
        setName(loginName)
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 奇葩的获取 token 步骤
  loginSchema({ commit }) {
    return new Promise((resolve, reject) => {
      loginSchema({}).then(response => {
        const { headers } = response
        const token = headers['x-admin-csrf-token']
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
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
        if (!data.data) {
          reject('Verification failed, please Login again.')
        }
        const { loginName } = data.data
        commit('SET_NAME', loginName)
        commit('SET_DATA', data.data)
        setName(loginName)
        resolve(data.data)
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

