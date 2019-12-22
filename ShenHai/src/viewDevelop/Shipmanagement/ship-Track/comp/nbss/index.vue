<template>
  <div class="tabWrap">
    <div class="tabNav">
      <div class="funcButItem box_col rowCenter" style="height: 76px">
        <Icon type="md-search" color="#ffffff" size="32"/>
      </div>
      <div class="funcButItem box_col rowCenter" :class="tabIndex==index?'selItemSty':''"
           v-for="(item,index) in tabList" :key="index"
           @click="changeTab(index)">
        <div v-for="(lab,key) in item.label.split(',')">
          {{lab}}
        </div>
      </div>
    </div>
    <div class="tabContent box_col" v-if="showModal">
      <div class="searchFuncBoxSty box_col colItemCenter rowCenter">
        <div class="closeModalBoxSty box_col colItemCenter rowCenter"
             @click="unShow">
          <div>收</div>
          <div>起</div>
          <Icon type="ios-arrow-forward" size="22"/>
        </div>
        <div style="width: 360px">
          <Input v-model="from.con" size="large"
                 @on-search="getshipMess" search enter-button placeholder="请输入MMSI或船舶名称"/>
        </div>
      </div>

      <div class="shipListBoxSty box_col_auto" v-if="tabIndex === 0">
        <div class="tabBarBox box_row rowBetween boxMar_B">
          <div class="tabbarItem" :class="zxztindex==index?'selTabbarItem':''" v-for="(item,index) in zxztlist"
               :key="index"
               @click="changezxztindex(index,item.zt)">
            {{item.label}}
          </div>
        </div>
        <div class="shipSty" v-for="(item,index) in shipData"
             @click.native="getship(item)">
          <div class="shipname">
            {{item.shipname}} - {{item.cbsbh}}
          </div>
          <Row class="shipmess">
            <Col span="14">MMSI ：{{item.mmsi}}</Col>
            <Col span="10">类型 ：{{item.shiptypename}}</Col>
          </Row>
        </div>
      </div>
      <div class="shipxq box_col_auto" v-if="tabIndex === 1">
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
          <div>航速 : {{ship.hs}}</div>
          <div>航向 : {{ship.hx}}</div>
        </div>

        <div class="hcmess">
          <Row>
            <Col span="8">出发港</Col>
            <Col span="8">状态</Col>
            <Col span="8">目的港</Col>
          </Row>
          <Row>
            <Col span="8" style="font-size: 24px">芜湖县</Col>
            <Col span="8">>> 停泊 >></Col>
            <Col span="8" style="font-size: 24px">wuhan</Col>
          </Row>
          <Row>
            <Col span="8">出发时间</Col>
            <Col span="8"> &nbsp;</Col>
            <Col span="8">预计到达时间</Col>
          </Row>
          <Row class="did">
            <Col span="8">2019-12-32</Col>
            <Col span="8"> &nbsp;</Col>
            <Col span="8">2019-12-32</Col>
          </Row>
          <Row class="did">
            <Col span="8">2019-12-32</Col>
            <Col span="8"> &nbsp;</Col>
            <Col span="8">2019-12-32</Col>
          </Row>
        </div>
        <div class="funcBox box_row rowAuto colItemCenter">
          <div class="funcItemBox">
            <Icon type="ios-book-outline"/>
            <div class="labelSty">
              查看详细
            </div>
          </div>
          <div class="funcItemBox" @click.native="showPathHistory">
            <Icon type="md-git-pull-request"/>
            <div class="labelSty">
              查看历史轨迹
            </div>
          </div>
          <div class="funcItemBox" @click.native="showFance">
            <Icon type="md-qr-scanner"/>
            <div class="labelSty">
              电子围栏
            </div>
          </div>
        </div>
        <div class="funcBox box_row rowAuto colItemCenter">
          <div class="funcItemBox">
            <Icon type="md-videocam"/>
            <div class="labelSty">
              摄像头影像
            </div>
          </div>
          <div class="funcItemBox" @click.native="showPathHistory">
            <Icon type="md-bookmarks"/>
            <div class="labelSty">
              证书监管
            </div>
          </div>
          <div class="funcItemBox">
          </div>
        </div>
      </div>

      <div class="shipxq box_col_auto" v-if="tabIndex === 2">
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
      <div class="box_col_auto" v-if="tabIndex === 3">
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
      <div class="box_col_auto" v-if="tabIndex === 4">
        <Button @click="goVideoEvent('参数')" type="success">WATCH_VIDEO</Button>
        <div style="text-align: center">
          <video v-for="(item,index) in videoList"
                 data-setup='{"fluid":true,"aspectRatio":"16:9"}'
                 :poster="videoimageList[index]"
                 :id="'my-video' + index "
                 class="video-js vjs-default-skin"
                 controls preload="auto"
                 @click="playVideo('my-video' + index)"
                 style="object-fit: fill;height: 200px;width: 100%">
            <source :src="item" type="application/x-mpegURL">
          </video>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import carJK from "@/viewDevelop/map/carJK";
  import videojs from 'video.js'
  import 'videojs-contrib-hls'

  export default {
    name: "index",
    components: {carJK},
    watch: {
      tabIndex: function (newVal) {
        console.log(newVal);
        // this.showModal = true
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
        if (newVal != 4) {
          for (let a = 0; a < 9; a++) {
            videojs('my-video' + a).dispose();
          }
        }
      }
    },
    data() {
      return {
        showModal: false,
        tabIndex: null,
        zxztindex: 0,
        zxztlist: [
          {label: '全部', zt: ''},
          {label: '在线', zt: '00'},
          {label: '停泊', zt: '10'},
          {label: '离线', zt: '20'},
        ],
        tabList: [
          {label: '船舶,列表'},
          {label: '船舶,信息'},
          {label: '设备,运行,情况'},
          {label: '异常,情况'},
          {label: '视频,监控'},
        ],
        shipData: [],
        ship: {},
        videoList: [],
        videoimageList: [],
        from: {
          zxzt: '',
          con: '',
          pageSize:100,
          pageNum:1
        },

      }
    },
    created() {
      this.getshipMess()
    },
    beforeDestroy: function () {
      player.dispose();
    },
    methods: {
      goVideoEvent(pms){
        this.$router.push({
          name:'WATCH_VIDEO',
          query:{
            id:123123
          },
          params:{
            text:pms
          }
        })
      },
      playVideo(id) {  //播放视频
        console.log(id);
        videojs(id, {}, function (val) {
          console.log(val, "--------")
          this.play();
        })
      },
      getship(item) {
        console.log(item, '点击详情');
        this.ship = item
        this.tabIndex = 1
        this.getvideoImg(item.sbh)
        this.getvideo(item.mmsi)
        this.gethcMess(item.mmsi)
        this.$emit('reflh', item)
      },
      gethcMess(mmsi) {
        this.$http.get('/api/cl/getCurrentVoyage', {params: {mmsi: mmsi}}).then((res) => {
          if (res.code == 200) {

          }
        })
      },
      showPathHistory() {
        this.$router.push({name: 'historyTarck_new', params: {zdbh: this.car.zdbh}});
      },
      showFance() {
        this.$parent.showFance(this.car.clid)

      },
      //点击收起
      unShow() {
        this.showModal = false;
        this.tabIndex = null;
        this.zxztindex = 0;
      },
      // 更改tab页签
      changeTab(index) {
        console.log(this.ship.mmsi, index);
        // this.ship.mmsi = '413839203'
        if ((!this.ship.mmsi || this.ship.mmsi == '') && index != 0) {
          this.$Message.error('请先选择船舶')
          return
        }
        this.$nextTick(() => {
          this.tabIndex = index;
          this.showModal = true;
        })
      },
      // 更改状态页签
      changezxztindex(index, zt) {
        this.zxztindex = index
        this.from.zxzt = zt
        this.getshipMess()
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
      getvideo(mmsi) {
        this.$http.post('/api/cl/getAllChnH5', {mmsi: mmsi}).then((res) => {
          if (res.code == 200) {
            if (!res.result || res.result.length < 1) {
              this.$Message.error('当前暂无视频')
            }
            this.videoList = res.result
          } else {
            this.$Message.error(res.message)
          }
        })
      },
      getvideoImg(sbh) {
        this.$http.post('/api/cl/photos', {sbh: sbh}).then((res) => {
          if (res.code == 200) {
            this.videoimageList = res.result
            console.log(this.videoimageList);
          } else {
            this.$Message.error(res.message)
          }
        })
        setTimeout(() => {
          this.getvideoImg(sbh)
        }, 1000 * 60)
      },
      // 获取船舶
      getshipMess() {
        this.$http.post('/api/cl/pager',this.from).then((res) => {
          if (res.code == 200) {
            this.shipData = res.page.list
          }
        })
      }
    }

  }
</script>
<style scoped>

  .ivu-input-search >>> .ivu-input-search {
    background-color: #282828 !important;
  }
</style>
<style lang="less">
  @import "./index";
</style>
