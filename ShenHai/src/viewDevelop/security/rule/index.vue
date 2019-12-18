<template>
  <div >
    <video id="my-video0" class="video-js vjs-default-skin" controls preload="auto" poster="" @click="playVideo('my-video0')" style="margin-bottom: 50px" >
      <source src="http://139.196.253.185:6604/hls/1_30895_0_1.m3u8?JSESSIONID=013ea50b-1078-4bf3-8f23-bf8ad5ebc485" type="application/x-mpegURL">
    </video>
    <video id="my-video1" class="video-js vjs-default-skin" controls preload="auto" poster="" @click="playVideo('my-video1')" style="margin-bottom: 50px" >
      <source src="http://139.196.253.185:6604/hls/1_30895_1_1.m3u8?JSESSIONID=013ea50b-1078-4bf3-8f23-bf8ad5ebc485" type="application/x-mpegURL">
    </video>
    <video id="my-video2" class="video-js vjs-default-skin" controls preload="auto" poster="" @click="playVideo('my-video2')" >
      <source src="http://139.196.253.185:6604/hls/1_30895_2_1.m3u8?JSESSIONID=013ea50b-1078-4bf3-8f23-bf8ad5ebc485" type="application/x-mpegURL">
    </video>
  </div>
</template>

<script>
  import videojs from 'video.js'
  import 'videojs-contrib-hls'
    export default {
        name: "index",
      data(){
          return {
            ids: ['my-video0','my-video1','my-video2']
          }
      },
      mounted() {

      },
      methods: {
          playVideo(id){
            videojs(id, {
              bigPlayButton: true,
              textTrackDisplay: false,
              posterImage: true,
              errorDisplay: false,
              controlBar: true,
              width: 200
            }, function (val) {
              console.log(val, "--------")
              this.play();
            })
          }
      }
    }
</script>

<style scoped>

</style>
