import Vue from 'vue'
require('@/utils/dateUtils.js')

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import axios from 'axios'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.prototype.axios = axios
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.prototype.axios = axios
Vue.prototype.subject = ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理']
Vue.prototype.orderState = ['老师未同意', '老师已同意', '订单已完成', '老师已拒绝', '订单已撤销']

Vue.config.productionTip = true

new Vue({
  el: '#app',
  router,
  store,
  axios,
  render: h => h(App)
})
