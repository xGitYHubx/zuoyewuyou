//
import {
  positiveNum
} from '@/utils/validate.js'
function PositiveNum(rule, value, callback) {
  if (positiveNum(value)) {
    callback()
  } else {
    return callback(new Error('大于0的数字'))
  }
}

export var validationRules = {
  startTime: [
    { required: true, message: '不能为空', trigger: 'blur' }
  ],
  cost: [
    {
      required: true,
      trigger: 'blur',
      message: '不能为空'
    },
    {
      validator: PositiveNum,
      trigger: 'blur'
    }
  ],
  duration: [{
    validator: PositiveNum,
    trigger: 'blur'
  },
  {
    required: true,
    trigger: 'blur',
    message: '不能为空'
  }
  ],
  subject: [{
    required: true,
    trigger: 'blur',
    message: '不能为空'
  }],
  location: [{
    required: true,
    trigger: 'blur',
    message: '不能为空'
  }]
}

