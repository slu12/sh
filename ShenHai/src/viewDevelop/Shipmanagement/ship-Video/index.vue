<template>
    <div class="box_col">
      <div class="box_row rowBetween colItemCenter boxMar_B">
        <pager-tit></pager-tit>
        <div class="box_row rowRight">
          <div class="body-r-1 inputSty">
            <!--<DatePicker v-model="cjsjInRange" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请输时间" @on-keyup.enter="findMessList()" style="width: 220px"></DatePicker>-->
            <Input v-model="param.mmsi" placeholder='请输入mmsi查询' style="width: 200px"
                   @on-keyup.enter="getvideo()"></Input>
          </div>
          <div class="butevent" style="z-index: auto">
            <Button type="primary" @on-click="getvideo()">
              <Icon type="md-search"></Icon>
              <!--查询-->
            </Button>
          </div>
        </div>
      </div>
      <div class="box_col_auto">
      <Row v-show="videoList.length>0">
        <Col span="8" v-for="(item,index) in videoList">
          <div style="text-align: center">
            <Card>
              <h5>{{index+1}}号</h5>
              <video
                data-setup='{"fluid":true,"aspectRatio":"16:9"}'
                :poster="videoimageList[index]"
                :id="'my-video' + index "
                class="video-js vjs-default-skin"
                controls preload="auto"
                @click="playVideo('my-video' + index)"
                style="object-fit: fill;height: 200px;width: 100%" >
                <source :src="item" type="application/x-mpegURL">
              </video>
            </Card>

          </div>
          </Col>
      </Row>




        <div v-show="videoList.length<=0" class="body" style="border: 1px solid #dddee1;position: relative">
          <h1 style="color: #bdbdbd;position: absolute;top:40%;left: 50%;transform: translate(-50%,100%)">
            请先输入船舶mmsi查询
          </h1>
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
        this.$http.post('/api/cl/getAllChnH5',{mmsi:param.mmsi}).then((res)=>{
          if (res.code == 200){
            if (!res.result || res.result.length<1){
              this.$Message.error('当前暂无视频')
            }
            this.videoList = res.result
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
