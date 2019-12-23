import { opearteRequest } from '@/utils/request'

export function exchange(data) {
  return opearteRequest({
    url: '/user/coin/exchange',
    method: 'post',
    data
  })
}

