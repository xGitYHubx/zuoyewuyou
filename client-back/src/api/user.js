import request from '@/utils/request'
const $host = 'http://47.93.22.56:8082'
// const $host = ''
export function login(data) {
  return request({
    url: $host + '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: $host + '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: $host + '/user/logout',
    method: 'post'
  })
}
