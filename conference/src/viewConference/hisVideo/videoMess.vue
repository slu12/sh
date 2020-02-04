<template>
  <div class="box_col hisvideoMessPager">
    <!--<video-->
    <!--id="myVideo"-->
    <!--class="video-js vjs-default-skin vjs-big-play-centered"-->
    <!--controls-->
    <!--preload="auto"-->
    <!--style='width: 100%;height: 100%'-->
    <!--&gt;-->
    <!--&lt;!&ndash;:poster="poster"&ndash;&gt;-->
    <!--</video>-->
    <video id="my-video" class="video-js vjs-default-skin"
           controls preload="auto">
      <!--<source :src="videoSrc" type="application/x-mpegURL">-->
    </video>
      <!--tyle='width: 100%;height: auto'>-->
    <!--<div id="my-video" class="video-js vjs-default-skin box_col_auto">-->

    <!--</div>-->
    <!--<div v-if="false" id="" class="pagerRightBox box_col_auto boxPadd_LR boxPadd_T">-->
    <!--</div>-->
    <!--<div class="settingBox box_row">-->
    <!--<div class="settingItem">-->
    <!--<Icon type="ios-rewind" />-->
    <!--</div>-->
    <!--<div class="settingItem">-->
    <!--<Icon type="ios-play" />-->
    <!--</div>-->
    <!--<div class="settingItem">-->
    <!--<Icon type="ios-pause" />-->
    <!--</div>-->
    <!--<div class="settingItem">-->
    <!--<Icon type="ios-fastforward" />-->
    <!--</div>-->

    <!--<div class="settingItem" title="关闭" @click="closePager">-->
    <!--<Icon type="md-close-circle" color/>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import AgoraRTC from 'agora-rtc-sdk'
  import videoItemBox from './video/itemBox'

  import videojs from 'video.js'
  import 'videojs-contrib-hls'

  export default {
    name: "videoMess",
    components: {videoItemBox},
    data() {
      return {
        myVideo: '',
        videoSrc:"http://video.168car.net/20200204/23/1c0bcdf61d4c3395f7d67c8649da871c_20200204kzMbssVL.m3u8"
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(()=>{
          this.getVideo();
        },200)
        console.log(this.myVideo);
      });
    },
    methods: {
      getVideo() {
        // this.myVideo = videojs("myVideo", {
        //   bigPlayButton: true,
        //   textTrackDisplay: false,
        //   posterImage: false,
        //   errorDisplay: false,
        //   hls: {
        //     withCredentials: true
        //   }
        // });
        this.myVideo = videojs('my-video', {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: false,
          errorDisplay: false,
          controlBar: true
        }, function () {
          this.play()
        })
      },
      closePager() {
        this.$router.back()
      }

    }
  }
</script>

<style lang="less">
  @import "./less/mess";
</style>
