<template>
  <div class="box_col pager1Sty">
    <div class="box_row pagerTop">
      <div class="pager1Tit" @click="sysEvent">摄像头视频</div>
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
    },
    methods:{
      sysEvent(){
        this.$emit('sysEvent',4)
      },
      buildMap() {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        var top_right_navigation = new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          type: BMAP_NAVIGATION_CONTROL_SMALL
        }); //右上角，仅包含平移和缩放按钮
        /*缩放控件type有四种类型:
        BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

        //添加控件和比例尺
        map.addControl(top_left_control);
        map.addControl(top_left_navigation);
        map.addControl(top_right_navigation);
      }
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
