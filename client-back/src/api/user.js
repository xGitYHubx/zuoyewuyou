import { requestNoMsg } from '@/utils/request'
import { Message } from 'element-ui'
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
