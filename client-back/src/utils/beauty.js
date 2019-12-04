export function beautyTime1(datetime) { // 转换时间格式为 yyyy-mm-dd hh-mm-ss
  var dateTime = new Date(datetime)
  var year = dateTime.getFullYear()
  var month = dateTime.getMonth() + 1// js从0开始取
  var date = dateTime.getDate()
  var hour = dateTime.getHours()
  var minutes = dateTime.getMinutes()
  var second = dateTime.getSeconds()

  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (second < 10) {
    second = '0' + second
  }

  return year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + second
}
