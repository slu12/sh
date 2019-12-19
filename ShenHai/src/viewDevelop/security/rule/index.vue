<template>
  <div >
    <video v-for="(item,index) in videoList" :id="'my-video' + index " class="video-js vjs-default-skin" controls preload="auto" poster="" @click="playVideo('my-video' + index)" style="margin: 20px auto" >
      <source :src="item" type="application/x-mpegURL">
    </video>
    <video id="my-video9" class="video-js vjs-default-skin" controls preload="auto" poster="" @click="playVideo('my-video9')" style="margin-bottom: 50px" >
      <source src="http://139.196.253.185:6604/hls/1_30895_0_1.m3u8?JSESSIONID=0bc4b602-c037-4a10-97be-5ac9b3faf0e0" type="application/x-mpegURL">
    </video>
<!--    <video id="my-video1" class="video-js vjs-default-skin" controls preload="auto" poster="" @click="playVideo('my-video1')" style="margin-bottom: 50px" >-->
<!--      <source src="http://139.196.253.185:6604/hls/1_30895_1_1.m3u8?JSESSIONID=013ea50b-1078-4bf3-8f23-bf8ad5ebc485" type="application/x-mpegURL">-->
<!--    </video>-->
<!--    <video id="my-video2" class="video-js vjs-default-skin" controls preload="auto" poster="" @click="playVideo('my-video2')" >-->
<!--      <source src="http://139.196.253.185:6604/hls/1_30895_2_1.m3u8?JSESSIONID=013ea50b-1078-4bf3-8f23-bf8ad5ebc485" type="application/x-mpegURL">-->
<!--    </video>-->
  </div>
</template>

<script>
  import videojs from 'video.js'
  import 'videojs-contrib-hls'
    export default {
        name: "index",
      data(){
          return {
            ids: ['my-video0','my-video1','my-video2'],
            videoList:[]
          }
      },
      mounted() {

      },
      created() {
        this.getvideo('111')
      },
      methods: {
          playVideo(id){
            console.log(id)
            // let player = videojs(id);
            // console.log(id , player)
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
            console.log("2222")
          },
        getvideo(mmsi){
          this.$http.post('/api/cl/getAllChnH5',{mmsi:'413839203'}).then((res)=>{
            if (res.code == 200){
              if (!res.result || res.result.length<1){
                this.$Message.error('当前暂无视频')
              }
              this.videoList = res.result
            }else {
              this.$Message.error(res.message)
            }
          })
        },
      }
    }
</script>

<style scoped>

</style>
