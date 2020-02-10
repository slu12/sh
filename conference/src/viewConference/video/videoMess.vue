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
          {{ startTime }}
          <!--{{Math.floor(conTime/(60*60))}}:{{Math.floor(conTime/(60*60))}}-->
        </div>
        <div>
          <Button v-if="!orderAudioStop" type="primary" class="boxMar_L" @click="setOrderAudio(true)">会议静音</Button>

          <Button v-else type="primary" class="boxMar_L" @click="setOrderAudio(false)">开启声音</Button>

        </div>
        <Button type="error" class="boxMar_L" :disabled="returnRoom" @click="closePager">退出房间</Button>
      </div>
    </div>
    <div class="box_row" style="height: 100%;overflow: auto">
      <div class="pagerLeftBox boxPadd_LR">
        <div class="box_col">
          <Card class="cardaItemBox boxMar_T">
            <div slot="title" class="box_row rowBetween colCenter">
              <div class="box_row colCenter">
                <Avatar>{{roomMEss.zcr.name}}</Avatar>
                <div class="namebox">
                  {{roomMEss.zcr.name}}
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
            <video-item-box v-if="remoteStreams.length>0"
                            v-for="(it,index) in remoteStreams"
                            :key="index" :item="it"></video-item-box>
          </div>

          <div class="boxMar_B">
            <Button v-if="startCon == 0" :loading="optFlag" type="success" long @click="startConEvent">会议开始</Button>
            <Button v-else-if="startCon == 1" :loading="optFlag" type="warning" long @click="endConEvent(false)">会议结束</Button>
            <Button v-else-if="startCon == -1" long>会议已结束</Button>

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
              <Button type="default" @click="getShareRoomToken">屏幕共享</Button>
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
  import moment from 'moment'

  export default {
    name: "videoMess",
    components: {videoItemBox},
    computed: {
      returnRoom() {
        if (this.roomMEss.sid != "" && this.roomMEss.stopTime == "") {
          return true
        } else if (this.roomMEss.sid != "" && this.roomMEss.stopTime != "") {
          return false
        } else {
          return false
        }
      }
    },
    data() {
      return {
        optFlag: false,
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
        appid: '8d1a79107f9c4decac672c4201a14693',//不变得的
        //token === (key)
        key:'',
          // '0068d1a79107f9c4decac672c4201a14693IACqmYeBZm5VzjAJZvG5QPF0FpPgjGKUhIP7UMm+To1Y3Mieo/oAAAAAEAB5HOB85m05XgEAAQDjbTle',
        roomName: '',//libinbin99
        params: {
          uid: 99999,
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
        shareToken:"",
        shareParams: {
          uid: 9999
        },
        //  =============
        roomMEss: {},
        orderAudioStop: false,//关闭其他音频流通道
        startTime: '00:00:00',//会议时长
        startCon: 0,//开始会议 0 开始会议 1 结束会议 -1会议已结束
      }
    },
    created() {
      if (this.$route.params._id) {
        this.roomMEss = this.$route.params
        this.roomName = this.$route.query.room
      } else {
        this.$router.back()
      }

      if(this.$route.params.zt!='10'){
        localStorage.removeItem("VDPS");
      }else {
        this.getVerifyVideo()
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getRoomToken(()=>{
          this.createClient();
          this.handleEvents();
        })
      })
    },
    methods: {
      getVerifyVideo(){//验证正在录制的视频是否有效
        let a = JSON.parse(localStorage.getItem('VDPS'))
        this.$http.get('/serverless/api/checkRecording/'+a.resourceId+'/'+a.sid).then(res=>{
          this.startCon=1
        }).error(err=>{
          this.startCon=0
        })
      },
      getRoomToken(callBack) {//获取房间token
        this.$http.get('/serverless/api/getVideoToken/'+this.params.uid+'/'+this.$route.query.room).then(res=>{
          this.key = res.message
          callBack && callBack()
        }).catch(err=>{})
      },
      createClient() {//创建客户端。
        var v = this
        this.client = AgoraRTC.createClient(v.rtcConfig);
        //-----
        this.client.init(v.appid, function () {//初始化客户端
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
        //该回调通知 App 有远端用户离线。
        rtc.client.on("peer-leave", function (evt) {
            var id = evt.uid;
            if (id == rtc.params.uid) {
                rtc.removeView(id);
            }
            // Toast.notice("peer leave")
            console.log('peer-leave', id);
        })
        // 该回调提示有远端用户/主播加入频道。
        rtc.client.on("peer-online", function (evt) {
          var id = evt.uid;
          console.log('加入视频的人', id);
        })
        // 该回调通知 App 远端音视频流已添加
        rtc.client.on("stream-added", function (evt) {
            var remoteStream = evt.stream;
            var id = remoteStream.getId();
            if (id !== rtc.params.uid) {
                rtc.client.subscribe(remoteStream, function (err) {

                })
            }
        });
        // 该回调通知 App 已接收远端音视频流。
        rtc.client.on("stream-subscribed", function (evt) {
            var remoteStream = evt.stream;
            var id = remoteStream.getId();
            rtc.remoteStreams.push(remoteStream);//监听推送的视频流
            setTimeout(()=>{
              remoteStream.play("remote_video_"+id);
            },100)
        })
        // 该回调通知 App 已删除远端音视频流，即对方调用了 Client.unpublish。
        rtc.client.on("stream-removed", function (evt) {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          // Toast.info("stream-removed uid: " + id)
          remoteStream.stop("remote_video_" + id);
          rtc.remoteStreams = rtc.remoteStreams.filter(function (stream) {
            return stream.getId() !== id
          })
          rtc.removeView(id);
        })
      },
      removeView(id) {
        this.remoteStreams.forEach((it, index) => {
          if (id === it.getId()) {
            this.remoteStreams.splice(index, 1)
          }
        })
      },
      //屏幕共享
      getShareRoomToken() {//获取房间token
        this.$http.get('/serverless/api/getVideoToken/'+this.shareParams.uid+'/'+this.$route.query.room).then(res=>{
          this.shareToken = res.message
          this.shareEvent()
        }).catch(err=>{})
      },
      shareEvent() {//屏幕共享
        var v = this
        this.shareClient = AgoraRTC.createClient(v.rtcConfig);//屏幕共享终端

        this.shareClient.init(v.appid, function () {//初始化客户端
          v.shareClient.join(v.shareToken, v.roomName, v.shareParams.uid, function () {
            v.getDevices((obj) => {//获取设备ID(视频、音频)
              v.shareCreateStream()
            })
          }, function () {
          });
        }, function (err) {
          console.log("client init failed ", err);
        });
      },
      shareCreateStream() {//屏幕共享
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
          //禁用音视频
          this.client.unpublish(stream, function(err) {
          })
        } else {
          let nut = this.localStreamMin.unmuteVideo()
          let nutMin = this.localStreamMin.unmuteVideo()
          if (nut || nutMin) {
            this.muteVideo = !this.muteVideo
          }
          //启用音视频
          this.client.publish(stream, function(err) {
          })
        }
      },
      closePager() {//关闭页面
        var v = this
        if (this.startCon == 1){
            this.swal.fire({
                type: 'warning', // 弹框类型
                title: '退出房间', //标题
                text: "会议正在进行中，请先结束后再退出！", //显示内容
                confirmButtonColor: '#3085d6',// 确定按钮的 颜色
                confirmButtonText: '保存',// 确定按钮的 文字
                showCancelButton: true, // 是否显示取消按钮
                cancelButtonColor: '#d33', // 取消按钮的 颜色
                cancelButtonText: "取消", // 取消按钮的 文字

                focusCancel: true, // 是否聚焦 取消按钮
                reverseButtons: true  // 是否 反转 两个按钮的位置 默认是  左边 确定  右边 取消
            }).then((isConfirm) => {
                try {
                    //判断 是否 点击的 确定按钮
                    if (isConfirm.value) {
                        this.endConEvent(true);
                    }
                } catch (e) {

                }
            });
        }else{
            this.$router.back();
        }
      },
      showMaxVideo(it) {//小屏幕切换
        var v = this
        if (it == '0000') {
          v.localStream.play("local_stream")
        }
      },
      setOrderAudio(val) {//设置接收流声音
        this.orderAudioStop = val
      },
      startConEvent() {//会议开始
        this.optFlag = true;
        this.$http.post('/serverless/api/startVideo', {
          room_name: this.roomName,
          _id: this.$route.query.id
        }).then(res => {
          this.optFlag = false;
          this.roomMEss.sid = res.sid
          let a = JSON.stringify(res)
          localStorage.setItem('VDPS', a)
          this.startCon = 1
          this.roomMEss.startTime = null;
          this.ST()
        }).catch(err => {
            this.optFlag = false;
            this.swal({
                title: err.message,
                type: 'error'
            })
        })
      },
      ST() {//会议计时
        if (this.startCon == 1) {
          if (this.roomMEss.startTime){
              var x = moment() - moment(this.roomMEss.startTime, 'YYYY-MM-DD HH:mm:ss')
              var d = moment.duration(x, 'milliseconds');
              var hours = Math.floor(d.asHours());
              var mins = Math.floor(d.asMinutes()) - hours * 60;
              var sec = Math.floor(d.asSeconds()) - (hours * 60 + mins * 60);

              this.startTime = (hours < 10 ? '0' + hours : hours) + ':' + (mins < 10 ? '0' + mins : mins) + ':' + (sec < 10 ? '0' + sec : sec);
          }else{
              this.startTime = '00:00:00';
          }

          setTimeout(() => {
            this.ST()
          }, 1000)
        }
      },
      endConEvent(quitFlag) {//会议结束
        this.optFlag = true;
        var v = this
        let vdps = localStorage.getItem('VDPS')
        vdps = JSON.parse(vdps)
        vdps.room_name = this.roomName;
        vdps._id = this.$route.query.id;
        this.$http.post('/serverless/api/stopVideo', vdps).then(res => {
          this.optFlag = true;
          this.startCon = -1
          if (quitFlag){
              this.$router.back();
          }
        }).catch(err => {
          this.optFlag = false;
          v.swal({
            title: err.message,
            type: 'error'
          })
        })

      }
    },

    beforeDestroy() {
      var v = this
      this.startCon = -1
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
