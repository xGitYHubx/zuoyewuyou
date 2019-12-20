import { opearteRequest } from '@/utils/request'

export function exchange(data) {
  return opearteRequest({
    url: '/user/exchange',
    method: 'post',
    data
  })
}

