import request from '@/utils/request'
const $host = 'http://47.93.22.56:8082'

export function getDataBypage(page) {
  return request({
    url: $host + '/recmd/query/page',
    method: 'get',
    params: {
      page: page
    }

  })
}

export function addTeacherCommand(data) {
  return request({
    url: $host + '/recmd/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function editTeacherCommand(data) {
  return request({
    url: $host + '/recmd/edit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function linkImg(data) {
  return request({
    url: $host + '/picture/upload',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function deleteCommand(data) {
  return request({
    url: $host + '/recmd/delete',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}
