import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import request from '@/utils/request'
import App from './App'
import store from './store'
import router from './router'
import operatePriv from '@/public/js/btnPermissions.js' // 权限判断
import 'default-passive-events'

import '@/icons' // icon
import '@/permission' // permission control

// 公用变量图片 url
Vue.prototype.imgUrl = process.env.VUE_APP_BASE_API
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// set ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  request,
  router,
  operatePriv,
  render: h => h(App)
})
