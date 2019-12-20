import { request, opearteRequest } from '@/utils/request'

export function updataAboutUs(data) {
  return opearteRequest({
    url: '/backstage/aboutus/update',
    method: 'post',
    data
  })
}

export function getAboutUs(params) {
  return request({
    url: '/backstage/aboutus/query',
    method: 'get',
    params
  })
}
