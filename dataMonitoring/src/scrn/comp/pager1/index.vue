<template>
  <div class="box_col pager1Sty" @contextmenu.prevent="sysEvent">
  </div>
</template>

<script>

  export default {
    name: "index",
    data() {
      return {
      }
    },
    mounted() {
      var v = this
      this.$nextTick(()=>{
      })
    },
    methods:{
    }
  }
</script>

<style lang="less">
  .pager1Sty {
    background-color: #5E687D;

    .pagerTop {
      height: 40px;

      .pager1Tit {
        width: 120px;
        background: rgba(54, 62, 79, 1);
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
    }
    #carouselBox{
      background-color: #FFFFFF;
    }
  }

</style>
