<template>
  <div class="box_col videoMessPager">
    <div class="topBox boxPadd box_row colCenter rowBetween">
      <div class="box_row">
        <div class="conName">
          会议主题
        </div>
      </div>
      <div class="box_row colCenter">
        <div class="conTime">
          00:00:00
        </div>
        <Button type="primary" class="boxMar_L">会议静音</Button>
        <Button type="error" class="boxMar_L" @click="closePager">退出房间</Button>
      </div>
    </div>
    <div class="box_row" style="height: 100%">
      <div class="pagerLeftBox boxPadd_LR">
        <div class="box_col">
          <Card class="cardaItemBox boxMar_T">
            <div slot="title" class="box_row rowBetween colCenter">
              <div class="box_row colCenter">
                <Avatar>A</Avatar>
                <div class="namebox">
                  name
                </div>
              </div>
              <div class="box_row colCenter">
                <div style="margin-right: 12px">
                  主讲
                </div>
                <Icon type="md-expand" size="22"
                      style="cursor: pointer"
                      @click.native="showMaxVideo('0000')"
                />
              </div>
            </div>
            <div id="localVidioBox" class="videoBox">
              <Icon type="logo-youtube"/>
            </div>
            <div style="position: relative">
              <div class="settingBox box_row"
                   style="position: absolute;
                    bottom: 0px;
                    left: 50%;
                    transform: translateX(-50%);">
                <div class="settingItem" @click="setAudio">
                  <Icon v-show="muteAudio" type="md-mic"/>
                  <Icon v-show="!muteAudio" type="md-mic-off"/>
                </div>
                <div class="settingItem" style="position: relative" @click="setVideo">
                  <Icon v-show="muteVideo" type=" iconfont iconvideo_on"/>
                  <Icon v-show="!muteVideo" type=" iconfont iconvideo_off"/>
                </div>
              </div>
            </div>
          </Card>
          <div class="box_col_autoY boxMar_TB">
            <!--<div v-for="(val,key) in remoteStreams">-->
            <!--<div>{{val}}</div>-->
            <!--<div>{{key}}</div>-->
            <!--</div>-->
            <!--<video-item-box  v-for="(val,key) in remoteStreams" :key="key"></video-item-box>-->
            <video-item-box v-for="(it,index) in remoteStreams" :key="index" :item="it"></video-item-box>
          </div>

          <div class="boxMar_B">
            <Button type="success" long>会议开始</Button>
            <!--<Button type="warning">会议结束</Button>-->
          </div>
        </div>
      </div>
      <div class="pagerRightBox box_row_1auto boxMar boxPadd">
        <div class="box_col">
          <div id="local_stream" class="box_col_100">

          </div>
          <div class="eventBoxBottom boxMar_T box_row colCenter">
            <div class="box_row_100">
            </div>
            <div class="settingBox box_row_100 box_row rowCenter">
              <div class="settingItem" @click="setAudio">
                <Icon v-show="muteAudio" type="md-mic"/>
                <Icon v-show="!muteAudio" type="md-mic-off"/>
              </div>
              <div class="settingItem" @click="setVideo">
                <Icon v-show="muteVideo" type=" iconfont iconvideo_on"/>
                <Icon v-show="!muteVideo" type=" iconfont iconvideo_off"/>
              </div>
              <!--<div class="settingItem" title="关闭" @click="closePager">-->
              <!--<Icon type="md-close-circle" color/>-->
              <!--</div>-->
            </div>
            <div class="box_row_100 box_row rowRight">
              <Button type="default" @click="shareEvent">屏幕共享</Button>
            </div>
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
        //===========
        rtcConfig: {
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
        },
        //===========
        client: '',//客户端对象
        localStream: '',//创建音视频流对象。
        appid: '8d1a79107f9c4decac672c4201a14693',
        key: '0068d1a79107f9c4decac672c4201a14693IAAIWDXK4TYMsEa7ivGPsyVy5i78KgCqufVjlGwPUl+oh8ieo/oAAAAAEAA8xgfcptA2XgEAAQCl0DZe',
        roomName: 'libinbin1',
        params: {
          uid: 99,
        },
        DevicesInfo: {},//浏览器设备信息
        localStreamMin: "",//创建音视频流对象 小窗口。
        remoteStreams: [],//接收的音视频流对象
        //本地通道
        muteAudio: true,//音频轨道
        muteVideo: true,//视频轨道
        //屏幕共享参数配置
        shareClient: "",//分享的客户端
        shareStream: '',//创建音视频流对象。
        shareParams: {
          uid: 99999
        }
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.createClient();
        this.handleEvents();
      })
    },
    methods: {
      createClient() {//创建客户端。
        var v = this
        this.client = AgoraRTC.createClient(v.rtcConfig);
        //-----
        this.client.init(v.appid, function () {//初始化客户端
          console.log("client initialized");
          // v.client.leave(function () {
          //   console.log('退出success');
          // }, function () {
          //   console.log('退出error');
          // })
          v.client.join(v.key, v.roomName, v.params.uid, function () {
            v.getDevices((obj) => {//获取设备ID(视频、音频)
              v.createStream()
            })
          }, function (error) {
            console.log(error);
          });
        }, function (err) {
          console.log("client init failed ", err);
        });
      },
      createStream() {//创建音视频流对象
        var v = this;
        v.localStream = AgoraRTC.createStream({
          streamID: v.params.uid,
          audio: true,
          video: true,
          screen: false,//屏幕共享
          microphoneId: v.DevicesInfo.audios.value,
          cameraId: v.DevicesInfo.videos.value
        });
        v.localStream.init(function () {
          v.localStream.play("local_stream")//本地视频流大模块
          v.client.publish(v.localStream, function (e) {
            console.log('将本地视频流发布出去**********************************');
          });
        });

        v.localStreamMin = AgoraRTC.createStream({
          streamID: v.params.uid,
          audio: true,
          video: true,
          screen: false,////屏幕共享
          microphoneId: v.DevicesInfo.audios.value,
          cameraId: v.DevicesInfo.videos.value
        });
        v.localStreamMin.init(function () {
          v.localStreamMin.play("localVidioBox")//本地视频流小模块
        });
      },
      getDevices(callback) {
        var v = this
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
          v.DevicesInfo = {videos: videos, audios: audios}
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
          rtc.remoteStreams.push(remoteStream);//监听推送的视频流
          // rtc.remoteStreams.id = remoteStream
          console.log('监控进入', rtc.remoteStreams);
          // setTimeout(()=>{
          //   remoteStream.play("remote_video_"+id);
          // },100)
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
          rtc.removeView(id);
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
        });
      },
      removeView(id) {
        console.log('************', id);
        console.log(this.remoteStreams);
        this.remoteStreams.forEach((it, index) => {
          if (id === it.getId()) {
            this.remoteStreams.splice(index, 1)
          }
        })
      },
      //屏幕共享
      //
      shareEvent() {//屏幕共享
        var v = this
        const shareUid = 99999
        this.shareClient = AgoraRTC.createClient(v.rtcConfig);//屏幕共享终端

        this.shareClient.init(v.appid, function () {//初始化客户端
          v.shareClient.join(v.key, v.roomName, v.shareParams.shareParams, function () {
            v.getDevices((obj) => {//获取设备ID(视频、音频)
              v.shareCreateStream()
            })
          }, function () {
            console.log(error);
          });
        }, function (err) {
          console.log("client init failed ", err);
        });
        console.log(v.DevicesInfo);

      },
      shareCreateStream() {
        var v = this
        v.shareStream = AgoraRTC.createStream({
          streamID: v.shareParams.shareParams,
          audio: true,
          video: true,
          screen: true,//屏幕共享
          microphoneId: v.DevicesInfo.audios.value,
          cameraId: v.DevicesInfo.videos.value
        });
        v.shareStream.init(function () {
          // v.shareStream.play("local_stream")//屏幕共享流本地展示
          v.shareClient.publish(v.shareStream, function (e) {
            console.log('将本地视频流发布出去**********************************');
          }, function (err) {
            console.log(err);
          });
        });

        //共享关闭时间监听
        v.shareStream.on('stopScreenSharing', function () {
          console.log("结束*************************************");
          v.shareClient.unpublish(v.shareStream, function (e) {
            console.log('终止本地视频流发布**********************************');
          });
          v.shareClient.leave(function () {
            console.log('退出success');
          }, function () {
            console.log('退出error');
          })

          v.shareStream.close()

        })
      },
      //=====================
      setAudio() {//启用/关闭 音频轨道
        if (this.muteAudio) {
          let nut = this.localStream.muteAudio()
          let nutMin = this.localStreamMin.muteAudio()
            if (nut || nutMin) {
            this.muteAudio = !this.muteAudio
          }
        } else {
          let nut = this.localStream.unmuteAudio()
          let nutMin = this.localStreamMin.unmuteAudio()
          if (nut || nutMin) {
            this.muteAudio = !this.muteAudio
          }
        }
      },
      setVideo() {//启用/关闭 视频轨道
        if (this.muteVideo) {
          let nut = this.localStreamMin.muteVideo()
          let nutMin = this.localStreamMin.muteVideo()
          if (nut || nutMin) {
            this.muteVideo = !this.muteVideo
          }
        } else {
          let nut = this.localStreamMin.unmuteVideo()
          let nutMin = this.localStreamMin.unmuteVideo()
          if (nut || nutMin) {
            this.muteVideo = !this.muteVideo
          }
        }
      },
      closePager() {//关闭页面
        var v = this

        this.$router.back()
      },

      showMaxVideo(it){
        var v = this
        if(it=='0000'){
          v.localStream.play("local_stream")
        }
      },
    },

    beforeDestroy() {
      var v = this

      v.client.leave(function () {
        console.log('退出success');
      }, function () {
        console.log('退出error');
      })

      v.client.unpublish(v.localStream, function (e) {
        console.log('终止本地视频流发布**********************************');
      });
      v.localStream.close()

      v.localStreamMin.close()
    }
  }
</script>

<style lang="less">
  @import "./less/mess";
  @import "./video/itemBox/index.less";
</style>
