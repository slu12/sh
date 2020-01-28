<template>
  <div class="box_col videoMessPager">
    <div class="box_row" style="height: 100%">
      <div class="pagerLeftBox boxPadd_LR">
        <div class="box_col">
          <div class="box_col_autoY boxMar_TB">
            <video-item-box v-for="(it,index) in 10" :item="index.toString()"></video-item-box>
          </div>
        </div>
      </div>
      <div id="" class="pagerRightBox box_row_1auto boxMar boxPadd_LR boxPadd_T">
        <div class="playVideoBox box_col">
          <Icon type="logo-youtube" />
        </div>
        <div class="settingBox box_row">
          <div class="settingItem">
            <Icon type="md-settings" />
          </div>
          <div class="settingItem">
            <Icon type="md-mic-off" />
            <!--<Icon type="md-mic" />-->
          </div>
          <div class="settingItem">
            <Icon type="ios-videocam" />
          </div>
          <div class="settingItem" title="关闭" @click="closePager">
            <Icon type="md-close-circle" color/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import AgoraRTC from 'agora-rtc-sdk'
  import videoItemBox from './video/itemBox'
  export default {
    name: "videoMess",
    components:{videoItemBox},
    data(){
      return {
        client:''
      }
    },
    created(){
    },
    mounted(){
      this.$nextTick(()=>{
        this.createClient()
      })
    },
    methods:{
      createClient(){//创建客户端。
        var config = {
          mode: "live",
          codec: "vp8",
          // proxyServer: "YOUR NGINX PROXY SERVER IP",
          proxyServer: "http://localhost:8080/",
          // turnServer: {
          //   turnServerURL: "YOUR TURNSERVER URL",
          //   username: "YOUR USERNAME",
          //   password: "YOUR PASSWORD",
          //   udpport: "THE UDP PORT YOU WANT TO ADD",
          //   tcpport: "THE TCP PORT YOU WANT TO ADD",
          //   forceturn: false
          // }
        }
        this.client = AgoraRTC.createClient(config);

        // this.client.init("appId", function() {
        //   console.log("client initialized");
        // }, function(err) {
        //   console.log("client init failed ", err);
        // });
        // this.createStream()
        this.getDevices()
      },
      createStream(){//创建音视频流对象。
        var v = this
        navigator.mediaDevices.getUserMedia(
          {video: true, audio: true}
        ).then(function(mediaStream){
          console.log('===',mediaStream);

          var videoSource = mediaStream.getVideoTracks()[0];
          var audioSource = mediaStream.getAudioTracks()[0];

          console.log('===',videoSource);
          console.log('===',audioSource);
          // 对 videoSource 和 audioSource 进行处理后
          // var localStream = AgoraRTC.createStream({
          //   video: true,
          //   audio: true,
          //   videoSource: videoSource,
          //   audioSource: audioSource
          // });
          // localStream.init(function(){
          //   v.client.publish(localStream, function(e){
          //   });
          // });
        });
      },
      getDevices(){//获取可用的媒体输入/输出设备。
        console.log('getDevices');
        AgoraRTC.getDevices (function(devices) {
          var devCount = devices.length;

          var id = devices[0].deviceId;
        }, function(errStr){
          console.error("Failed to getDevice", errStr);
        });
      },
      closePager(){
        this.$router.back()
      }

    }
  }
</script>

<style lang="less">
@import "./less/mess";
</style>
