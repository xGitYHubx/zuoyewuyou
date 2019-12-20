import { request, opearteRequest } from '@/utils/request'

export function getDataBypage(page) {
  return request({
    url: '/recmd/query/page',
    method: 'get',
    params: {
      page: page
    }

  })
}

export function getCount() {
  return request({
    url: '/recmd/query/count',
    method: 'get'

  })
}

export function addTeacherCommand(data) {
  return opearteRequest({
    url: '/recmd/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function editTeacherCommand(data) {
  return request({
    url: '/recmd/edit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function linkImg(data) {
  return request({
    url: '/picture/upload',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function deleteCommand(data) {
  return opearteRequest({
    url: '/recmd/delete',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}
