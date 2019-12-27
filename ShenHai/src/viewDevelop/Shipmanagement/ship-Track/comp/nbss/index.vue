<template>
  <div class="tabWrap">
    <div class="tabNav">
      <div class="funcButItem box_col rowCenter" style="height: 76px">
        <Icon type="md-search" color="#ffffff" size="32" @click="upShow"/>
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
<!--          <Select-->
<!--            v-model="from.con"-->
<!--            filterable-->
<!--            clearable-->
<!--            remote-->
<!--            loading-text="请输入关键字搜索"-->
<!--            @on-query-change="remoteMethod1"-->
<!--            ref="jlySelect"-->
<!--            :remote-method="remoteMethod1"-->
<!--            :loading="loading1">-->
<!--            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>-->
<!--          </Select>-->
          <Input v-model="from.con" size="large"
                 @on-search="getshipMess" @on-change="getshipMess" search enter-button
                 @on-focus="showtj = true"
                 placeholder="请输入MMSI或船舶名称">
            <Icon type="ios-search" slot="suffix" />
          </Input>
<!--          <div v-if="showtj" class="shipSty" style="position: absolute;top: 66px">-->
<!--            <div style="background-color: #FFFFFF;text-align: left;font-size: 18px;z-index: 9999;-->
<!--            font-weight: 500;width: 359px;padding: 10px;border: #5c6b77" v-for="(item,index) in tjList" :key="index">-->
<!--               {{item.json.portname.value}}.{{item.json.zxzt.value}}.{{item.json.shiptype.value}}-->
<!--            </div>-->
<!--          </div>-->
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
             @click="getship(item)">
          <div class="shipname">
            {{item.shipname}} - {{item.cbsbh}}
          </div>
          <Row class="shipmess">
            <Col span="14">MMSI ：{{item.mmsi}}</Col>
            <Col span="10">类型 ：{{item.shiptypename}}</Col>
          </Row>
        </div>
        <div class="shipSty" @click="jzMore">
           <div style="text-align: center;height: 20px">
               点击加载更多
           </div>
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

        <div class="hcmess" v-if="this.hcMess.departportname && this.hcMess!=null && this.hcMess.departportname !=''">
          <Row>
            <Col span="8">出发港</Col>
            <Col span="8">状态</Col>
            <Col span="8">目的港</Col>
          </Row>
          <Row>
            <Col span="8" style="font-size: 24px">{{hcMess.departportname}}</Col>
            <Col span="8">>> {{hcMess.anchorportname}} >></Col>
            <Col span="8" style="font-size: 24px">{{hcMess.arrivingportname}}</Col>
          </Row>
          <Row>
            <Col span="8">出发时间</Col>
            <Col span="8"> &nbsp;</Col>
            <Col span="8">预计到达时间</Col>
          </Row>
          <Row class="did">
            <Col span="8">{{hcMess.departtime}}</Col>
            <Col span="8"> &nbsp;</Col>
            <Col span="8">{{hcMess.eta}}</Col>
          </Row>
          <Row class="did">
            <Col span="8">{{hcMess.departtime}}</Col>
            <Col span="8"> &nbsp;</Col>
            <Col span="8">{{hcMess.eta}}</Col>
          </Row>
        </div>
        <div class="hcmess" v-else>
          <Row>
            <Col span="8"></Col>
            <Col span="8">暂无航程信息</Col>
            <Col span="8"></Col>
          </Row>
        </div>
        <div class="funcBox box_row rowAuto colItemCenter">

          <div class="funcItemBox" @click="showPathHistory(ship.mmsi)">
            <Icon type="md-git-pull-request"/>
            <div class="labelSty">
              查看历史轨迹
            </div>
          </div>
          <div class="funcItemBox" @click="showFance(ship.clId)">
            <Icon type="md-qr-scanner"/>
            <div class="labelSty">
              电子围栏
            </div>
          </div>
          <div class="funcItemBox" @click="showSP(ship.mmsi)">
            <Icon type="md-videocam"/>
            <div class="labelSty">
              摄像头影像
            </div>
          </div>
        </div>
        <div class="funcBox box_row rowAuto colItemCenter">

