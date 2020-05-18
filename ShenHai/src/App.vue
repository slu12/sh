<template>
  <div id="app" :style="{height:bodyH+'px'}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      urlParams:{},
      bodyH:960
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.bodyH = document.body.clientHeight
    })
  }
}
</script>

<style lang="less">
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    /*.ivu-modal{*/
      /*top: 0;*/
    /*}*/
  }
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
  transform: translateY(-18px);
  .size;
}
</style>
