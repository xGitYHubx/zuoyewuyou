
export function searchFilter(keyword, list, pagination) {
  if (keyword) {
    pagination.page = 1
    var filter = list.filter(data => {
      return Object.keys(data).some(key => {
        return (
          String(data[key])
            .toLowerCase()
            .indexOf(keyword) > -1
        )
      })
    })
    pagination.total = filter.length
    return filter.slice(
      (pagination.page - 1) * 10,
      pagination.page * 10
    )
  }
  if (list != null) {
    pagination.total = list.length
    return list.slice(
      (pagination.page - 1) * 10,
      pagination.page * 10
    )
  } else return null
}

export function getSimpleText(html) {
  var re1 = new RegExp('<.+?>', 'g') // 匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
  var msg = html.replace(re1, '') // 执行替换成空字符
  return msg
}
