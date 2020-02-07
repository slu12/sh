<template>
  <div id="app" :style="{height: AF.getBody_H()+'px'}">
    <router-view/>
  </div>
</template>

<script>
  import { setToken,setAppid } from '@/libs/util'

  export default {
  name: 'App',
  data(){
    return {
      urlParams:{}
    }
  },
  created(){
    let token = this.$route.query.token
    let appid = this.$route.query.appid
    if (token){
      setToken(token)
    }
    if (appid){
      setAppid(appid)
    }
  },
  mounted(){
    var url = location.href;
    this.urlParams = {};
    try{
      const keyValueArr = url.split('?')[1].split('&');
      keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        this.urlParams[keyValue[0]] = keyValue[1]
      })
    }catch(e){ }

    if (this.urlParams.token && this.urlParams.appid){
        sessionStorage.setItem('urlParams',JSON.stringify(this.urlParams))
        this.$router.push({
            name:"home"
        })
    }
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
  @import "//at.alicdn.com/t/font_1598165_tsbdgc0jal8.css";
</style>
