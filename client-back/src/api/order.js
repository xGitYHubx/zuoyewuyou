import request from '@/utils/request'
const $host = 'http://47.93.22.56:8082'

export function getStudentList(params) {
  params = { role: 0 }
  return request({
    url: $host + '/user/query/all',
    method: 'get',
    params
  })
}

export function getHistOrder(params) {
  params = {
    page: 0
  }
  return request({
    url: $host + '/order/query',
    method: 'get',
    params
  })
}

export function getTeacherList(params) {
  params = { role: 1 }
  return request({
    url: $host + '/user/query/all',
    method: 'get',
    params
  })
}

export function submitOrder(data) {
  return request({
    url: $host + '/order/create',
    method: 'post',
    data
  })
}

