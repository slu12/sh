<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from './comp/loginform'
import { mapActions,mapMutations } from 'vuex'
export default {
  components: {
    LoginForm
  },
  created(){
  },
  mounted(){
    this.clearTagNavList()
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    ...mapMutations([
      'clearTagNavList'
    ]),
    handleSubmit ({ userName, password }) {
          this.$router.push({
            name: this.$config.homeName
          })
      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //   })
      // })
    }
  }
}
</script>

<style>

</style>
