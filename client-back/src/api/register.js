import { request, opearteRequest } from '@/utils/request'

export function register(data) {
  return opearteRequest({
    url: '/user/teacher/register',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}
