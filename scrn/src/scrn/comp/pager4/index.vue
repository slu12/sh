<template>
  <div class="box_col pager1Sty">
    <div class="box_row pagerTop">
      <div class="pager1Tit">摄像头视频</div>
    </div>
    <div id="carouselBox4" class="box_col_100">
      <div v-if="domeEH.w>0&&domeEH.h>0"
           :style="{width:domeEH.w+'px',height:domeEH.h+'px'}">
        <Carousel v-model="CarouselConfig.val"
                  :loop="CarouselConfig.loop"
                  :autoplay="CarouselConfig.autoplay"
                  :autoplay-speed="CarouselConfig.autoplaySpeed"
        >
          <CarouselItem v-for="(it,index) in CarouselConfig.fileUrl" :key="index">
            <div class="" :style="{width:domeEH.w+'px',height:domeEH.h+'px'}">
              <img :src="it" style="width: 100%;height: 100%" alt="">
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
  import login1 from '../file/login1.png'
  import login2 from '../file/login2.png'

  export default {
    name: "index",
    data() {
      return {
        CarouselConfig:{
          val:3,
          loop:true,
          autoplay:true,
          autoplaySpeed:5000,
          fileUrl:[login1,login2,login1,login2]
        },
        domeEH:{
          w:0,
          h:0
        }
      }
    },
    mounted() {
      var v = this
      this.$nextTick(()=>{
        v.domeEH.h = v.AF.getDom_H('carouselBox4')
        v.domeEH.w = v.AF.getDom_W('carouselBox4')
      })
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
