<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-font">
       <div class="cn">神海</div>
       <div class="cn">船联网大数据平台</div>
        <div class="en">Shen Hai</div>
        <div class="en">Big data platform for ship networking</div>
    </div>
    <div class="login-con">
      <Card>
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
  computed:{
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
  },
  created(){
    this.clearTag()
    console.log(this.tagNavList());
  },
  mounted(){
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    ...mapMutations([
      "setTagNavList"
    ]),
    clearTag(){
      let res = this.tagNavList.filter(item => item.name === this.$config.homeName)
      let tagLocal = localStorage.getItem('tagNaveList')
      tagLocal = JSON.parse(localStorage.getItem('tagNaveList'))
      if(tagLocal.length > 1){
        let setTagLocal = [tagLocal[0]]
        console.log(setTagLocal);
        localStorage.setItem('tagNaveList',JSON.stringify(setTagLocal))
      }
      this.setTagNavList(res)

    },
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
