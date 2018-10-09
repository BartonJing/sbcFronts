import Vue from 'vue'

Vue.filter('formatDateTime', function formatDateTime (value) {
  var date = new Date(value)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
})
/**
 * 编码转换
 */
Vue.filter('formatEncode', function formatEncode (value, map, kind) {
  if (map === null || kind === null || value === null) {
    return ''
  }
  if (map[kind] !== undefined && map[kind] !== null) {
    let encodeList = map[kind]
    for (let i = 0; i < encodeList.length; i++) {
      if (encodeList[i].encode === value) {
        return encodeList[i].encodeName
      }
    }
  } else {
    return ''
  }
})
