<template>
    <div class="box_col">
      <div class="box_row rowBetween colItemCenter boxMar_B">
        <pager-tit></pager-tit>
      </div>
      <div class="box_col_auto">
        <Row style="padding: 20px 0">
          <Col style="text-align:center">
            <Input v-model="param.mmsi" placeholder='请输入 mmsi/视频id/设备号 查询' style="width: 400px"
                   @on-keyup.enter="getvideo()"></Input>
            <Button type="primary" @click="getvideo()">
              <Icon type="md-search"></Icon>
              <!--查询-->
            </Button>
          </Col>
        </Row>


        <div style="text-align: center;margin: 0 200px">
          <Row v-show="videoList.length>0">
            <Col span="8" v-for="(item,index) in videoList">
              <div style="text-align: center">
                <Card>
                  <h5>{{index+1}}号</h5>
                  <video
                    data-setup='{"fluid":true,"aspectRatio":"16:9"}'
                    :poster="videoimageList[index]"
                    :id="'my-video' + index "
                    class="video-js vjs-default-skin vjs-fluid"
                    controls preload="auto"
                    @click="playVideo('my-video' + index)"
                    style="object-fit: fill;height: 200px;width: 100%" >
                    <source :src="item" type="application/x-mpegURL">
                  </video>
                </Card>

              </div>
            </Col>
          </Row>
          <Row v-show="videoList.length<=0" >
            <Col span="8" v-for="(item,index) in 9" style="padding: 5px">
                <Card>
                  <h5>{{index+1}}号通道</h5>
                  <img src="./comp/jk.png" style="height: 200px;width: 100%" alt="">
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

    },
    methods: {
      playVideo(id){  //播放视频
        console.log(id);
        videojs(id, {

        }, function (val) {
          console.log(val, "--------")
          this.play();
        })
      },
      getvideo(){
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
