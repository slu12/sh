<template>
  <div class="box_col">
    <div id="viewDiv" class="box_col_100"></div>
  </div>
</template>

<script>


  export default {
    name: "index",
    mounted(){
      this.$nextTick(()=>{
        // this.buildMap()
      })
    },
    methods:{
      buildMap(){
        // 标记分组，当地图缩放等级较低时，只显示该区域有多少个标记
        var areaMap = new Map()
        // 地图是否缩放完毕
        var stationary = false

        // 重置标记分组数据
        function resetAreaMap(){
          areaMap = new Map()
        }
        define([
          "esri/Map",
          "esri/views/MapView",
          "esri/Graphic",
          "esri/layers/GraphicsLayer",
          "esri/layers/MapImageLayer"
        ], function(Map, MapView,Graphic,GraphicsLayer,MapImageLayer) {
          var map = new Map({
            basemap: "topo" // 基础地图
          });
          var defaultZoom = 8

          var view = new MapView({
            container: "viewDiv", // 地图所在的div id
            map: map,
            center: [118.71511,32.09042], // 地图中心点
            zoom: defaultZoom
          });

          // 官方提供的加载数据接口的方法
          // 动态地图服务图层
          var layerkml = new MapImageLayer({
            url:"http://www.cjienc.com/arcgis/rest/services/CJ_Demo/MapServer"
          });

          map.add(layerkml);
          //注意这里的显示层级，新增的图层会遮罩之前添加的图层
          var graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          // 加载图片标记
          reloadPoint(points,defaultZoom)

          // 监听缩放事件
          view.watch("zoom",function(e){
            if (!stationary){
              zoomChange(e)
            }
          })

          // 监听地图是否缩放完毕
          view.watch("stationary",function(e){
            stationary = e
          })

          // 当地图缩放，或者数据重新加载时，重新绘制地图标记
          function reloadPoint(pointData, zoom){
            zoom = parseInt(zoom)
            var lngd = 400 / zoom
            var latd = 400 / zoom

            graphicsLayer.removeAll()
            resetAreaMap()

            // 如果缩放等级较高，则显示具体标记点
            if (zoom >= 12){
              showPointDetail()
              return
            }

            // 地图标记按区域分组
            for (var item of eval(pointData)) {
              let name = getAreaName(item.lng,item.lat,lngd,latd)
              let val = areaMap.get(name)
              if (val == null){
                areaMap.set(name,1)
              }else{
                areaMap.set(name,val +  1)
              }
            }

            // 将分组数据加载到地图上
            for (let r of areaMap){
              let index = r[0].indexOf("_")
              let lng = parseFloat(r[0].substring(0,index))
              let lat = parseFloat(r[0].substring(index+1,r[0].length))

              lng = lng / 100
              lat = lat / 100

              addTextMarker(graphicsLayer,lng,lat,r[1])
            }
          }

          // 显示具体标记
          function showPointDetail(){
            for (var item of eval(points)) {
              addImgMarker(graphicsLayer,item.lng,item.lat,0,"https://developers.arcgis.com/labs/images/bluepin.png",14,26)
            }
          }

          // 获取分组的名字
          function getAreaName(lng,lat,lngd,latd) {
            return parseInt(lng * 100  / lngd) * lngd + "_"+ parseInt(lat * 100  / latd) * latd
          }

          // 添加图片标记
          function addImgMarker(layer,lng,lat,angle,url,width,height) {
            if (width == null){
              width = 14
            }
            if (height == null){
              height = 26
            }
            // ----添加图片开始-------
            var pictureGraphic = new Graphic({
              geometry: {
                type: "point",
                longitude: lng,  // 图片位置
                latitude: lat
              },
              symbol: {
                angle:angle,
                type: "picture-marker",
                url: url, // 图片地址
                width: width + "px", // 图片宽度
                height: height+ "px" // 图片高度
              }
            });
            layer.add(pictureGraphic);
          }

          // 添加文字标记
          function addTextMarker(graphicsLayer,lng,lat,text) {
            var textGraphic = new Graphic({
              geometry: {
                type: "point",
                longitude:lng,
                latitude: lat
              },
              symbol: {
                type: "text",
                color: [25,25,25],
                haloColor: [255,0,255],
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
        });
      },
      buildMap2(){
        define([
          "dojo/has",
          "esri/config",
          "esri/WebMap",
          "esri/layers/CSVLayer",
          "esri/views/MapView",
          "esri/widgets/Legend",
          "esri/widgets/Expand"
        ], function (has, esriConfig,WebMap, CSVLayer, MapView,Legend, Expand) {

          if (!has("dojo-built")) {
            esriConfig.workers.loaderConfig = {
              paths: {
                "esri": "../arcgis-js-api",
                "dstore": "../dojo-dstore"
              }
            };
          }

          var url =
            "https://arcgis.github.io/arcgis-samples-javascript/sample-data/hurricanes.csv";

          var csvLayer = new CSVLayer({
            title: "Hurricanes",
            url: url,
            copyright: "NOAA",
            popupTemplate: {
              title: "{Name}",
              content: [{
                type: "text",
                text: "Category {Category} storm with that occurred at {ISO_time}."
              }, {
                type: "fields",
                fieldInfos: [{
                  fieldName: "wmo_pres",
                  label: "Pressure"
                }, {
                  fieldName: "wmo_wind",
                  label: "Wind Speed (mph)"
                }]
              }],
              fieldInfos: [{
                fieldName: "ISO_time",
                format: {
                  dateFormat: "short-date-short-time"
                }
              }]
            },
            renderer: {
              type: "unique-value",
              field: "Category",
              uniqueValueInfos: createUniqueValueInfos()
            }
          });

          var map = new WebMap({
            // contains a basemap with a South Pole Stereographic projection
            // the CSVLayer coordinates will re-project client-side
            // with the Projection Engine to match the view's Spatial Reference
            basemap: {
              portalItem: {
                id: "3113eacc129942b4abde490a51aeb33f"
              }
            },
            layers: [csvLayer]
          });

          var view = new MapView({
            container: "viewDiv",
            map: map,
            highlightOptions: {
              color: "#ff642e",
              haloOpacity: 1,
              fillOpacity: 0.25
            },
            popup: {
              dockEnabled: true,
              dockOptions: {
                breakpoint: false
              }
            }
          });

          var legendExpand = new Expand({
            view: view,
            content: new Legend({
              view: view,
              style: "card"
            })
          });
          view.ui.add(legendExpand, "top-left");

          function createUniqueValueInfos() {
            var fireflyImages = [
              "cat1.png",
              "cat2.png",
              "cat3.png",
              "cat4.png",
              "cat5.png"
            ];

            var baseUrl =
              "https://arcgis.github.io/arcgis-samples-javascript/sample-data/";

            return fireflyImages.map(function (url, i) {
              return {
                value: i + 1, // Category number
                symbol: {
                  type: "picture-marker",
                  url: baseUrl + url
                }
              }
            });
          }
        });
      }
    }
  }
</script>

<style lang="less">
/*@import "https://js.arcgis.com/4.14/esri/css/main.css";*/
</style>
