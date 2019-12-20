import { request, opearteRequest } from '@/utils/request'

export function updateConfig(data) {
  return opearteRequest({
    url: '/backstage/handlingFee/update',
    method: 'post',
    data
  })
}

export function getConfig(params) {
  return request({
    url: '/backstage/handlingFee/query',
    method: 'get',
    params
  })
}
