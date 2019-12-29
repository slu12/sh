<template>
  <div class="box_col pager1Sty" @contextmenu.prevent="sysEvent">
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
        setTimeout(()=>{
          v.buildMap()
        },100)
      })
    },
    methods:{
      buildMap(){
        var v = this
        // 百度地图API功能
        let pot = new BMap.Point(114.298273, 30.560577)
        this.map = new BMap.Map("carouselBox3", {minZoom: 4, maxZoom: 20});    // 创建Map实例
        this.map.centerAndZoom(pot, 9);  // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);    //开启鼠标滚轮缩放
        // this.map.enableDragging();
        this.map.addEventListener('click', function (e) {
          // alert(e.point.lng + "," + e.point.lat);
          console.log(e.point.lng + "," + e.point.lat);
        })
        this.map.addEventListener('rightclick', function (val) {
          v.sysEvent()
        })
        // this.buildCircle(pot)
        this.buildPolygon()
      },
      buildCircle(pot){
        var circle = new BMap.Circle(pot,5000,{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}); //创建圆
        this.map.addOverlay(circle);
      },
      buildPolygon(){
        let pots = [
          // new BMap.Point(111.906624, 30.097738),
          new BMap.Point(113.316317, 29.411444),
          new BMap.Point(114.548936, 30.245607),
          new BMap.Point(116.029919, 29.560342),
          // new BMap.Point(118.54115, 31.191376),
          new BMap.Point(119.378227, 32.010198),
          new BMap.Point(120.187708, 31.743307),
          new BMap.Point(120.288893, 32.291935),
          new BMap.Point(118.918294, 32.377846),
          // new BMap.Point(114.622525,30.502843),
          // new BMap.Point(116.135703,29.658815),
          // new BMap.Point(118.476759,31.244741),

          // new BMap.Point(118.118012, 31.515048),
          new BMap.Point(115.974727, 29.949645),
          new BMap.Point(114.328169, 30.874517),
          new BMap.Point(113.169139, 29.813362),
          // new BMap.Point(112.322863, 30.468983),
          // new BMap.Point(112.382654,29.694965),
          // new BMap.Point(113.086351,29.417485),
          // new BMap.Point(114.144196,30.051733),
          // new BMap.Point(114.622525,30.502843),
          // new BMap.Point(116.135703,29.658815),
          // new BMap.Point(118.476759,31.244741),
          // new BMap.Point(119.42422,32.153133),
          // new BMap.Point(119.405823,32.266537),
          // new BMap.Point(118.81251,32.244551),
          // new BMap.Point(116.140302,29.911585),
          // new BMap.Point(114.466148,30.781238),
          // new BMap.Point(113.120846,29.536212),
          // new BMap.Point(112.994365,29.8274),
          // new BMap.Point(112.442446,29.922103),
          // new BMap.Point(112.380355,30.087739),
          // new BMap.Point(112.243525,30.093738),
          // new BMap.Point(112.311365,30.28753),
          // new BMap.Point(112.235476,30.327439),
          // new BMap.Point(112.197532,30.324446),
          // new BMap.Point(111.992844,30.300939),
          new BMap.Point(113.316317, 29.411444)
        ]
        var polygon = new BMap.Polygon(pots, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});  //创建多边形
        this.map.addOverlay(polygon);
        this.map.setViewport(pots)
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
