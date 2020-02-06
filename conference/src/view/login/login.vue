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
import { setToken,setAppid } from '@/libs/util'

export default {
  components: {
    // LoginForm
  },
  data(){
    return {
      log,
      ewm:"",
      loginTimer:null,
      tipText:'请用微信扫码登录',
      value:null,
      ranNum: null
    }
  },
  created(){
    this.ranNum = this.getRandom(8);
    this.ewm = ajaxUrl.url+"/serverless/getQrcode/" + this.ranNum;
  },
  mounted(){
      this.loginTimer = setInterval(()=>{
          this.checkScan();
      }, 3000);
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    ...mapMutations([
    ]),
    checkScan(){
      //监听是否已经扫码登录成功
      if (this.ranNum){
        console.log('/serverless/testAdmin/'+this.ranNum);
        this.$http.get('/serverless/testAdmin/'+this.ranNum).then(res=>{
            console.log(res);

            if (res.value){
                this.value = res.value;
                this.tipText = '登录成功';
                if (res.value){
                    setToken(res.value)
                }
                if (res.appid){
                    setAppid(res.appid)
                }

                clearInterval(this.loginTimer);
                this.loginTimer = null;
                setTimeout(()=>{
                  this.$router.push({
                      name:"home"
                  })
                }, 2000);
            }
        }).catch(err=>{

        })
      }
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
