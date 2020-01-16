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
@import "https://js.arcgis.com/3.24/esri/css/main.css";
</style>
<!--地图选点-->
<template>
  <div style="height: 100%;background-color: #00FFFF;">
    <!--<car-info ref="carInfoButton"></car-info>-->
    <!-- <div id="allmap1"></div> -->
    <div id="viewDiv"></div>
  </div>
</template>

<script>
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
      const options = {
        url: "https://js.arcgis.com/3.24/"
      };
      console.log("loadModules");
      console.log("esriLoader:", this.esriLoader);
      console.log("123");
      this.esriLoader
        .loadModules(["esri/map", "dojo/domReady!"], options)
        .then(([Map]) => {
          console.log("then");
          let map = new Map("viewDiv", {
            basemap: "topo",
            center: [113.3209952545166, 23.090055306224895],
            zoom: 15
          });
          console.log(map);
        })
        .catch(err => {});
    }
  }
};
</script>
