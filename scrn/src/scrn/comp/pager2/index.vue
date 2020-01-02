<template>
  <div class="box_col pager1Sty" @contextmenu.prevent="sysEvent">
    <div class="box_row pagerTop">
      <div class="pager2Tit" @click="sysEvent">船舶轨迹</div>
      <div class="box_row_100">
        <div class="box_row rowBetween cbItMess" style="height: 100%;margin: 0 15px">
          <div class="cbName">
            易航三号 - YI HANG 3
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
  import cbImg from '../file/cb.png'

  export default {
    name: "index",
    data() {
      return {
        cbImg,
        domeEH: {
          w: 0,
          h: 0
        }
      }
    },
    mounted() {
      var v = this
      this.$nextTick(() => {
        setTimeout(() => {
          v.buildMap()
        }, 100)
      })
    },
    methods: {
      buildMap() {
        var v = this
        // 百度地图API功能
        this.map = new BMap.Map("carouselBox2", {minZoom: 4, maxZoom: 20});    // 创建Map实例
        this.map.centerAndZoom(new BMap.Point(114.298273, 30.560577), 12);  // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);    //开启鼠标滚轮缩放
        // this.map.enableDragging();
        this.map.addEventListener('click', function (val) {
          console.log(val);
        })
        this.map.addEventListener('rightclick', function (val) {
          v.sysEvent()
        })
        this.get_CB_Code()
        this.get_GJ_Code()
      },
      get_CB_Code() {//获取船舶定位点

        this.$http.post('/pub/currentGps', {mmsi: 413839203}).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.addMarkCode(res.result.jd, res.result.wd, res.result.fxj)
          }
        }).catch(err => {})
        setTimeout(()=>{
          this.get_CB_Code()
        },60000)
      },
      addMarkCode(bdjd, bdwd, fxj) {
        console.log(bdjd);
        console.log(bdwd);
        var myIcon = new BMap.Icon(cbImg, new BMap.Size(60, 15), {imageSize: new BMap.Size(60, 15)}, {anchor: new BMap.Size(30, 17.5)});
        let point = new BMap.Point(bdjd, bdwd)

        var marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
        marker.setRotation(parseFloat(fxj) - 90)
        this.map.clearverlay();
        this.map.addOverlay(marker);               // 将标注添加到地图中
        this.map.setCenter(new BMap.Point(bdjd, bdwd))
      },
      get_GJ_Code() {//获取轨迹点
        var v = this
        let a = new Date()
        this.$http.post('/pub/newXc', {
          mmsi: "413839203",
          start: this.moment(a.getTime() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss'),
          end: this.moment().format('YYYY-MM-DD HH:mm:ss')
        }).then(res => {
          if (res.code == 200) {
            let pois = [];
            res.result.forEach((it, index) => {
              if (index == 0) {
                // v.map.setCenter(new BMap.Point(it.longitude, it.latitude))
                // v.map.setZoom(22)
              }
              pois.push(new BMap.Point(it.longitude, it.latitude))
              if (index == res.result.length - 1) {
                var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                  scale: 0.6,//图标缩放大小
                  strokeColor: '#fff',//设置矢量图标的线填充颜色
                  strokeWeight: '2',//设置线宽
                });
                var icons = new BMap.IconSequence(sy, '10', '30');
                var polyline = new BMap.Polyline(pois, {
                  enableEditing: false,//是否启用线编辑，默认为false
                  enableClicking: true,//是否响应点击事件，默认为true
                  icons: [icons],
                  strokeWeight: '8',//折线的宽度，以像素为单位
                  strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
                  strokeColor: "#18a45b" //折线颜色
                });

                v.map.addOverlay(polyline);          //增加折线
                v.map.setViewport(pois)
              }
            })
          }
        }).catch(err => {
        })
      },
      sysEvent() {
        this.$emit('sysEvent', 2)
      }
    }
  }
</script>

<style lang="less">
  .pager1Sty {
    background-color: #5E687D;
    .pagerTop {
      height: 40px;
      .textTit {
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
      .cbName {
        .textTit;
      }
      .cbType {
        .textTit;
      }
    }
    #carouselBox {
      background-color: #FFFFFF;
    }
  }

</style>
