<style lang="less">
  @import "../../../styles/common.less";
</style>
<style>
  .choosed {
    background-color: #eee;
  }
</style>
<template>
  <div class="box-row" style="z-index: 1">
    <div style="position:absolute;width:430px;top:145px;left:330px;z-index:888">
      <Col span="24">
        <Input placeholder='输入终端号' size="large" v-model="searchKey">
          <Button slot="append" type="primary" icon="md-search" @click="filter"></Button>
        </Input>
        <Tabs v-show="showTabs" ref="tabRef" style="background-color:white;" size="small"
              @on-click="changeTabMarkPoint">
          <TabPane :label="qblabel" name="name0" style="height:300px;overflow:auto;"
                   v-show="tabShowFlag">
            <Row v-for="(item,index) in carArray[0]" v-if="item.show"
                 @click.native="rowClick(item)">
              <Col span="24">
                <Card style="margin:0 15px 5px 15px;"
                      :class="{'choosed':choosedCar == item}">
                  <p slot="title">
                    <Icon type="soup-can-outline"></Icon>
                    {{item.zdbh}}
                  </p>
                  <p slot="extra" style="color:#19be6b">
                    {{formateLongDate(item.time)}}
                  </p>
                  <Row type="flex" justify="start">
                    <Col span="8">
                      <Icon type="model-s"></Icon>
                      {{item.cph}}
                    </Col>
                    <Col span="8">
                      <Icon type="md-person"></Icon>
                      {{item.sjxm ? item.sjxm : '暂无绑定'}}
                    </Col>
                    <Col span="2" offset="6">
                      <Button  size="small" @click="getObdInfo(item)"
                              style="font-weight: 700;color: black;float: right">
                        船舶信息
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane :label="dhlabel" name="name1" style="height:300px;overflow:auto;"
                   v-show="tabShowFlag">
            <Row v-for="(item,index) in carArray[1]" @click.native="rowClick(item)">
              <Col span="24">
                <Card style="margin:0 15px 5px 15px;"
                      :class="{'choosed':choosedCar == item}">
                  <p slot="title">
                    <Icon type="soup-can-outline"></Icon>
                    {{item.zdbh}}
                  </p>
                  <p slot="extra" style="color:#19be6b">
                    {{formateLongDate(item.time)}}
                  </p>
                  <Row type="flex" justify="start">
                    <Col span="8">
                      <Icon type="model-s"></Icon>
                      {{item.cph}}
                    </Col>
                    <Col span="8">
                      <Icon type="md-person"></Icon>
                      {{item.sjxm ? item.sjxm : '暂无绑定'}}
                    </Col>
                    <Col span="2" offset="6">
                      <Poptip v-if="item.obdId != ''" title='船舶信息'
                              placement="left" width="300"
                              style="float: right">
                        <Button size="small" @click="getObdInfo(item)"
                                style="font-weight: 700;color: black">
                          OBD
                        </Button>
                        <div slot="content">
                          <h3 v-if="gpsObdMessage == null">
                            $t("NONE_DATE")</h3>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">
                              $t("UPDATE_DATE")
                            </Col>
                            <Col span="16"><span>{{formatDate(gpsObdMessage.creatorDate)}} {{formatTime(gpsObdMessage.creatortime)}}</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">
                              $t("ENGINE_REVOLUTION")
                            </Col>
                            <Col span="16"><span>{{gpsObdMessage.engineSpeed}} r/min</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">$t("SPEED")</Col>
                            <Col span="16"><span>{{gpsObdMessage.obdSpeed}} KM/h</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">
                              $t("RESIDUAL_OIL")
                            </Col>
                            <Col span="16"><span>{{gpsObdMessage.syyl}} L</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">
                              $t("OIL_CONSUMPTION")
                            </Col>
                            <Col span="16"><span>{{gpsObdMessage.hyl}} L</span>
                            </Col>
                          </Row>
                          <Row v-if="obdFaultCode && obdFaultCode.length != 0">
                            <Col style="border-bottom: 1px solid #cccccc"></Col>
                            <Col span="8">
                              $t("ERROR_REPORT")
                            </Col>
                            <Col span="16">
                              <div v-for="item in obdFaultCode"
                                   style="border-bottom: 1px solid #cccccc">
                                <span>{{item.faultCode}}</span>
                                <!--<span :class="{obdFaultStatus:item.faultType != null,obdFaultHandled:item.faultType == '10',obdFaultNotHandle:item.faultType != '10'}">{{item.faultType == '10' ? '已解决' : '未解决'}}</span>-->
                                <br>
                                <span>{{item.creationTime}}</span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Poptip>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane :label="xhlabel" name="name2" style="height:300px;overflow:auto;"
                   v-show="tabShowFlag">
            <Row v-for="(item,index) in carArray[2]" @click.native="rowClick(item)">
              <Col span="24">
                <Card style="margin:0 15px 5px 15px;"
                      :class="{'choosed':choosedCar == item}">
                  <p slot="title">
                    <Icon type="soup-can-outline"></Icon>
                    {{item.zdbh}}
                  </p>
                  <p slot="extra" style="color:#ed3f14">
                    {{formateLongDate(item.time)}}
                  </p>
                  <Row type="flex" justify="start">
                    <Col span="8">
                      <Icon type="model-s"></Icon>
                      {{item.cph}}
                    </Col>
                    <Col span="8">
                      <Icon type="md-person"></Icon>
                      {{item.sjxm ? item.sjxm : '暂无绑定'}}
                    </Col>
                    <Col span="2" offset="6">
                      <Poptip v-if="item.obdId != ''" title='$t("OBD_INF")'
                              placement="left" width="300"
                              style="float: right">
                        <Button size="small" @click="getObdInfo(item)"
                                style="font-weight: 700;color: black">
                          OBD
                        </Button>
                        <div slot="content">
                          <h3 v-if="gpsObdMessage == null">暂无数据</h3>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">更新日期</Col>
                            <Col span="16"><span>{{formatDate(gpsObdMessage.creatorDate)}} {{formatTime(gpsObdMessage.creatortime)}}</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">发动机转速</Col>
                            <Col span="16"><span>{{gpsObdMessage.engineSpeed}} r/min</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">车速</Col>
                            <Col span="16"><span>{{gpsObdMessage.obdSpeed}} KM/h</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">剩余油量</Col>
                            <Col span="16"><span>{{gpsObdMessage.syyl}} L</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">耗油量</Col>
                            <Col span="16"><span>{{gpsObdMessage.hyl}} L</span>
                            </Col>
                          </Row>
                          <Row v-if="obdFaultCode && obdFaultCode.length != 0">
                            <Col style="border-bottom: 1px solid #cccccc"></Col>
                            <Col span="8">故障报告</Col>
                            <Col span="16">
                              <div v-for="item in obdFaultCode"
                                   style="border-bottom: 1px solid #cccccc">
                                <span>{{item.faultCode}}</span>
                                <!--<span :class="{obdFaultStatus:item.faultType != null,obdFaultHandled:item.faultType == '10',obdFaultNotHandle:item.faultType != '10'}">{{item.faultType == '10' ? '已解决' : '未解决'}}</span>-->
                                <br>
                                <span>{{item.creationTime}}</span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Poptip>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane :label="lxlabel" name="name3" style="height:300px;overflow:auto;"
                   v-show="tabShowFlag">
            <Row v-for="(item,index) in carArray[3]" @click.native="rowClick(item)">
              <Col span="24">
                <Card style="margin:0 15px 5px 15px;"
                      :class="{'choosed':choosedCar == item}">
                  <p slot="title">
                    <Icon type="soup-can-outline"></Icon>
                    {{item.zdbh}}
                  </p>
                  <p slot="extra">
                    {{formateLongDate(item.time)}}
                  </p>
                  <Row type="flex" justify="start">
                    <Col span="8">
                      <Icon type="model-s"></Icon>
                      {{item.cph}}
                    </Col>
                    <Col span="8">
                      <Icon type="md-person"></Icon>
                      {{item.sjxm ? item.sjxm : '暂无绑定'}}
                    </Col>
                    <Col span="2" offset="6">
                      <Poptip  title="船舶信息"
                              placement="left" width="300"
                              style="float: right">
                        <Button size="small" @click="getObdInfo(item)"
                                style="font-weight: 700;color: black">
                          OBD
                        </Button>
                        <div slot="content">
                          <h3 v-if="gpsObdMessage == null">暂无数据</h3>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">更新日期</Col>
                            <Col span="16"><span>{{formatDate(gpsObdMessage.creatorDate)}} {{formatTime(gpsObdMessage.creatortime)}}</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">发动机转速</Col>
                            <Col span="16"><span>{{gpsObdMessage.engineSpeed}} r/min</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">车速</Col>
                            <Col span="16"><span>{{gpsObdMessage.obdSpeed}} KM/h</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">剩余油量</Col>
                            <Col span="16"><span>{{gpsObdMessage.syyl}} L</span>
                            </Col>
                          </Row>
                          <Row v-if="gpsObdMessage != null">
                            <Col span="8">耗油量</Col>
                            <Col span="16"><span>{{gpsObdMessage.hyl}} L</span>
                            </Col>
                          </Row>
                          <Row v-if="obdFaultCode && obdFaultCode.length != 0">
                            <Col style="border-bottom: 1px solid #cccccc"></Col>
                            <Col span="8">故障报告</Col>
                            <Col span="16">
                              <div v-for="item in obdFaultCode"
                                   style="border-bottom: 1px solid #cccccc">
                                <span>{{item.faultCode}}</span>
                                <!--<span :class="{obdFaultStatus:item.faultType != null,obdFaultHandled:item.faultType == '10',obdFaultNotHandle:item.faultType != '10'}">{{item.faultType == '10' ? '已解决' : '未解决'}}</span>-->
                                <br>
                                <span>{{item.creationTime}}</span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Poptip>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <Button type="primary" size="small" :icon="changeBtnIcon" slot="extra" style="margin:5px"
                  @click.native="changeBtn"></Button>
        </Tabs>
      </Col>
    </div>
    <div style="position:absolute;width:300px;top:20px;right:-10px;z-index:9990;padding-top:140px;padding-right:50px;float: right"
         type="flex" justify="end">
      <car-info @close="closeItem" ref="carInfoRef" @switchGJ="switchGJ"></car-info>
    </div>
    <div class="body-F" style="height:100%">
      <!--<my-map ref="map" @codeEvent="codeEvent"></my-map>-->
      <component ref="map" :is="compName"></component>
    </div>
  </div>
