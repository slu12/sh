<template>
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
        <Col align="right" style="cursor:pointer;" @click="xgpassword"><div>忘记密码?</div></Col>
      </Row>
      <FormItem>
        <Button @click="handleSubmit" type="primary" class="botton" long>登录</Button>
      </FormItem>
    </Form>
  </div>
  <div v-if="!islogin">
    <div class="tit">重置密码</div>
    <div class="ftit">Reset Password</div>
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
        <Col span="12"></Col>
        <Col align="right" style="height: 14px">
          <div style="height: 14px;width: 65px;z-index: 666" @click="xgpassword">忘记密码?</div>
        </Col>
      </Row>
      <FormItem>
        <Button @click="handleSubmit" type="primary" class="botton" long>登录</Button>
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
        islogin :true,
        YzUrl:'',
        form: {
          username: 'admini',
          password: '123456',
          captcha:'',
          codeID:''
        },
        formpass:{
          sjh:'',
          yzm:'',
          pwd:'',
          newpwd:''
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
  .inputsty{
    width:370px;
    height:40px;
    border:1px solid rgba(204,204,204,1);
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
