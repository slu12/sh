<template>
  <div class="box_col videoMessPager">
    <div class="box_row" style="height: 100%">
      <div class="pagerLeftBox boxPadd_LR">
        <div class="box_col">
          <div class="box_col_autoY boxMar_TB">
            <!--<div v-for="(val,key) in remoteStreams">-->
              <!--<div>{{val}}</div>-->
              <!--<div>{{key}}</div>-->
            <!--</div>-->
            <!--<video-item-box  v-for="(val,key) in remoteStreams" :key="key"></video-item-box>-->
            <video-item-box v-for="(it,index) in remoteStreams" :key="index" :item="it"></video-item-box>
          </div>
        </div>
      </div>
      <div id="local_stream" class="pagerRightBox box_row_1auto boxMar boxPadd_LR boxPadd_T">
        <!--<div class="playVideoBox box_col">-->
        <!--<Icon type="logo-youtube" />-->
        <!--</div>-->
        <div class="settingBox box_row">
          <div class="settingItem">
            <Icon type="md-settings"/>
          </div>
          <div class="settingItem">
            <Icon type="md-mic-off"/>
            <!--<Icon type="md-mic" />-->
          </div>
          <div class="settingItem">
            <Icon type="ios-videocam"/>
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
    components: {videoItemBox},
    data() {
      return {
        client: '',
        appid: '8d1a79107f9c4decac672c4201a14693',
        key: '0068d1a79107f9c4decac672c4201a14693IAA6Krw92e3Wx+MtnTdY+FPKplBlzSV47XCInr4ndibrgsieo/oAAAAAEABcVIsjK8czXgEAAQAnxzNe',
        roomName:'libinbin1',
        params: {
          uid: 91,
        },
        localStream: '',
        remoteStreams: []
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.createClient()
        this.handleEvents()
      })
    },
    methods: {
      createClient() {//创建客户端。
        var v = this
        var config = {
          mode: "rtc",
          codec: "h264",
          // proxyServer: "YOUR NGINX PROXY SERVER IP",
          // proxyServer: "http://localhost:8080/",
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
        //-----
        this.client.init(v.appid, function () {
          console.log("client initialized");
          v.client.leave(function () {
            console.log('退出success');
          }, function () {
            console.log('退出error');
          })
          v.client.join(v.key, v.roomName, v.params.uid, function () {
            //success
            console.log('success');
            v.getDevices((obj) => {//获取设备ID(视频、音频)
              v.createStream(obj)
            })
          }, function () {
            //  error
            console.log(error);
          });
        }, function (err) {
          console.log("client init failed ", err);
        });
      },
      createStream(obj) {
        var v = this;
        v.localStream = AgoraRTC.createStream({
          streamID: v.params.uid,
          audio: true,
          video: true,
          screen: false,//全屏
          microphoneId: obj.audios.value,
          cameraId: obj.videos.value
        });
        v.localStream.init(function () {
          v.localStream.play("local_stream")//本地视频流
          v.client.publish(v.localStream, function (e) {
            console.log('将本地视频流发布出去**********************************');
          });
        });
      },
      getDevices(callback) {
        AgoraRTC.getDevices(function (items) {
          items.filter(function (item) {
            return ['audioinput', 'videoinput'].indexOf(item.kind) !== -1
          })
            .map(function (item) {
              return {
                name: item.label,
                value: item.deviceId,
                kind: item.kind,
              }
            });
          var videos = [];
          var audios = [];
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if ('videoinput' == item.kind) {
              var name = item.label;
              var value = item.deviceId;
              if (!name) {
                name = "camera-" + videos.length;
              }
              videos.push({
                name: name,
                value: value,
                kind: item.kind
              });
            }
            if ('audioinput' == item.kind) {
              var name = item.label;
              var value = item.deviceId;
              if (!name) {
                name = "microphone-" + audios.length;
              }
              audios.push({
                name: name,
                value: value,
                kind: item.kind
              });
            }
          }
          callback({videos: videos, audios: audios});
        });
      },

      //视频流接收
      handleEvents() {
        var rtc = this
        // Occurs when an error message is reported and requires error handling.
        rtc.client.on("error", (err) => {
          console.log(err)
        })
        // Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.
        rtc.client.on("peer-leave", function (evt) {
          var id = evt.uid;
          console.log("id", evt);
          if (id != rtc.params.uid) {
            rtc.removeView(id);
          }
          // Toast.notice("peer leave")
          console.log('peer-leave', id);
        })
        // Occurs when the local stream is published.
        rtc.client.on("stream-published", function (evt) {
          // Toast.notice("stream published success")
          console.log("stream-published");
        })
        // Occurs when the remote stream is added.
        rtc.client.on("stream-added", function (evt) {
          console.log('加入视频流111111');
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          // Toast.info("stream-added uid: " + id)
          // if (id !== rtc.params.uid) {
            rtc.client.subscribe(remoteStream, function (err) {
              console.log('加入视频流222222');

              console.log("stream subscribe failed", err);
            })
          // }
          console.log('stream-added remote-uid: ', id);
        });
        // Occurs when a user subscribes to a remote stream.
        rtc.client.on("stream-subscribed", function (evt) {
          console.log('监控进入', evt);
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          console.log(id);
          rtc.remoteStreams.push(remoteStream);
          // rtc.remoteStreams.id = remoteStream
          console.log('监控进入', rtc.remoteStreams);
          setTimeout(()=>{
            remoteStream.play("remote_video_"+id);
          },100)
          // Toast.info('stream-subscribed remote-uid: ' + id);
          console.log('stream-subscribed remote-uid: ', id);
        })
        // Occurs when the remote stream is removed; for example, a peer user calls Client.unpublish.
        rtc.client.on("stream-removed", function (evt) {
          console.log('监控结束', evt);

          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          // Toast.info("stream-removed uid: " + id)
          remoteStream.stop("remote_video_" + id);
          rtc.remoteStreams = rtc.remoteStreams.filter(function (stream) {
            return stream.getId() !== id
          })
          removeView(id);
          console.log('stream-removed remote-uid: ', id);
        })
        rtc.client.on("onTokenPrivilegeWillExpire", function () {
          // After requesting a new token
          // rtc.client.renewToken(token);
          // Toast.info("onTokenPrivilegeWillExpire")
          console.log("onTokenPrivilegeWillExpire")
        });
        rtc.client.on("onTokenPrivilegeDidExpire", function () {
          // After requesting a new token
          // client.renewToken(token);
          // Toast.info("onTokenPrivilegeDidExpire")
          console.log("onTokenPrivilegeDidExpire")
        })
      },
      removeView(id){
        console.log('************',id);
        console.log(this.remoteStreams[0].getId());
        this.remoteStreams.forEach((it,index)=>{
          if(id === it.getId()){
            this.remoteStreams.splice(index,1)
          }
        })
      },
      closePager() {//关闭页面
        var v = this
        this.client = ""

        // this.client.unpublish(v.localStream, function(err) {//取消发布本地音视频流
        //   console.log(err);
        // })

        // this.client.leave(function () {
        //   console.log('退出success');
        // }, function () {
        //   console.log('退出error');
        // })
        // this.$router.back()
      },
      //  =======================
      createStreamDEF() {//创建音视频流对象。
        var v = this
        navigator.mediaDevices.getUserMedia(
          {video: true, audio: true}
        ).then(function (mediaStream) {
          // console.log('===',mediaStream);
          var videoSource = mediaStream.getVideoTracks()[0];
          var audioSource = mediaStream.getAudioTracks()[0];
          // console.log('===',videoSource);
          // console.log('===',audioSource);
          // 对 videoSource 和 audioSource 进行处理后
          var localStream = AgoraRTC.createStream({

            video: true,
            audio: true,
            videoSource: videoSource,
            audioSource: audioSource
          });
          localStream.init(function () {
            v.client.publish(localStream, function (e) {

              console.log('push**********************************');
            });
          });
        });
      },

      getDevicesDEf() {//获取可用的媒体输入/输出设备。
        console.log('getDevices');
        AgoraRTC.getDevices(function (devices) {
          console.log('****');
          console.log(devices);
          var devCount = devices.length;

          var id = devices[0].deviceId;
        }, function (errStr) {
          console.error("Failed to getDevice", errStr);
        });
      },

    }
  }
</script>

<style lang="less">
  @import "./less/mess";
</style>
