<template>
  <div class="tabWrap">
    <div class="tabNav">
      <div class="funcButItem box_col rowCenter" style="height: 76px">
        <Icon type="md-search" color="#ffffff" size="32"/>
      </div>
      <div class="funcButItem box_col rowCenter" :class="selFuncItem==index?'selItemSty':''"
           v-for="(item,index) in tabList" :key="index"
           @click="changeTab(index)">
        <div v-for="(lab,key) in item.label.split(',')">
          {{lab}}
        </div>
      </div>


      <!--<span class="iconClass">-->
      <!--<Icon type="ios-arrow-forward" size="32" @click.native="unShow"></Icon>-->
      <!--</span>-->
      <!--<div id="tabBar">-->
      <!--<ul id="tabUl">-->
      <!--<li :class="[{activeTab:index === tabIndex},'tabLi']" v-for="(item,index) in tabList" :key="index"-->
      <!--@click="changeTab(index)">{{item.label}}-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<span class="iconClass">-->
      <!--<Icon type="chevron-down" @click.native="downTab" size="32"></Icon>-->
      <!--</span>-->
    </div>
    <div class="tabContent" v-if="true">
      <div class="searchFuncBoxSty box_col colItemCenter rowCenter">
        <div class="closeModalBoxSty box_col colItemCenter rowCenter"
             @click="unShow">
          <div>
            收
          </div>
          <div>
            起
          </div>
          <Icon type="ios-arrow-forward" size="22"/>
        </div>
        <div style="width: 360px">
          <Input v-model="from.con" size="large"
                 @on-search="getshipMess" search enter-button placeholder="请输入MMSI或船舶名称"/>
        </div>
      </div>
      <div v-if="tabIndex === 0">
        <Row style="height: 40px">
          <Row>
            <Col span="6" v-for="(item,index) in zxztlist">
              <div :class="[{activezxzt:index === zxztindex},'ztlistClass']" :key="index"
                   @click="changezxztindex(index,item.zt)">{{item.label}}
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
          <div style="padding-top: 20px">
            <Row>
              <Col span="12" style="text-align: center" @click.native="showFance">
                <Icon type="md-qr-scanner" size="32" color="#FFFFFF"/>
                <br>
                <span style="color: #FFFFFF;font-size: 14px">电子围栏</span>
              </Col>
              <Col span="12" style="text-align: center" @click.native="showPathHistory">
                <Icon type="md-git-pull-request" size="32" color="#FFFFFF"/>
                <br>
                <span style="color: #FFFFFF;font-size: 14px">历史轨迹</span>
              </Col>
            </Row>
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
    <!--    <div class="sq" @click="unShow" v-if="showModal">-->
    <!--      <Icon size="32" type="ios-arrow-forward" />-->
    <!--    </div>-->

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
        tabIndex: '',
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
        selFuncItem: null,//选中的功能模块索引
        shipData: [],
        ship: {},
        videoList: [],
        videoimageList: [],
        from: {
          zxzt: '',
          con: ''
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
        this.showModal = false
      },
      // 更改状态页签
      changezxztindex(index, zt) {
        this.zxztindex = index
        this.from.zxzt = zt
        this.getshipMess()
      },
// 更改tab页签
      changeTab(index) {
        this.selFuncItem = index
        console.log(this.ship.mmsi, index);
        if ((!this.ship.mmsi || this.ship.mmsi == '') && index != 0) {
          this.$Message.error('请先选择船舶')
          return
        }
        this.$nextTick(() => {
          this.tabIndex = index
          this.$store.state.proofActiveName = this.tabIndex
        })
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
        this.$http.get('/api/cl/query', {params: {zxzt: this.from.zxzt, con: this.from.con}}).then((res) => {
          if (res.code == 200) {
            this.shipData = res.result
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
