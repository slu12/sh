<template>
  <div class="tabWrap">
    <div class="tabNav">
      <span class="iconClass">
      <Icon type="md-refresh-circle" size="32" @click.native="upTab"></Icon>
      </span>
      <div id="tabBar">
        <ul id="tabUl">
          <li :class="[{activeTab:index === tabIndex},'tabLi']" v-for="(item,index) in tabList" :key="index"
              @click="changeTab(index)">{{item.label}}
          </li>
        </ul>
      </div>
      <span class="iconClass">
      <Icon type="chevron-down" @click.native="downTab"></Icon>
      </span>
    </div>
    <div class="tabContent" v-if="showModal">
      <Row style="height: 46px">
        <Col style="padding: 5px;color: #5c6b77">
          <Input search enter-button placeholder="请输入船舶号或船舶名称" />
        </Col>
      </Row>
      <div v-if="tabIndex === 0">
        <Row style="height: 40px">
          <Row>
            <Col span="6" v-for="(item,index) in zxztlist">
              <div :class="[{activezxzt:index === zxztindex},'ztlistClass']"  :key="index"
                   @click="changezxztindex(index)">{{item.label}}
              </div>
            </Col>
          </Row>
        </Row>
         <div class="ship">
           <Row class="shipSty" v-for="(item,index) in shipData" @click.native="getship(item)">
             <Row class="shipname">
               {{item.shipname}} - {{item.cbsbh}}
             </Row>
             <Row class="shipmess">
               <Col span="14">MMSI ：{{item.mmsi}}</Col>
               <Col span="10">类型 ：{{item.shiptypename}}</Col>
             </Row>
           </Row>
         </div>

      </div>
      <div v-if="tabIndex === 1">
        <div class="shipxq">
           <div class="shipname">{{ship.shipname}} - {{ship.cbsbh}}</div>
           <div class="shipmess">
              <div>MMSI : {{ship.mmsi}}</div>
              <div>呼号 : {{ship.callsign}}</div>
              <div>IMO : {{ship.imo}}</div>
              <div>类型 : {{ship.shiptypename}}</div>
              <div>北斗设备编号 : {{ship.zdbh}}</div>
              <div>所属机构 : {{ship.jgmc}}</div>
              <div>定位时间 : {{ship.dwsj}}</div>
              <div>定位坐标 : {{ship.dwzb}}</div>
              <div>航速 : {{ship.jgmc}}</div>
              <div>航向 : {{ship.hx}}</div>
              <div>设备编号 : {{ship.hs}}</div>
           </div>
        </div>
      </div>
      <div v-if="tabIndex === 2">
        <div class="shipxq">
          <div class="shipname">设备编号 : {{ship.cbsbh}}</div>
          <div class="shipmess">
            <div>运行状态 : {{ship.zxzt}}</div>
            <div>安装船舶 : {{ship.cbsbh}}</div>
            <div>北斗设备编号 : {{ship.zdbh}}</div>
            <div>所属机构 : {{ship.jgmc}}</div>
            <div>定位时间 : {{ship.dwsj}}</div>
            <div>定位坐标 : {{ship.dwzb}}</div>
            <div>航速 : {{ship.hs}}</div>
            <div>航向 : {{ship.hx}}</div>
            <div>设备编号 : {{ship.zdbh}}</div>
          </div>
        </div>
      </div>
      <div v-if="tabIndex === 3">
        <Row class="shipycxq">
          <Row class="shipname">
            船舶名称
          </Row>
          <Row class="shipmess">
            <Col class="leftyc" span="14" align="left">异常名称</Col>
            <Col class="rightyc" span="10" align="right">异常时间</Col>
          </Row>
        </Row>

      </div>
      <div v-if="tabIndex === 4">
          <div style="text-align: center;overflow: scroll;height: 800px">
            <video v-for="(item,index) in videoList"
                   :poster="videoimageList[index]"
                   :id="'my-video' + index "
                   class="video-js vjs-default-skin"
                   controls preload="auto"
                   @click="playVideo('my-video' + index)"
                   style="margin: 20px auto" >
              <source :src="item" type="application/x-mpegURL">
            </video>
          </div>
      </div>
    </div>
    <div class="sq" @click="unShow" v-if="showModal">
      <Icon size="32" type="ios-arrow-forward" />
    </div>

  </div>
</template>

