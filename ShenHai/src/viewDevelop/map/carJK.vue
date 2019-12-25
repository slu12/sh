<!--
车辆监控
-->
<style type="text/css">
  #allmap {
    height: 100%;
    width: 100%;
  }

  #tcBtn {
    bottom: auto !important;
    top: 8px !important;
    left: 23px !important;
    right: auto !important;
    z-index: 9999;
  }

  #tcWrap {
    display: none;
    bottom: auto !important;
    top: 435px !important;
    left: 20px !important;
    right: auto !important;
    z-index: 9999;
  }
</style>
<!--地图选点-->
<template>
  <div style="height: 100%;background-color: #00FFFF;">
    <!--<car-info ref="carInfoButton"></car-info>-->
    <div id="allmap"></div>
  </div>
</template>

<script>
  export default {
    name: 'getmapdot',
    components: {},
    data() {
      return {
        mapInfo:"",
        componentName: '',
        choosedItem: null,
        map: '',
        mapcenter: {
          lng: 118.439435,
          lat: 31.358537
        },
        zoom: 7,
        carList: [],
        zoomDot: [],
        fancePoints: [
          {lng: 114.27226, lat: 30.608123},
          {lng: 114.157277, lat: 30.544446},
          {lng: 114.418288, lat: 30.526529},
        ]
      }
    },
    created() {
    },
    watch:{
      'zoom':function(newVal, oldVal) {
        this.init()
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.Buildmap();
        setTimeout(() => {
          this.init();
        }, 1000)
      })

    },
    methods: {
      showFance(carId) {
        this.fancePoints = [];
        var v = this
        this.$http.get(this.apis.DZWL.GET_BY_CAR_ID + "?clId=" + carId).then((res) => {
          if (res.code === 200) {
            let s = res.result.dlxxzb;
            let ps = s.split(";");
            for (let r of ps) {
              let point = r.split(",");
              this.fancePoints.push({lng: point[1], lat: point[0]})
            }
            this.addArea(this.fancePoints);
          }
        })
      },
      showPath(carId) {
        this.addLine(this.fancePoints);
      },
      update() {
        var v = this
        v.carList = v.$parent.mapCarList;
        v.moveMap();
        v.showCarPosition();
      },
      moveMap() {
        console.log(this.carList, 'this.carList');
        if (this.carList.length == 0) return;
        var v = this
        if (this.carList && this.carList.length == 1) {
          console.log(this.carList[0], 'this.carList[0]');
          v.map.centerAndZoom(new BMap.Point(this.carList[0].lng, this.carList[0].lat), this.zoom);  // 初始化地图,设置中心点坐标和地图级别
        }
      },
      init() {
        console.log('this.$parent.mapCarList', this.$parent.mapCarList)
        this.carList = this.$parent.mapCarList;
        if (this.carList.length === 1) {
          this.car = this.carList[0];
          this.chooseCar(this.car);
        } else if (this.carList.length > 0) {
          this.car = null;
          this.map.centerAndZoom(new BMap.Point(this.mapcenter.lng, this.mapcenter.lat), this.zoom);  // 初始化地图,设置中心点坐标和地图级别
        } else {
          this.car = null;
        }
        this.moveMap();
        this.showCarPosition();
      },
      Buildmap() {
        // 百度地图API功能

        // map.centerAndZoom(new BMap.Point(this.mapcenter.lng, this.mapcenter.lat), this.zoom);
        //

        console.log('创建地图')
        var v = this
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        // v.map = new BMap.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(this.mapcenter.lng, this.mapcenter.lat), v.zoom);  // 初始化地图,设置中心点坐标和地图级别
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
        var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        var top_right_navigation = new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          type: BMAP_NAVIGATION_CONTROL_SMALL
        }); //右上角，仅包含平移和缩放按钮
        map.enableScrollWheelZoom();
        map.addControl(top_left_control);
        map.addControl(top_left_navigation);
        // map.addControl(top_right_navigation);
         map.addEventListener('zoomend', function () {
          // 打印出当前缩放值
          console.log(20180925104046, map.getZoom());
          this.zoom = map.getZoom()
           console.log(this.zoom,'zoom');
          v.showCarPosition()
        })
        v.map = map
      },
      //撒点
      showCarPosition() {
        console.log('撒点')
        this.clear()
        var v = this
        for (let r of this.carList) {
          var point = new BMap.Point(r.lng, r.lat);
          this.addMarker(r, point);
          // this.addLabel(r, point);
        }
      },
      addLabel(item, point) {
        console.log('添加标注')
        let html = '<div style="width: 160px;height: 28px;padding:4px;">' +
          '<p>[' + item.shipname + '] </p> ' +
          '<p>' +"航速"+ item.hs + ' km/h </p>' +
          '</div>'
        var myLabel = new BMap.Label(html,     //为lable填写内容
          {
            offset: new BMap.Size(-80, -70),                  //label的偏移量，为了让label的中心显示在点上
            position: point
          });                                //label的位置
        myLabel.setStyle({                                   //给label设置样式，任意的CSS都是可以的
          // color:"red",                   //颜色
          fontSize: "16px",               //字号
          // opacity:0.5,
          'background-color': 'rgba(255,255,255,0.6)',
          // border:"none",                    //边
          'border-radius': '4px',
          height:"45px",                //高度
          // width:"125px",                 //宽
          // textAlign:"center",            //文字水平居中显示
          // lineHeight:"120px",            //行高，文字垂直居中显示
          // background:"url(http://cdn1.iconfinder.com/data/icons/CrystalClear/128x128/actions/gohome.png)",    //背景图片，这是房产标注的关键！
          // cursor:"pointer"
        });
        myLabel.setTitle("");//为label添加鼠标提示
        this.showCarPosition()
        this.map.addOverlay(myLabel);
      },
      addLine(points) {
        let ps = [];
        // console.log("百度经纬度 : " , points);
        for (let r of points) {
          ps.push(new BMap.Point(r.bdjd, r.bdwd))
        }
        // console.log("ps " , ps);
        var polygon = new BMap.Polyline(ps, {strokeColor: "red", strokeWeight: 5, strokeOpacity: 0.5});  //创建多边形

        this.map.addOverlay(polygon);
      },
      addArea(points) {
        let ps = [];
        for (let r of points) {
          ps.push(new BMap.Point(r.lng, r.lat))
        }
        var polygon = new BMap.Polygon(ps, {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.5});  //创建多边形
        this.map.addOverlay(polygon);
      },
      addMarker(item, point) {
        var v = this
        let a = parseInt(v.map.getZoom())
        console.log(a,'a');
        if (a<6){
          var myIcon = new BMap.Icon(this.getIcon(item), new BMap.Size(9, 9), {anchor: new BMap.Size(9,9)});
        } else if(a >= 6&& a<9 ){
          var myIcon = new BMap.Icon(this.getIcon(item), new BMap.Size(16, 16), {anchor: new BMap.Size(16,24)});
        }else if (a >= 9 && a< 12 ){
          var myIcon = new BMap.Icon(this.getIcon(item), new BMap.Size(32, 32), {anchor: new BMap.Size(32, 32)});
        }else if(a >= 12){
          var myIcon = new BMap.Icon(this.getIcon(item), new BMap.Size(64, 64), {anchor: new BMap.Size(12,12)});
        }else {
          var myIcon = new BMap.Icon(this.getIcon(item), new BMap.Size(12, 12), {anchor: new BMap.Size(12,12)});
        }
         var marker = new BMap.Marker(point, {icon: myIcon});
        marker.setRotation(-45)
        marker.addEventListener("click", (code) => {
          // console.log('point',point);
          // v.$parent.$refs.carInfoRef.init(item);
          v.$emit('codeEvent', item)
          v.addLabel(item, point);
        });
        this.map.addOverlay(marker);
        this.addClickHandler(item, marker);
      },
      getIcon(car) {
        switch (car.status) {
          case 1:
            return this.apis.STATIC_PATH + 'icon/ic_car.png';
          case 2:
            return this.apis.STATIC_PATH + 'icon/running.png';
          default:
              return this.apis.STATIC_PATH + 'icon/ic_car_offline.png'
        }
      },
      addClickHandler(item, marker) {
        var v = this
        marker.addEventListener("click", function (e) {
          v.choosedItem = item;
        })
      },
      chooseCar(item) {
      },
      clear() {
        this.map.clearOverlays();//清除数据点
      }
    }
  }
</script>
