import { request, opearteRequest } from '@/utils/request'

export function getStudentList(params) {
  params = { role: 0 }
  return request({
    url: '/user/query/all',
    method: 'get',
    params
  })
}

export function getHistOrder(params) {
  params = {
    page: 0
  }
  return request({
    url: '/order/query/page',
    method: 'get',
    params
  })
}

export function getTeacherList(params) {
  params = { role: 1 }
  return request({
    url: '/user/query/all',
    method: 'get',
    params
  })
}

export function submitOrder(data) {
  return opearteRequest({
    url: '/order/create',
    method: 'post',
    data
  })
}

// 更改订单状态
export function changeOrderStatus(data) {
  return opearteRequest({
    url: '/order/status/update',
    method: 'post',
    data
  })
}
