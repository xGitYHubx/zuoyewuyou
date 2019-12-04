import request from '@/utils/request'
const $host = 'http://47.93.22.56:8082'

export function updataAboutUs(data) {
  return request({
    url: $host + '/backstage/aboutus/update',
    method: 'post',
    data
  })
}

export function getAboutUs(params) {
  return request({
    url: $host + '/backstage/aboutus/query',
    method: 'get',
    params
  })
}
