import request from '@/utils/request'
const $host = 'http://47.93.22.56:8082'

export function register(data) {
  return request({
    url: $host + '/user/teacher/register',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: $host + '/user/logout',
    method: 'post',
    data
  })
}
