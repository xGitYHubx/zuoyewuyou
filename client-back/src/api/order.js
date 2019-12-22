import {
  request,
  opearteRequest
} from '@/utils/request'

export function getHistOrder(page) {
  const params = {
    page: page
  }
  return request({
    url: '/order/query/page',
    method: 'get',
    params
  })
}
export function getHistOrderCount() {
  return request({
    url: '/order/query/count',
    method: 'get'

  })
}

export function getStudentList(params) {
  params['role'] = 0
  return request({
    url: '/user/query/page',
    method: 'get',
    params
  })
}

export function getStudentListTotal(params) {
  params['role'] = 0
  return request({
    url: '/user/query/count',
    method: 'get',
    params
  })
}

export function getTeacherList(params) {
  params['role'] = 1
  return request({
    url: '/user/query/page',
    method: 'get',
    params
  })
}

export function getTeacherListTotal(params) {
  params['role'] = 1
  return request({
    url: '/user/query/count',
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

export function getOrderListByKeyword(params) {
  return request({
    url: '/order/search',
    method: 'get',
    params
  })
}
