import { requestNoMsg, request, opearteRequest } from '@/utils/request'
export function login(data) {
  return requestNoMsg({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return requestNoMsg({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return requestNoMsg({
    url: '/user/logout',
    method: 'post'
  })
}

export function getTeacherListBykeyword(params) {
  params['role'] = 1
  return request({
    url: '/user/search',
    method: 'get',
    params
  })
}

export function getStudentListBykeyword(params) {
  params['role'] = 0
  return request({
    url: '/user/search',
    method: 'get',
    params
  })
}

export function editAccount(data) {
  return opearteRequest({
    url: '/admin/info/update',
    method: 'post',
    data
  })
}
