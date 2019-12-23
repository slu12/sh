<template>
  <div id="app" style="transform: translateY(-18px)">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      urlParams:{}
    }
  },
  mounted(){
    // var url = location.href;
    // this.urlParams = {};
    // try{
    //   const keyValueArr = url.split('?')[1].split('&');
    //   keyValueArr.forEach(item => {
    //     const keyValue = item.split('=')
    //     this.urlParams[keyValue[0]] = keyValue[1]
    //   })
    // }catch(e){ }
    // //获取请求参数
    // this.$router.push({
    //   name:"CH",
    //   params: this.urlParams
    // });
    // sessionStorage.setItem('urlParams',JSON.stringify(this.urlParams))
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
</style>