</template>

<script>

  import B_myMap from '../../map/carJK.vue';
  import G_myMap from '../../map_G/carJK.vue';

  import carInfo from './carInfo';

  export default {
    name: 'VehicleMonitoring',
    components: {
      carInfo, B_myMap, G_myMap
    },
    computed: {
      local() {
        return this.$store.state.app.local;
      }
    },
    watch: {
      local: function (n, o) {
        if (n == 'en-US') {
          this.compName = 'B_myMap'
        } else {
          this.compName = 'B_myMap'
        }
        this.initGps()
      }
    },
    data() {
      return {
        compName: this.local == 'en-US' ? 'B_myMap' : 'B_myMap',
        showGJ: false,
        tabShowFlag: false,
        SpinShow: false,
        componentName: '',
        mapCarList: [],
        carArray: [[], [], [], []],
        status: 0,
        choosedCar: null,
        keyword: '',
        obd: {},
        gpsObdMessage: null,
        obdFaultCode: [],
        initTime: '',
        searchKey: '',
        showTabs: false,
        allCarList: [],
        allCarCount: 0,
        subscribes: [],
        changeBtnIcon: 'ios-arrow-down',
        qblabel: (h) => {
          return h('div', [
            h('span', '全部'),
            h('Button', {
              props: {
                shape: 'circle',
                size: 'small',
                disabled: true
              },
              style: 'background-color:#19be6b;color:white'
            }, this.carArray[0].length)
          ])
        },
        dhlabel: (h) => {
          return h('div', [
            h('span', '在航'),
            h('Button', {
              props: {
                shape: 'circle',
                size: 'small',
                disabled: true
              },
              style: 'background-color:#19be6b;color:white'
            }, this.carArray[1].length)
          ])
        },
        xhlabel: (h) => {
          return h('div', [
            h('span','锚泊'),
            h('Button', {
              props: {
                shape: 'circle',
                size: 'small',
                disabled: true
              },
              style: 'background-color:#ed3f14;color:white'
            }, this.carArray[2].length)
          ])
        },
        lxlabel: (h) => {
          return h('div', [
            h('span', '离线'),
            h('Button', {
              props: {
                shape: 'circle',
                size: 'small',
                disabled: true
              },
              style: 'background-color:#657180;color:white'
            }, this.carArray[3].length)
          ])
        }
      };
    },
    created() {
      this.compName = this.local == 'en-US' ? 'B_myMap' : 'B_myMap'
      this.$store.commit('setCurrentPath', [{
        title: '首页',
      }, {
        title: '终端监控',
      }, {
        title: '后视镜监控',
      }])
      this.initGps()
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    beforeDestroy() {
      // try {
      //     for (let r in this.subscribes) {
      //         this.subscribes[r].unsubscribe();
      //     }
      // } catch (e) {
      //     console.log(e);
      // }
    },
    methods: {
      switchGJ(s) {
        this.showGJ = s;
        // console.log("shsh564564sh",this.showGJ)
        /*this.$refs.map.init();
        this.$refs.carInfoRef.init(item);*/
        if (this.showGJ && this.choosedCar != null) {
          // console.log("shshsh",this.showGJ)
          this.getCarListCode(this.choosedCar.zdbh);
        } else {
          // this.$refs.map.clear();
          // this.$refs.map.update();
          this.mapCarList = [];
          this.carArray[0].forEach((item, index) => {
            if (item.zdbh == this.choosedCar.zdbh) {
              this.mapCarList.push(item);
            }
          })
          // console.log('lisr',this.mapCarList);
          // this.mapCarList = this.carArray[0];
          // this.$refs.map.update();
          /* if(this.choosedCar != n
          ull){
               this.$refs.carInfoRef.init(this.choosedCar);
           }*/
        }
      },
      startQuery() {
        clearTimeout();
        if (this.$route.path != '/jk') {
          return;
        }
        let v = this;
        setTimeout(() => {
          if (v.$route.path != '/jk') {
            return;
          }
          v.queryGps()
          v.startQuery();
        }, 5000)
      },
      queryGps() {
        // console.log('queryGps');
        let deviceIds = '';
        for (let r of this.allCarList) {
          deviceIds += r.zdbh + ",";
        }
        deviceIds = deviceIds.substring(0, deviceIds.length - 1);
        this.$http.get(this.apis.ZDGL.getWebsocketInfo, {params: {deviceIds: deviceIds}}).then((res) => {
          if (res.code != 200) {
            this.$Message.error(res.message);
          } else {

            if (res.result && res.result.length > 0) {
              // for (let r of res.result){
              //     this.onGpsInfo(JSON.parse(r));
              // }
              let li = this.$store.state.app.carCodeList;
              // console.log("li ----> " , li)
              let newCarList = []
              this.$store.commit('ChcarCodeList', [])
              res.result.forEach((it, index) => {
                it = JSON.parse(it);
                if (it.zxzt == '00') {
                  li.forEach((item, index) => {
                    if (item.zdbh === it.zdbh) {
                      it.gpsList = item.gpsList.concat(it.gpsList);
                    }
                  });
                } else {
                  it.gpsList = [];
                }

                this.onGpsInfo(it);
                newCarList.push(it)
                if (index == res.result.length - 1) {
                  // console.log(newCarList);
                  this.$store.commit('ChcarCodeList', newCarList);
                  if (this.choosedCar != null && this.choosedCar.zxzt == '00') {
                    this.getCarListCode(this.choosedCar.zdbh)
                  }
                }
              })

            }
          }
        })
      },
      showFance(carId) {
        this.fancePoints = [];
        var v = this
        this.$http.get(this.apis.DZWL.GET_BY_CAR_ID + "?clId=" + carId).then((res) => {
          if (res.code === 200) {
            let s = res.result.dlxxzb;
            let ps = s.split(";");
            for (let r of ps) {
              let point = r.split(",");
              this.fancePoints.push({lng: point[1], lat: point[0]})
            }
            this.addArea(this.fancePoints);
          }
        })
      },
      addArea(points) {
        let ps = [];
        for (let r of points) {
          ps.push(new BMap.Point(r.lng, r.lat))
        }
        var polygon = new BMap.Polygon(ps, {strokeColor: "red", strokeWeight: 2, strokeOpacity: 0.5});  //创建多边形
        this.map.addOverlay(polygon);
      },
      changeBtn() {
        if (this.changeBtnIcon == "ios-arrow-down") {
          this.changeBtnIcon = "ios-arrow-up";
          this.tabShowFlag = true;
        } else {
          this.changeBtnIcon = "ios-arrow-down";
          this.tabShowFlag = false;
        }
      },
      closeItem() {
        this.choosedCar = null;
      },
      mdclose(){

      },
      checkWebsocket() {
        this.websocketUtil.onConnected(() => this.subscribe())
      },
      subscribe() {
        let v = this;
        let activeKey = v.$refs.tabRef.activeKey;
        let showCarList = v.allCarList;
        if (activeKey == 'name0') {
          showCarList = v.carArray[0];
        } else if (activeKey == 'name1') {
          showCarList = v.carArray[1];
        } else if (activeKey == 'name2') {
          showCarList = v.carArray[2];
        } else if (activeKey == 'name3') {
          showCarList = v.carArray[3];
        }

        for (let r of showCarList) {
          this.subscribes[r.zdbh] = this.websocketUtil.subscribe('/topic/sendgps-' + r.zdbh, function (data) { //订阅消息
            v.onGpsInfo(JSON.parse(data.body));
          });
        }
      },
      formateLongDate(long) {
        if (typeof long == 'string') {
          return long;
        }
        let d = new Date(long);
        return d.format("yyyy-MM-dd hh:mm:ss");
      },
      formatDate(date) {
        if (!date) return '';
        return date.substring(0, 4) + '-' + date.substring(4, 6) + "-" + date.substring(6, 8) + "-";
      },
      formatTime(time) {
        if (!time) return '';
        return time.substring(0, 2) + ':' + time.substring(2, 4) + ":" + time.substring(4, 6);
      },
      getObdInfo(item) {
        this.SpinShow = true;
        var v = this
        this.gpsObdMessage = null;
        this.obdFaultCode = [];
        this.$http.get('/api/cl/query', {params:{clId: item.clId}}).then((res) => {
          if (res.code === 200) {
            if (res.result) {
              this.gpsObdMessage = res.result[0];
            }
            if (res.result[0].obdFaultCode) {
              this.obdFaultCode = res.result.obdFaultCode;
            }
          }
          this.SpinShow = false;
        })
      },
      onGpsInfo(m) {
        // console.log('onGpsInfo',m);
        let has = false;
        let exist = null;
        let newCar = {};
        for (let r of this.allCarList) {
          if (r.zdbh === m.zdbh) {
            exist = r;
            break;
          }
        }
        if (exist) {
          let n = this.updateItem(exist, m);
          newCar = n;
          let index = this.allCarList.indexOf(exist);
          this.allCarList.splice(index, 1, n);
        } else {
          this.handleItem(m);
          newCar = m;
          this.allCarList.push(m);
        }
        this.allCarCount = this.allCarList.length;
        this.classify();
        if (this.choosedCar) {
          if (this.choosedCar.zdbh == newCar.zdbh) {
            this.mapCarList = [newCar];
            this.$refs.map.update();
            if (this.choosedCar.zxzt == '00') {
              this.getCarListCode(this.choosedCar.zdbh);
            }
            return;
          } else {
            this.mapCarList = [this.choosedCar];
          }
        } else {
          try {
            //如果界面切换后，无该对象，websocket需停止
            if (this.$refs.map == undefined) {
              this.websocketUtil.disConnect();
              return
            }

            let activeKey = this.$refs.tabRef.activeKey;
            if (activeKey != 'name0' && activeKey != 'name1') {
              return;
            }

            this.mapCarList = this.carArray[this.status];
            this.$refs.map.update();
          } catch (e) {
          }
        }
      },
      init() {
        this.classify();
        this.mapCarList = this.allCarList;
        if (this.mapCarList.length > 0) {
          this.$refs.map.update();
        }
        this.showTabs = true;
        this.changeBtn();
      },
      initGps() {
        var v = this
        this.$http.get(this.apis.CLJK.QUERY, {
          params: {
            zdLx: '30',
            positionType: this.local == 'en-US' ? 'gcj02' : '',
          }
        }).then((res) => {
          if (res.code === 200) {
            this.$store.commit('ChcarCodeList', []);
            this.initTime = new Date().getTime();
            this.allCarList = res.result;
            if (!this.allCarList) {
              this.allCarList = [];
            } else {
              for (let r of this.allCarList) {
                r.show = true;
                this.handleItem(r);
              }
              this.carArray[0] = this.allCarList;
              // this.checkWebsocket();
              this.startQuery();
            }
            this.carArray[0] = this.allCarList;
            this.allCarCount = this.allCarList.length;
            this.$store.commit('ChcarCodeList', res.result);
            /* let li =   this.$store.state.app.carCodeList;
             console.log("llllll ," , li)*/
          }
          this.init();
        })
      },
      showPath() {
        this.$refs.map.showPath();
      },
      changeStatus(status) {
        this.choosedCar = null;
        this.status = status;
        this.mapCarList = this.carArray[status];
        this.$refs.map.init();
      },
      filter() {
        this.classify();
        this.mapCarList = this.carArray[this.status];
        this.$refs.map.init();
      },
      classify() {
        this.carArray[0] = [];
        this.carArray[1] = [];
        this.carArray[2] = [];
        this.carArray[3] = [];
        let c = 0;
        for (let r of this.allCarList) {
          let status = r.status;
          if (this.searchKey === ''
            || r.cph.indexOf(this.searchKey) >= 0
            || r.zdbh.indexOf(this.searchKey) >= 0
            || r.sjxm.indexOf(this.searchKey) >= 0
          ) {
            c++;
            r.show = true;
            this.carArray[0].push(r);
            this.carArray[status].push(r);
          } else {
            r.show = false;
          }
        }
        this.allCarCount = c;
        this.showTabs = false;
        this.showTabs = true;
      },
      updateItem(o, n) {
        let r = {};
        r.cx = n.cx;
        r.lng = n.bdjd;
        r.lat = n.bdwd;
        r.clid = n.clid;
        r.zdbh = n.zdbh;
        r.bdjd = n.bdjd;
        r.bdwd = n.bdwd;
        r.zxzt = n.zxzt;
        r.cph = o.cph;
        r.sjxm = o.sjxm;
        r.obdId = o.obdId;
        switch (n.zxzt) {
          case '10':
            r.status = 2;
            r.text = '熄火时间';
            r.speed = 0;
            r.time = o.time;
            break;
          case '20':
            r.status = 3;
            r.text = '离线时间';
            r.speed = 0;
            r.time = o.time;
            break;
          case '00':
          default:
            r.time = n.time;
            r.speed = n.speed;
            r.status = 1;
            r.text = '更新时间';
        }
        return r;
      },
      handleItem(item) {
        item.lng = item.bdjd;
        item.lat = item.bdwd;
        if (item.zxzt) {
          switch (item.zxzt) {
            case '10':
              item.status = 2;
              item.text = '熄火时间';
              item.speed = 0;
              break;
            case '20':
              item.status = 3;
              item.text = '离线时间';
              item.speed = 0;
              break;
            case '00':
            default:
              item.status = 1;
              item.text = '更新时间';
          }
        } else {
          switch (item.eventType) {
            case '60':
              item.status = 2;
              item.text = '熄火时间';
              item.speed = 0;
              break;
            case '80':
              item.status = 3;
              item.text = '离线时间';
              item.speed = 0;
              break;
            case '50':
            default:
              item.status = 1;
              item.text = '更新时间';
          }
        }
      },
      codeEvent(item) {
        this.$refs.carInfoRef.init(item);
      },
      rowClick(item) {
        // console.log('点击',item);
        this.showGJ = false;
        if (this.choosedCar == item) {
          return;
        }
        this.choosedCar = item;
        this.mapCarList = [this.choosedCar];
        this.$refs.map.init();
        this.$refs.carInfoRef.init(item);
        if (item.zxzt == '00') {
          this.getCarListCode(item.zdbh);
        }

      },
      getCarListCode(zdbh) {
        // console.log(this.$store.state.app.carCodeList)
        const carCodeList = this.$store.state.app.carCodeList;
        carCodeList.forEach((it, index) => {
          // console.log("gpslist ---> " , it.gpsList);
          if (this.showGJ && it.zdbh == zdbh && it.gpsList != '') {
            console.log("dwq gps ,", it.gpsList);
            this.$refs.map.addLine(it.gpsList);
          }
        })
      },
      changeTabMarkPoint(name) {
        this.showGJ = false;
        this.choosedCar = null;
        this.$refs.carInfoRef.close();
        let s = parseInt(name.charAt(4));
        if (this.status == s) return;
        this.status = s;
        this.mapCarList = this.carArray[s];
        this.$refs.map.update();
      }
    }
  };
</script>

