<template>
  <div class="box_col">
    <div id="viewDiv" class="box_col_100"></div>
  </div>
</template>
<script>
  // import ArcGISMap from '@/libs/esri/Map';
  // import MapView from '@/libs/esri/views/MapView';
  import {loadModules} from 'esri-loader';

  export default {
    name: "index",
    created() {
      // this.buildMap2()
      this.loadArcgis()
    },
    mounted() {
      this.$nextTick(() => {
        // this.buildMap2()
      })
    },
    methods: {
      buildMap() {
      },
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
      },
      buildMap2() {
        loadModules(['esri/Map', 'esri/views/MapView'], {css: true})
          .then(([ArcGISMap, MapView]) => {
            const map = new ArcGISMap({
              basemap: 'viewDiv'
            });

            this.view = new MapView({
              container: this.$el,
              map: map,
              center: [-118, 34],
              zoom: 8
            });
          });
      }
    }
  }
</script>

<style lang="less">
 @import "https://js.arcgis.com/4.14/esri/css/main.css";
</style>
