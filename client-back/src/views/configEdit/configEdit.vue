<template>
  <div class="app-container">
    <el-form ref="config" :model="config" label-width="120px" :rules="rules">
      <el-form-item label="订单手续费" prop="orderHandleFee">
        <el-input
          v-model="config.orderHandleFee"
          :disabled="!editing"
          type="number"
        />
      </el-form-item>
      <el-form-item label="题目手续费" prop="taskHandleFee">
        <el-input
          v-model="config.taskHandleFee"
          :disabled="!editing"
          type="number"
        />
      </el-form-item>
      <el-form-item>
        <el-button v-if="!editing" type="primary" @click="edit">编辑</el-button>
        <el-button v-if="editing" type="primary" @click="onSubmit('config')">保存</el-button>
        <el-button v-if="editing" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getConfig, updateConfig } from '@/api/configEdit'
import { checkTwoPoint } from './validataOptions.js'

export default {
  name: 'ConfigEdit',
  data() {
    return {
      editing: false,
      config: {
        orderHandleFee: 0,
        taskHandleFee: 0
      },
      rules: {
        orderHandleFee: [
          { validator: checkTwoPoint, trigger: 'change' }
        ],
        taskHandleFee: [
          { validator: checkTwoPoint, trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    onSubmit(config) {
      var params = this.config
      this.$refs[config].validate((valid) => {
        if (valid) {
          updateConfig(params).then(res => {
            this.editing = false
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.editing = false
    },
    getConfig() {
      getConfig().then(res => {
        this.config = res.result
      })
    },
    edit() {
      this.editing = true
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
