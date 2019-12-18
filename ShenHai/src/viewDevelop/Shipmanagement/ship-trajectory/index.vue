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
              <div>定位时间 : {{ship.jgmc}}</div>
              <div>定位坐标 : {{ship.jgmc}}</div>
              <div>航速 : {{ship.jgmc}}</div>
              <div>航向 : {{ship.jgmc}}</div>
              <div>设备编号 : {{ship.jgmc}}</div>
           </div>
        </div>
      </div>
      <div v-if="tabIndex === 2"></div>
      <div v-if="tabIndex === 3"></div>
      <div v-if="tabIndex === 4"></div>
    </div>
    <div class="sq" @click="unShow" v-if="showModal">
      <Icon size="32" type="ios-arrow-forward" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
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
        ship:{}

      }
    },
    created(){
      this.getshipMess()
    },
    methods: {
      getship(item){
        console.log(item,'点击详情');
        this.ship = item
        this.tabIndex = 1
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
