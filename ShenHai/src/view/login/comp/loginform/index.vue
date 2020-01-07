<template xmlns="http://www.w3.org/1999/html">
  <div>
  <div v-if="islogin">
    <div class="tit">登录</div>
    <div class="ftit">Login</div>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
      <FormItem prop="username">
        <Input class="inputsty" style="height: 100%" v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input class="inputsty" style="height: 100%" type="password" v-model="form.password" placeholder="请输入密码">
      <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
        </Input>
      </FormItem>
      <Row class="wjmima">
        <Col align="right" style="cursor:pointer;" @click.native="xgpassword"><div>忘记密码?</div></Col>
      </Row>
      <FormItem>
        <Button @click="handleSubmit" type="primary" class="botton" long>登录</Button>
      </FormItem>
    </Form>
  </div>
  <div v-if="!islogin">
    <div class="tit">重置密码</div>
    <div class="ftit">Reset Password</div>
    <Form ref="loginForm" :model="formpass" :rules="rules1">
      <FormItem prop="phone">
        <Input class="inputsty" style="height: 100%" v-model="formpass.phone" placeholder="请输入手机号码">
        <span slot="prepend">
          <Icon :size="22" type="md-phone-portrait"></Icon>
        </span>
        </Input>
      </FormItem>
      <FormItem prop="code">
        <Input class="inputsty" style="height: 100%" v-model="formpass.code" placeholder="请输入验证码">
        <span slot="prepend">
          <Icon :size="22" type="md-mail"></Icon>
        </span>
        </Input>
        <Button v-show="sendAuthCode" class="but" @click="getdxmess">获取验证码</Button>
        <Button v-show="!sendAuthCode" class="but">{{auth_time}}s重新获取</Button>
      </FormItem>
      <FormItem prop="pwd">
        <Input class="inputsty" style="height: 100%" type="password" v-model="formpass.pwd" placeholder="请输入新密码">
      <span slot="prepend">
          <Icon :size="22" type="md-lock"></Icon>
        </span>
        </Input>
      </FormItem>
      <FormItem prop="pwd1">
        <Input class="inputsty" style="height: 100%" type="password" v-model="formpass.pwd1" placeholder="请再次输入新密码">
      <span slot="prepend">
          <Icon :size="22" type="md-lock"></Icon>
        </span>
        </Input>
      </FormItem>
      <FormItem>
        <Button @click="changepassword" type="primary" class="botton" long>确认</Button>
        <Button @click="islogin = true" type="primary" ghost long class="botton1" style="margin-top: 15px">取消</Button>
      </FormItem>
    </Form>
  </div>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import Cookies from 'js-cookie';
  import passworld from "../../../../components/main/components/user/passworld";
  export default {
    name: 'LoginForm',
    data() {
      return {
        sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /*倒计时 计数器*/
        islogin :true,
        YzUrl:'',
        form: {
          username: 'admini',
          password: '123456',
          captcha:'',
          codeID:''
        },
        formpass:{
          phone :'' ,
          code:''  ,
          pwd1:'',
          pwd:'',
        },
        rules1: {
          phone: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          pwd1: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      this.getUrl()
    },
    methods: {
      ...mapMutations([
        'setPermissionMenuList'
      ]),
      xgpassword(){
        console.log('passworld');
        this.islogin = false
      },
      changepassword(){
        this.$http.post('/api/yh/findPwd',this.formpass).then((res)=>{
          if (res.code == 200){
            this.swal({
              title: '修改成功！',
              type: 'success'
            })
            this.formpass = {}
            this.islogin = true
          }else {
            this.swal({
              title: res.message,
              type: 'error'
            })
          }
        })

      },
      getUrl() {
        let codeId =this.AF.getRandom(8)
        this.YzUrl = this.apis.url + this.apis.LOGIN.YZ + codeId
        this.form.codeID = codeId
      },
      setMenuList() {
        this.setPermissionMenuList(JSON.parse(localStorage.getItem('menuList')))
      },
      initDict(dictList) {
        for (let r of dictList){
          if ('ZDCLK1017' === r.lmdm){
            this.initSchoolPY(r);
            break;
          }
        }
        this.session.setItem('dictMap', dictList)
      },
      initSchoolPY(dict){
        for (let r of dict.zdxmList){
          r.by1 = this.util.parsePY(r.zdmc);
        }
      },
      getdxmess(){ // 获取短信验证码
        if(this.formpass.phone == ''){
          this.swal({
            title:'请先输入手机号码',
            type:'error'
          })
          return
        }
        this.$http.post('/api/yh/sendSms',{phone:this.formpass.phone}).then((res)=>{
          if (res.code == 200){
            this.sendAuthCode = false;
            this.auth_time = 300;
            var auth_timetimer =  setInterval(()=>{
              this.auth_time--;
              if(this.auth_time<=0){
                this.sendAuthCode = true;
                clearInterval(auth_timetimer);
              }
            }, 1000);
          }else {
            this.$Message.error(res.message)
          }
        })
      },
      handleSubmit() {
        var v = this
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.$http.post(this.apis.LOGIN.QUERY, this.form).then(res=>{
                if(res.code == 200){
                  localStorage.setItem('user',this.form.username)
                  Cookies.set('usermess', this.form.username);
                  Cookies.set('accessToken', res.result.accessToken);

                  localStorage.setItem('menuList', JSON.stringify(res.result.menuTree))
                  v.setMenuList()
                  v.initDict(res.result.dictList);

                  v.$router.push({
                    name: this.$config.homeName
                  })
                }else {
                  v.$Message.error(res.message)
                }
            }).catch(err=>{})
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .botton{
    height:40px;
    background:rgba(54,62,79,1);
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:9px;
  }
  .botton1{
    height:40px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:9px;
  }
  .inputsty{
    width:370px;
    height:40px;
    border:1px solid rgba(204,204,204,1);
    position: relative;
  }
  .but{
    width:150px;
    height:30px;
    position: absolute;
    right: 0;
    top: 3px;
    z-index: 999;
    background:rgba(54,62,79,1);
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:9px;
  }
   .wjmima{
     padding: 10px 0 ;
     font-size:14px;
     font-family:Microsoft YaHei;
     font-weight:400;
     color:rgba(54,62,79,1);
     line-height:14px;
   }
   .tit{
     text-align: center;
     font-size:24px;
     font-family:Microsoft YaHei;
     font-weight:300;
     color:rgba(54,62,79,1);
     line-height:42px;
   }
  .ftit{
    text-align: center;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:300;
    color:rgba(54,62,79,1);
    line-height:42px;
  }
</style>