<!--          <div class="funcItemBox">-->
<!--            <Icon type="ios-book-outline"/>-->
<!--            <div class="labelSty">-->
<!--              查看详细-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="funcItemBox" @click.native="showPathHistory">-->
<!--            <Icon type="md-bookmarks"/>-->
<!--            <div class="labelSty">-->
<!--              证书监管-->
<!--            </div>-->
<!--          </div>-->
          <div class="funcItemBox">
          </div>
        </div>
      </div>

      <div class="shipxq box_col_auto" v-if="tabIndex === 2">
        <div v-if="ship.zdbh!=''&&ship.sbh!=''" class="shipname">设备编号 : {{ship.zdbh}}</div>
        <div v-else class="shipname">设备编号 : {{ship.mmsi}}</div>
        <div class="shipmess">
          <div v-if="ship.zdbh!=''&&ship.sbh!=''">运行状态 : {{ship.zxzt}}</div>
          <div v-else >运行状态 : 正常</div>
          <div>安装船舶 : {{ship.cbsbh}}</div>
          <div>北斗设备编号 : {{ship.zdbh}}</div>
          <div>所属机构 : {{ship.jgmc}}</div>
          <div>定位时间 : {{ship.dwsj}}</div>
          <div>定位坐标 : {{ship.dwzb}}</div>
          <div>航速 : {{ship.hs}}</div>
          <div>航向 : {{ship.hx}}</div>
          <div>设备编号 : {{ship.sbh}}</div>
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
<!--        <Button @click="goVideoEvent('参数')" type="success">WATCH_VIDEO</Button>-->
        <div style="text-align: center" v-for="(item,index) in file" v-if="item.imgUrl!=null">
          <h3 style="color: #FFFFFF">{{index+1}}号通道</h3>
          <img v-show="!item.showModal" :src="item.imgUrl"  style="width: 100%;height: 33%" alt="点击播放" @click="item.showModal = !item.showModal">
          <video v-show="item.showModal"
                 :poster="item.videoUrl"
                 :id="'my-video' + index "
                 class="video-js vjs-default-skin"
                 controls preload="auto"
                 @click="playVideo('my-video' + index)"
                 style="object-fit: fill;width: 100%">
            <source :src="item" type="application/x-mpegURL">
          </video>
        </div>
        <div v-if="videoList[0] == null" style="font-size: 32px;text-align: center;font-weight: 500">暂无视频信息</div>
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
        showtj :false,
        loading1: false,
        options1: [],
        showModal: false,
        tabIndex: null,
        zxztindex: 0,
        zxztlist: [
          {label: '全部', zt: ''},
          {label: '在航', zt: '0'},
          {label: '锚泊', zt: '1'},
          {label: '离线', zt: '2'},
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
        file:[{
          imgUrl:'',
          videoUrl:'',
          showVideo:false
        },{
          imgUrl:'',
          videoUrl:'',
          showVideo:false
        },{
          imgUrl:'',
          videoUrl:'',
          showVideo:false
        }],

        from: {
          nav: '',
          con: '',
          pageSize:200,
          pageNum:1
        },
        hcMess:{},
        showvideo:[false,false,false],
        tjList:[]
      }
    },
    created() {
      this.getshipMess()
      this.getTj()
    },
    beforeDestroy: function () {
      player.dispose();
    },
    methods: {
      getTj(){
        this.$http.get('/api/cbcd/pager').then((res)=>{
          if (res.code = 200){
            this.tjList = res.page.list
            res.page.list.forEach((it,index)=>{
              it.json = JSON.parse(it.json)
              if(index == res.page.list.length - 1){
                this.tjList = res.page.list
                console.log(this.tjjList);
              }
            })
          }else {
            this.$Message.error(res.message)
          }
        })
      },
      remoteMethod1 (query) {
        if (query !== '') {
          this.loading1 = true;
          setTimeout(() => {
            this.loading1 = false;
            this.options1 = this.shipData.filter(item => {
              return item.mmsi.indexOf(query.toUpperCase()) != -1
            })
          }, 200);
        } else {
          this.options1 = [];
        }
      },
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
      showVideoEvent(index){
        console.log(index,'1');
        this.$nextTick(()=>{
          this.showvideo[index] = true
        })
      },
      playVideo(id) {  //播放视频
        console.log(id);
        videojs(id, {
          fluid:true,
          aspectRatio:"16:9",
          autoplay:true
        }, function (val) {
          console.log(val, "--------")
          this.play();
        })
      },
      jzMore(){
        this.from.pageNum += 1
        this.$http.post('/api/cl/pager',this.from).then((res) => {
          if (res.code == 200) {
            let a = res.page.list
            if(a.length<=0){
              this.$Message.error('没有更多数据了!')
              return
            }
            for (let i = 0;i<a.length;i++){
              if (a[i].dwzb!=''){
                a[i].bdjd = parseFloat( a[i].dwzb.split(',')[0])
                a[i].bdwd = parseFloat(a[i].dwzb.split(',')[1])
              }else {
                a[i].bdjd = ''
                a[i].bdwd = ''
              }
            }
            this.shipData.push(...a)
            this.$nextTick(()=>{
              this.tabIndex = 0
            });
            this.$parent.initGps(this.shipData)
          }
        })
      },
      getship(item) {
        console.log(item, '点击详情');
        this.ship = item
        if ( this.ship.zxzt == '00'){
          this.ship.zxzt = '在线'
        }else if (this.ship.zxzt == '10'){
          this.ship.zxzt = '停泊'
        }else {
          this.ship.zxzt = '离线'
        }
        this.tabIndex = 1

        this.gethcMess(item.mmsi)
        this.$emit('reflh', item)
      },
      gethcMess(mmsi) {
        this.$http.get('/api/cl/getCurrentVoyage', {params: {mmsi: mmsi}}).then((res) => {
          if (res.code == 200 && res.result) {
              this.hcMess = res.result
          }
        })
      },
      showPathHistory(mmsi) {
        this.$router.push({name: 'ship-trajectory',params:{mmsi:mmsi}});
      },
      showFance(id) {
        this.$parent.showFance(id)
      },
      showSP(mmsi){
        this.$router.push({name: 'ship-Video', params: {mmsi:mmsi}});
      },
      //点击收起
      unShow() {
        this.showModal = false;
        this.tabIndex = null;
        this.zxztindex = 0;
      },
      //点击收起
      upShow() {
        this.showModal = true;
        this.tabIndex = 0;
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
        if(index == 4){
          this.getvideoImg(this.ship.sbh,this.ship.mmsi)
          setTimeout(()=>{
            this.getvideo(this.ship.mmsi)
          },1000)
        }
        this.$nextTick(() => {
          this.tabIndex = index;
          this.showModal = true;
        })
      },
      // 更改状态页签
      changezxztindex(index, zt) {
        this.zxztindex = index
        this.from.nav = zt
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
            for (let i =0;i<3;i++){
              this.file[i].videoUrl = this.videoList[i]
              this.file[i].imgUrl = this.videoimageList[i]
              this.file[i].showVideo =false
            }
            console.log(this.videoList,'this.videoList');
          } else {
            this.$Message.error(res.message)
          }
        })
      },
      getvideoImg(sbh,item) {
        this.$http.post('/api/cl/photos', {sbh: sbh}).then((res) => {
          if (res.code == 200) {
            this.videoimageList = res.result
          } else {
          }
        })
        setTimeout(() => {
          this.getvideoImg(sbh)
        }, 1000 * 60)
      },
      fqLr(item){
        this.ship = item
        this.tabIndex = 1
        this.showModal = true
      },
      // 获取船舶
      getshipMess() {
        this.tabIndex = 0
        this.from.pageNum = 1
        this.$http.post('/api/cl/pager',this.from).then((res) => {
          if (res.code == 200) {
            this.shipData = res.page.list
            for (let i = 0;i<this.shipData.length;i++){
              if (this.shipData[i].dwzb!=''){
                this.shipData[i].bdjd = parseFloat( this.shipData[i].dwzb.split(',')[0])
                this.shipData[i].bdwd = parseFloat(this.shipData[i].dwzb.split(',')[1])
              }else {
                this.shipData[i].bdjd = ''
                this.shipData[i].bdwd = ''
              }

            }

            this.$parent.initGps(this.shipData)
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
