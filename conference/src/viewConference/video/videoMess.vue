<template>
  <div class="box_col videoMessPager">
    <div class="box_row" style="height: 100%">
      <div class="pagerLeftBox">
        cnpm install agora-rtc-sdk ss
      </div>
      <div id="appid" class="pagerRightBox box_row_1auto boxMar">

      </div>
    </div>
  </div>
</template>

<script>
  import AgoraRTC from 'agora-rtc-sdk'
  export default {
    name: "videoMess",
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
      }

    }
  }
</script>

<style lang="less">
@import "./less/mess";
</style>
