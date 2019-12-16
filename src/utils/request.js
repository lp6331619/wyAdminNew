import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-ADMIN-CSRF-TOKEN'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-ADMIN-CSRF-TOKEN'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// request拦截器
service.interceptors.response.use(
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  response => {
    const status = response.status
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (status !== 200) {
      Message({
        message: res.result.message || '请求错误!',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (status === 50008 || status === 50012 || status === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.result.message || 'Error'))
    } else {
      if (res.result.isSuccess) {
        // 如果是获取 token 的接口就返回整个response 否者 返回 data
        return response.config.url.includes('login?_schema=1') ? response : res
      } else {
        if (res.result.errCode === 'LOGIN_REQUIRE') {
          console.log(res)
          // this.$router.push()
        }
        Message({
          message: res.result.message || '请求错误!',
          type: 'error',
          duration: 5 * 1000
        })
      }
    }
  },
  error => {
    console.log('err:' + error) // for debug
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
