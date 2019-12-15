import request from '@/utils/request'
const $host = 'http://47.93.22.56:8082'

export function exchange(data) {
  return request({
    url: $host + '/user/exchange',
    method: 'post',
    data
  })
}

