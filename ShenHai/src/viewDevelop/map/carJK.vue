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
<style lang="less">
@import "https://js.arcgis.com/3.24/esri/css/esri.css";
</style>
<!--地图选点-->
<template>
  <div style="height: 100%;background-color: #00FFFF;">
    <!--<car-info ref="carInfoButton"></car-info>-->
    <!-- <div id="allmap1"></div> -->
    <div id="viewDiv" style="height: 100%;background-color: #00FFFF;"></div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
export default {
  name: "getmapdot",
  components: {},
  data() {
    return {
      mapInfo: "",
      componentName: "",
      choosedItem: null,
      map: "",
      mapcenter: {
        lng: 118.439435,
        lat: 31.358537
      },
      zoom: 7,
      carList: [],
      zoomDot: [],
      fancePoints: [
        { lng: 114.27226, lat: 30.608123 },
        { lng: 114.157277, lat: 30.544446 },
        { lng: 114.418288, lat: 30.526529 }
      ]
    };
  },
  created() {
    this.loadArcgis();
  },
  watch: {
    // 'zoom':function(newVal, oldVal) {
    //   this.init()
    // }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.Buildmap();
    //   setTimeout(() => {
    //     this.init();
    //   }, 1000)
    // })
  },
  methods: {
    loadArcgis() {
      // 标记分组，当地图缩放等级较低时，只显示该区域有多少个标记
      var areaMap = new Map();
      // 地图是否缩放完毕
      var stationary = false;

      // 重置标记分组数据
      function resetAreaMap() {
        areaMap = new Map();
      }
      const options = {
        url: "https://js.arcgis.com/4.14/"
      };
      this.esriLoader
        .loadModules(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/Graphic",
            "esri/layers/MapImageLayer",
            "esri/layers/GraphicsLayer",
            "dojo/domReady!"
          ],
          options
        )
        .then(([Map, MapView, Graphic, MapImageLayer, GraphicsLayer]) => {
          var map = new Map({
            basemap: "topo" // 基础地图
          });
          var defaultZoom = 8;

          var view = new MapView({
            container: "viewDiv", // 地图所在的div id
            map: map,
            center: [118.71511, 32.09042], // 地图中心点
            zoom: defaultZoom
          });

          var points = [];

          var layerkml = new MapImageLayer({
            url: "http://www.cjienc.com/arcgis/rest/services/CJ_Demo/MapServer"
          });

          map.add(layerkml);
          var graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          // 加载图片标记
          reloadPoint(points, 12);

          // 监听缩放事件
          map.watch("zoom", function(e) {
            if (!stationary) {
              zoomChange(e);
            }
          });

          // 监听地图是否缩放完毕
          map.watch("stationary", function(e) {
            stationary = e;
          });

          // 当地图缩放，或者数据重新加载时，重新绘制地图标记
          function reloadPoint(pointData, zoom) {
            zoom = parseInt(zoom);
            var lngd = 400 / zoom;
            var latd = 400 / zoom;

            graphicsLayer.removeAll();
            resetAreaMap();

            // 如果缩放等级较高，则显示具体标记点
            if (zoom >= 12) {
              showPointDetail();
              return;
            }

            // 地图标记按区域分组
            for (var item of eval(pointData)) {
              let name = getAreaName(item.lng, item.lat, lngd, latd);
              let val = areaMap.get(name);
              if (val == null) {
                areaMap.set(name, 1);
              } else {
                areaMap.set(name, val + 1);
              }
            }

            // 将分组数据加载到地图上
            for (let r of areaMap) {
              let index = r[0].indexOf("_");
              let lng = parseFloat(r[0].substring(0, index));
              let lat = parseFloat(r[0].substring(index + 1, r[0].length));

              lng = lng / 100;
              lat = lat / 100;

              addTextMarker(graphicsLayer, lng, lat, r[1]);
            }
          }

          // 显示具体标记
          function showPointDetail() {
            for (var item of eval(points)) {
              addImgMarker(
                graphicsLayer,
                item.lng,
                item.lat,
                0,
                "https://developers.arcgis.com/labs/images/bluepin.png",
                14,
                26
              );
            }
          }

          // 获取分组的名字
          function getAreaName(lng, lat, lngd, latd) {
            return (
              parseInt((lng * 100) / lngd) * lngd +
              "_" +
              parseInt((lat * 100) / latd) * latd
            );
          }

          // 添加图片标记
          function addImgMarker(layer, lng, lat, angle, url, width, height) {
            if (width == null) {
              width = 14;
            }
            if (height == null) {
              height = 26;
            }
            // ----添加图片开始-------
            var pictureGraphic = new Graphic({
              geometry: {
                type: "point",
                longitude: lng, // 图片位置
                latitude: lat
              },
              symbol: {
                angle: angle,
                type: "picture-marker",
                url: url, // 图片地址
                width: width + "px", // 图片宽度
                height: height + "px" // 图片高度
              }
            });
            layer.add(pictureGraphic);
          }

          // 添加文字标记
          function addTextMarker(graphicsLayer, lng, lat, text) {
            var textGraphic = new Graphic({
              geometry: {
                type: "point",
                longitude: lng,
                latitude: lat
              },
              symbol: {
                type: "text",
                color: [25, 25, 25],
                haloColor: [255, 0, 255],
                haloSize: "20px",
                text: text,
                xoffset: 0,
                yoffset: 0,
                font: {
                  size: 12
                }
              }
            });
            graphicsLayer.add(textGraphic);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="less">
@import "https://js.arcgis.com/4.14/esri/css/main.css";
</style>
