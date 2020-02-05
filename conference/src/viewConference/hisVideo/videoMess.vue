<template>
  <div class="box_col hisvideoMessPager" style="">
    <video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered"
           controls preload="auto" style='width: 100%;height: 100%'>
      <source :src="videoSrc" type="application/x-mpegURL">
    </video>
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

    <div class="settingItem" title="关闭" @click="closePager">
    <Icon type="md-close-circle" color/>
    </div>
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
        videoSrc:"http://video.168car.net/20200204/10/d59add590e41720124510b8635f56a3e_20200203t4RcmjS0.m3u8"
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(()=>{
          this.getVideo();
        },2000)
        console.log(this.myVideo);
      });
    },
    methods: {
      getVideo() {
        let domID = document.getElementById('my-video')
        this.myVideo = videojs(domID, {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: false,
          errorDisplay: false,
          controlBar: true
        }, function () {
          // this.play()
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
