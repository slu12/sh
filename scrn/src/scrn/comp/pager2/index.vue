<template>
  <div class="box_col pager1Sty">
    <div class="box_row pagerTop">
      <div class="pager2Tit" @click="sysEvent">船舶轨迹</div>
      <div class="box_row_100">
        <div class="box_row rowBetween cbItMess" style="height: 100%;margin: 0 15px">
          <div class="cbName">
            银祥7788 - YIN XIANG 7788
          </div>
          <div class="cbType">
            状态：在航
          </div>
        </div>
      </div>
    </div>
    <div id="carouselBox2" class="box_col_100">
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
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
        this.map = new BMap.Map("carouselBox2", {minZoom: 4, maxZoom: 20});    // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(114.298273, 30.560577), 12);  // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);    //开启鼠标滚轮缩放
        // this.map.enableDragging();
        this.map.addEventListener('click', function (val) {
          console.log(val);
        })
      },
      sysEvent(){
        this.$emit('sysEvent',2)
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
      .pager2Tit {
        width: 120px;
        background: rgba(54, 62, 79, 1);
        .textTit;
      }
      .cbName{
        .textTit;
      }
      .cbType{
        .textTit;
      }
    }
    #carouselBox{
      background-color: #FFFFFF;
    }
  }

</style>
