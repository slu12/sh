<template>
  <div class="box_col hisvideoMessPager" style="">
    <video id="my-video" class="video-js vjs-default-skin vjs-big-play-centered"
           controls preload="auto" style='width: 100%;height: 100%'>
      <source :src="videoSrc" type="application/x-mpegURL">
    </video>

    <div title="关闭" @click="closePager" style="position: fixed;top: 10px;right: 10px">
      <Tooltip content="退出" placement="bottom">
        <Icon type="md-close-circle" color="#ed4014" size="26"/>
      </Tooltip>
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
        videoSrc:""
          // "http://video.168car.net/20200204/10/d59add590e41720124510b8635f56a3e_20200203t4RcmjS0.m3u8"
      }
    },
    created() {
    },
    mounted() {
      console.log(this.$route);
      this.videoSrc = this.$route.params.url
      this.$nextTick(() => {
        setTimeout(()=>{
          this.getVideo();
        },2000)
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
