/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @小数点至多到后两位
 * @param {string} str
 * @returns {Boolean}
 */
export function twoPoint(str) {
  var y = String(str).indexOf('.') + 1// 获取小数点的位置
  var count = String(str).length - y// 获取小数点后的个数
  if (y > 0) {
    return count <= 2
  } else {
    return true
  }
}

/**
 * @大于0的整数
 * @param {string} str
 * @returns {Boolean}
 */
export function positiveNum(str) {
  console.log(str)

  if (Number(str) <= 0) {
    return false
  } else {
    return true
  }
}

