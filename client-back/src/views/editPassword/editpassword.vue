<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="新账户名">
        <el-input v-model="form.newAccount" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" type="password" />
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="form.checkNewPassword" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <!-- <el-button @click="onCancel">清空</el-button> -->
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { editAccount } from '@/api/user.js'
export default {
  data() {
    return {
      form: {
        newAccount: '',
        newPassword: '',
        checkNewPassword: ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.newPassword != this.form.checkNewPassword) {
        this.$message('确认密码不一致!')
      } else {
        editAccount({
          newAccount: this.form.newAccount,
          newPassword: this.form.newPassword
        }).then(res => {
          this.form = {
            newAccount: '',
            newPassword: '',
            checkNewPassword: ''
          }
        }).then(_ => {
          this.logout()
        })
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }, async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

