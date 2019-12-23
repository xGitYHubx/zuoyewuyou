import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

function erroeMsg(error) {
  Message({
    message: error,
    type: 'error',
    duration: 3 * 1000
  })
}

function logoutConfirm() {
  MessageBox.confirm('未登录或登录已过期', '请重新登录', {
    confirmButtonText: '去登陆',
    cancelButtonText: '取消',
    showCancelButton: false,
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    type: 'warning'
  }).then(() => {
    store.dispatch('user/resetToken').then(() => {
      location.reload()
    })
  })
}

// create an axios instance(请求数据)
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
request.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    erroeMsg('request Error:', error)
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  response => {
    var res = response.data
    if (res.success == true) {
      return res
    } else { // res.success==false
      if (res.message == 0 || res.message == 1 || res.message == 2) { // 校验出错
        // erroeMsg('请求失败')
        logoutConfirm()
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        erroeMsg(res.message || 'Error')
        return res
      }
    }
  },
  error => {
    erroeMsg(error.message || 'Error')
    return Promise.reject(error)
  }
)

// 这个axios实例是为了一些操作型请求创建，操作后message提示成功或者失败
const opearteRequest = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
opearteRequest.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    erroeMsg('operateRequest Error' + error.message)
    return Promise.reject(error)
  }
)
opearteRequest.interceptors.response.use(
  response => {
    var res = response.data
    if (res.success == true) {
      Message({
        message: '操作成功',
        type: 'success',
        duration: 5 * 1000
      })
      return res
    } else { // res.success==false
      if (res.message == 0 || res.message == 1 || res.message == 2) { // 校验出错
        erroeMsg('校验出错' || 'Error')
        logoutConfirm()
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        erroeMsg('出错' + res.message || 'Error')
        return res
      }
    }
  },
  error => {
    erroeMsg(error.message)
    return Promise.reject(error)
  }
)

// create an axios instance(请求数据，不带msg提示，自行维护msg)
const requestNoMsg = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
requestNoMsg.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    erroeMsg('request Error:', error)
    return Promise.reject(error)
  }
)
requestNoMsg.interceptors.response.use(
  response => {
    var res = response.data
    if (res.success == true) {
      return res
    } else {
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

module.exports = { request, opearteRequest, requestNoMsg }
