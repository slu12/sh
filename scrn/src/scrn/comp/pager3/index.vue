<template>
  <div class="box_col pager1Sty">
    <div class="box_row rowBetween pagerTop">
      <div class="pager3Tit" @click="sysEvent">电子围栏</div>
      <div class="wlName">
        围栏名：长江中游
      </div>
    </div>
    <div id="carouselBox3" class="box_col_100">
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        map:"",
        domeEH:{
          w:0,
          h:0
        }
      }
    },
    mounted() {
      var v = this
      this.$nextTick(()=>{
        v.buildMap()
      })
    },
    methods:{
      buildMap(){
        var v = this
        // 百度地图API功能
        let pot = new BMap.Point(114.298273, 30.560577)
        this.map = new BMap.Map("carouselBox3", {minZoom: 4, maxZoom: 20});    // 创建Map实例
        this.map.centerAndZoom(pot, 12);  // 初始化地图,设置中心点坐标和地图级别
        // this.map.enableScrollWheelZoom(true);    //开启鼠标滚轮缩放
        // this.map.enableDragging();
        this.map.addEventListener('click', function (val) {
          console.log(val);
        })
        this.buildCircle(pot)
      },
      buildCircle(pot){
        var circle = new BMap.Circle(pot,5000,{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}); //创建圆
        this.map.addOverlay(circle);
      },
      sysEvent(){
        this.$emit('sysEvent',3)
      }
    }
  }
</script>

<style lang="less">
  .pager1Sty {
    background-color: #5E687D;
    .pagerTop {
      height: 40px;
      .textTit{
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
      .pager3Tit {
        width: 120px;
        background: rgba(54, 62, 79, 1);
        .textTit;
      }
      .wlName{
        margin-right: 15px;
        .textTit;
      }
    }
    #carouselBox{
      background-color: #FFFFFF;
    }
  }
</style>
