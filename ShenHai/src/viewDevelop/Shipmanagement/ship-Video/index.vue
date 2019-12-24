<template>
    <div class="box_col">
      <div class="box_row rowBetween colItemCenter boxMar_B">
        <pager-tit></pager-tit>
      </div>
      <div class="box_col_auto rowCenter">
          <Row style="padding: 20px 0;text-align:center">
            <Col style="margin: 0 300px">
              <Input v-model="param.mmsi" search @on-search="getvideo()"
                     enter-button="搜索" placeholder="请输入 mmsi/视频id/设备号 查询" />
            </Col>
          </Row>

        <div style="text-align: center;margin: 0 200px">
          <Row v-show="videoList.length>0">
            <Col span="8" v-for="(item,index) in videoList" :key="index" style="height: 250px;">
                <Card>
                  <h5>{{index+1}}号通道</h5>
                  <video
                    data-setup='{"fluid":true,"aspectRatio":"16:9"}'
                    :poster="videoimageList[index]"
                    :id="'my-video' + index "
                    class="video-js vjs-default-skin"
                    controls preload="auto"
                    @click="playVideo('my-video' + index)"
                    style="object-fit: fill;width: 100%">
                    <source :src="item" type="application/x-mpegURL">
                  </video>
                </Card>
            </Col>
          </Row>
          <Row v-show="videoList.length<=0" >
            <Col span="8" v-for="(item,index) in 9" :key="index" style="padding: 5px">
                <Card>
                  <h5>{{index+1}}号通道</h5>
                  <img src="./comp/jkk.png" style="height: 200px;width: 100%" alt="">
                </Card>
            </Col>
          </Row>
        </div>

      </div>
    </div>
</template>

<script>
  import videojs from 'video.js'
  import 'videojs-contrib-hls'
  export default {
    name: '',
    // mixins: [mixins],
    components: {},
    data() {
      return {
        videoimageList:[],
        videoList: [],
        param: {
          mmsi:''
        }
      }
    },
    created() {
      console.log(this.$route);
      if (this.$route.params.mmsi){
        this.param.mmsi = this.$route.params.mmsi
      }
    },
    methods: {
      playVideo(id){  //播放视频
        console.log(id);
        videojs(id, {
          height:250
        }, function (val) {
          console.log(val, "--------")
          this.play();
        })
      },
      getvideo(){
        // if (this.videoList.length>=0){
        //   for (let a = 0;a<9;a++){
        //     videojs('my-video'+a).dispose();
        //   }
        // }
        this.$http.post('/api/cl/getAllChnH5',{mmsi:this.param.mmsi}).then((res)=>{
          if (res.code == 200){
            if (!res.result || res.result.length<1){
              this.$Message.error('当前暂无视频')
            }
            this.videoList = res.result
            this.getvideoImg(res.message)
          }else {
            this.$Message.error(res.message)
          }
        })
      },
      getvideoImg(sbh){
        this.$http.post('/api/cl/photos',{sbh:sbh}).then((res)=>{
          if (res.code == 200){
            this.videoimageList = res.result
            console.log(this.videoimageList);
          }else {
            this.$Message.error(res.message)
          }
        })
        setTimeout(()=>{
          this.getvideoImg(sbh)
        },1000*60)
      },
    }
  }
</script>

<style lang="less">
  @import '../../../styles/common.less';

  .CloudVideo {
    background-color: #fff;
    .videoSty {
      border-bottom: solid 1px #dedede;
      position: relative;
      .videoBF {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100;
      }
      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 101;
      }
      .VideoTit {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 102;
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        padding: 3px 5px;
        width: 100%;

      }
    }
    .inputTit {
      margin-bottom: 5px;
    }
  }

  .videoInfo {
    text-align: center;
    padding: 16px;
    margin-bottom: 16px;
  }
</style>
