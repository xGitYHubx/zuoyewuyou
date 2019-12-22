//
import { twoPoint } from '@/utils/validate.js'

export function checkTwoPoint(rule, value, callback) {
  if (twoPoint(value) && value >= 0 && value <= 1 && value != '') {
    callback()
  } else {
    return callback(new Error('0至1之间，最多两位小数'))
  }
}

