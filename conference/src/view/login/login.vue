<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <!--<div class="login-con">-->
      <!--<Card icon="log-in" title="欢迎登录" :bordered="false">-->
        <!--<div class="form-con">-->
          <!--<login-form @on-success-valid="handleSubmit"></login-form>-->
        <!--</div>-->
      <!--</Card>-->
    <!--</div>-->
    <div class="cardCenter box_row colCenter rowBetween">
      <div style="width: 400px;height: 368px">
        <img :src="log" alt="" style="width: 100%;height: 100%">
      </div>
      <div style="width: 400px;height: 368px">
        <div class="box_col rowBetween colCenter">
          <div class="proTit">
            视频会议管理平台
          </div>
          <div style="width:220px;height:220px" @click="login">
            <img :src="ewm" style="width:220px;height:220px" alt="">
          </div>
          <div class="labTxt">
            请用微信扫码登录
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// import LoginForm from './comp/loginform'
import { mapActions,mapMutations } from 'vuex'

import log from './file/log.png'
// import ewm from './file/ewm.png'
import ajaxUrl from '@/axios/api.js'

export default {
  components: {
    // LoginForm
  },
  computed:{
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
  },
  data(){
    return {
      log,
      ewm:""
    }
  },
  created(){
    // this.closeTags()
    localStorage.removeItem("tagNaveList");
    this.ewm = ajaxUrl.url+"/serverless/getQrcode/"+this.getRandom()
  },
  mounted(){
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    ...mapMutations([
    ]),
    closeTags(){
      let res = this.tagNavList.filter(item => item.name === this.$config.homeName)
      this.turnToPage(this.$config.homeName)
    },
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      // this.$router.push({
      //   name,
      //   params,
      //   query
      // })
    },
    getRandom(val) {//取随机数
      let line = 1
      if (val && val > 1) {
        line = val
      }
      let num = ''
      for (var i = 0; i < line; i++) {
        num += Math.floor(Math.random() * 10)
      }
      return num
    },
    getEWM(){
      let ps = this.getRandom(8)
      this.$http.get('/serverless/getQrcode/'+ps).then(res=>{
        console.log(res);
        this.ewm = res
      }).catch(err=>{

      })
    },
    login(){
      console.log(this.$config.homeName);
      this.$router.push({
        // name: this.$config.homeName
        name:"home"
      })
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
