<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button @click="doLogin">登录</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    doLogin () {
      var ths = this
      this.postRequest('/auth/login', {
        username: this.form.username,
        password: this.form.password
      }).then(resp => {
        console.log(resp)
        ths.$store.commit('setToken', resp)
        console.log(ths.$store.state.token)
      })
    }
  }
}
</script>

<style scoped>

</style>
