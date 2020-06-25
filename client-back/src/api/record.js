import { request, opearteRequest } from '@/utils/request'

export function getRecordList(page) {
    return request({
      url: '/backstage/query/coinDetail/all',
      method: 'get',
      params: {
        page: page
      }
  
    })
  }
export function getPages(){
    return request({
        url:'/backstage/query/coinDetail/count',
        method:'get'
    })
}
export function searchCoin(key){
    return request({
        url:'/backstage/search/coinDetail',
        method:'get',
        params:{
            searchKey:key
        }
    })
}