<script>
  import carJK from "../../map/carJK";
  import videojs from 'video.js'
  import 'videojs-contrib-hls'
  export default {
    name: "index",
    components:{carJK},
    watch: {
      tabIndex: function (newVal) {
        console.log(newVal);
        this.showModal = true
        let scrollNav = document.getElementById('tabUl')
        let tabBar = document.getElementById('tabBar')
        let transformHeight = scrollNav.scrollHeight - tabBar.clientHeight
        if (Number(newVal) >= 3) {
          this.$nextTick(function () {
            scrollNav.style.transform = `translateY(-${transformHeight}px)`
          })
        } else {
          this.$nextTick(function () {
            scrollNav.style.transform = 'translateY(0px)'
          })
        }
        if (newVal != 4){
          for (let a = 0;a<9;a++){
            videojs('my-video'+a).dispose();
          }
        }
      }
    },
    data() {
      return {
        showModal:false,
        tabIndex: '',
        zxztindex:0,
        zxztlist:[
          {label: '全部',zt:''},
          {label: '在线',zt:''},
          {label: '停泊',zt:''},
          {label: '离线',zt:''},
        ],
        tabList: [
          {label: '船舶列表'},
          {label: '船舶信息'},
          {label: '设备运行情况'},
          {label: '异常情况'},
          {label: '视频监控'},
        ],
        shipData:[],
        ship:{},
        videoList:[],
        videoimageList:[]

      }
    },
    created(){
      this.getshipMess()
    },
    beforeDestroy: function () {

      player.dispose();

    },
    methods: {
      playVideo(id){  //播放视频
        console.log(id);
        videojs(id, {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true,
          width: 220,
          height:180,
        }, function (val) {
          console.log(val, "--------")
          this.play();
        })
      },
      getship(item){
        console.log(item,'点击详情');
        this.ship = item
        this.tabIndex = 1
        this.getvideoImg(item.sbh)
        this.getvideo(item.mmsi)

      },
      //点击收起
      unShow(){
        this.showModal = false
      },
      // 更改状态页签
      changezxztindex(index) {
        this.zxztindex = index
      },
// 更改tab页签
      changeTab(index) {
        this.tabIndex = index
        this.$store.state.proofActiveName = this.tabIndex
      },
// 调整Tab滚动
      upTab() {
        let scrollNav = document.getElementById('tabUl')
        this.$nextTick(function () {
          scrollNav.style.transform = 'translateY(0px)'
        })
      },
      downTab() {
        let scrollNav = document.getElementById('tabUl')
        let tabBar = document.getElementById('tabBar')
        let transformHeight = scrollNav.scrollHeight - tabBar.clientHeight
        this.$nextTick(function () {
          scrollNav.style.transform = `translateY(-${transformHeight}px)`
        })
      },
      getvideo(mmsi){
        this.$http.post('/api/cl/getAllChnH5',{mmsi:mmsi}).then((res)=>{
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
      },
      // 获取船舶
      getshipMess(){
        this.$http.get('/api/cl/query',{params:{}}).then((res)=>{
           if (res.code == 200){
             this.shipData = res.result
           }
        })
      }
    }

  }
</script>
<style scoped>

  .ivu-input-search >>> .ivu-input-search{
      background-color: #282828 !important;
    }
</style>
<style lang="less">
  .tabWrap {
    width: 100%;
    height: 100%;

    .tabNav {
      width: 40px;
      height: 100%;
      float: right;
      background-color: #5E687D;

      #tabBar {
        height: e("calc(100% - 60px)");
        overflow: hidden;
        z-index: -1;

        #tabUl {
          width: 36px;
          border-right: 1px solid #dddee1;
          transition: -webkit-transform .5s ease-in-out;
          transition: transform .5s ease-in-out;

          .tabLi {
            width: 100%;
            font-size: 14px;
            /*writing-mode: vertical-lr;*/
            padding: 14px 0 14px 0;
            cursor: pointer;
            border: 1px solid #dddee1;
            border-right: 0;
            margin-bottom: 5px;
            text-align: center;
            vertical-align: middle;
            background:#5E687D;
            color: #fdfdfd;
          }

          .tabLi:hover {
            color: #fdfdfd;
          }

          .activeTab {
            color: #FFFFFF;
            background: #363E4F;
            width: 36px;
            z-index: 100;
          }
        }
      }

      .iconClass {
        display: inline-block;
        height: 40px;
        color: #FFFFFF;
        margin-left: 3px;
        margin-top: 6px;
        cursor: pointer;
        text-align: center;
        vertical-align: middle;
        line-height: 30px;
        width: e("calc(100% - 10px)");
      }
    }

    .tabContent {
      float: right;
      background: #363E4F;
      width: e("calc(100% - 75% - 41px)");
      height: 100%;
      .ship{
        height: 700px;
        width: 100%;
        overflow: auto;
        .shipSty{
          background-color: #FFFFFF;
          margin-left: 5px;
          margin-right: 5px;
          margin-top: 5px;
          .shipname{
            padding-left: 15px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:36px;
          }
          .shipmess{
            padding-left: 15px;
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:24px;
          }
        }
      }
      .shipycxq{
        padding: 0 10px;
        .shipname{
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height:36px;
        }
        .shipmess{
          background-color: #FFFFFF;
          line-height: 36px;
          padding: 0 10px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          .leftyc{
            color:rgba(0,0,0,1);
          }
          .rightyc{
            color:rgba(102,102,102,1);
          }
        }
      }
      .shipxq{
        padding: 0 10px;
        .shipname{
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height:36px;
        }
        .shipmess{
          background-color: #FFFFFF;
          line-height: 24px;
          padding-left: 10px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
      }

      .ztlistClass{
        width: 100%;
        font-size: 14px;
        cursor: pointer;
        border: 1px solid #dddee1;
        border-right: 0;
        margin-bottom: 5px;
        text-align: center;
        vertical-align: middle;
        background:#5E687D;
        color: #fdfdfd;
      }
      .activezxzt {
        color: #FFFFFF;
        background: #363E4F;
        width: 100%;
        z-index: 100;
      }
    }
    .sq{
      width: 40px;
      height: 80px;
      float: right;
      background-color: #5E687D;
      color: #FFFFFF;
      text-align: center;
      vertical-align: middle;
      writing-mode: vertical-lr;
      font-size: 16px;
    }
  }
</style>
