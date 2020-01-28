<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <Input v-model="form.username" placeholder="请输入用户名">
      <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
      <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <Row>
      <Col span="14">
        <FormItem prop="captcha">
          <Input v-model="form.captcha" placeholder="请输入验证码">
            <span slot="prepend">
              <Icon :size="14" type="md-key"></Icon>
            </span>
          </Input>
        </FormItem>
      </Col>
      <Col span="10">
        <img :src="YzUrl" width="100%" alt="验证码" style="margin-left: 8px;cursor: pointer" @click="getUrl">
      </Col>
    </Row>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {mapMutations} from 'vuex'
  import Cookies from 'js-cookie';
  export default {
    name: 'LoginForm',
    data() {
      return {
        YzUrl:'',
        form: {
          username: 'admini',
          password: '123456',
          captcha:'',
          codeID:''
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
        v.$router.push({
          name: this.$config.homeName
        })
        return
        // this.$refs['loginForm'].validate((valid) => {
        //   if (valid) {
        //     this.$http.post(this.apis.LOGIN.QUERY, this.form).then(res=>{
        //         if(res.code == 200){
        //           localStorage.setItem('user',this.form.username)
        //           Cookies.set('usermess', this.form.username);
        //           Cookies.set('accessToken', res.result.accessToken);
        //
        //           localStorage.setItem('menuList', JSON.stringify(res.result.menuTree))
        //           v.setMenuList()
        //           v.initDict(res.result.dictList);
        //
        //           v.$router.push({
        //             name: this.$config.homeName
        //           })
        //         }
        //     }).catch(err=>{})
        //   }
        // })
      }
    }
  }
</script>
