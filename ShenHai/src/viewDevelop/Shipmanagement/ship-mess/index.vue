<!--车辆管理-->
<template>
  <div class="box_col">
    <superSearch @addEvent="AddDataList"
                 @getParams="setParams"></superSearch>
    <Card class="shipMessBox">
      <div class="boxPadd_B">
        <div class="">
          <Icon v-if="showCard== true" type="ios-apps" size='30' @click="showCard = false"></Icon>
          <Icon v-else type="md-grid" size='30' @click="showCard = true"></Icon>
        </div>
        <div v-if="false" style="height: 45px;line-height: 45px;">
          <div class="margin-top-10 box-row">

            <div class="body-r-1 inputSty">
              <Input v-model="param.cphLike" placeholder='车牌号' style="width: 200px"
                     @on-keyup.enter="findMessList()"></Input>
              <Input v-model="param.zdbhLike" placeholder='终端号' style="width: 200px"
                     @on-keyup.enter="findMessList()"></Input>
              <Input v-model="param.sjxmLike" placeholder='司机姓名' style="width: 200px"
                     @on-keyup.enter="findMessList()"></Input>
            </div>
            <div class="butevent">
              <Button type="primary" @click="findMessList()">
                <Icon type="md-search"></Icon>
                <!--查询-->
              </Button>
              <Button type="primary" @click="AddDataList()">
                <Icon type="md-add"></Icon>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div :id="tabBox" class="centerBody">
        <Row v-if="showCard" v-for="(row,rowIndex) in tableData" :data="row" :key="rowIndex">
          <Col span="6" v-for="(col,index) in row" :key="index">
            <car-item :data="col"
                      style="margin:0 8px 8px"
                      @reload="getPageData"
                      @editCar="editCar"
                      @showDoc="showDoc"
                      @trace="trace"
                      @showFance="showFance"
                      @delCar="delCar"
            ></car-item>
          </Col>
        </Row>
        <div style="height: 100%;background-color: #5c6b77" v-if="!showCard">
          <Table :columns="columns1" :data="data1" :height="tab_H"></Table>
        </div>
      </div>
      <Row class="boxMar_T box_row rowRight">
        <Page :total=pageTotal
              :current=param.pageNum
              :page-size=param.pageSize :page-size-opts=[8,10,20,30,40,50]
              @on-page-size-change='(e)=>{param.pageSize=e;pageChange()}'
              show-total
              show-elevator show-sizer placement='top'
              @on-change='pageChange'></Page>
      </Row>
    </Card>
    <component
      :is="compName"
      :mess="mess"
      :derMess="derMes"
      :messType="messType"></component>
  </div>
</template>

<script>
  import mixins from '@/mixins'
  import i18nTabTit from '@/mixins/i18nTabTit'
  import expandRow from './table-expand'
  import newmes from './comp/newmes'
  import allmes from './comp/otherMess'
  import bkShow from './comp/BKshow'
  import carItem from './comp/carItem'
  import superSearch from './superSearch'

  export default {
    name: 'char',
    components: {
      expandRow, newmes, allmes, bkShow, carItem, superSearch
    },
    mixins: [mixins, i18nTabTit],
    data() {
      return {
        showCard: true,
        //tab高度
        tab_H: 0,
        tabBox: 'tabBox',
        columns1: [
          {
            title: '序号',
            type: 'index',
            align: 'center'
          },
          {
            title: 'MMSI',
            key: 'mmsi',
            align: 'center'
          },
          {
            title: '名称',
            key: 'shipname',
            align: 'center'
          }, {
            title: '呼号',
            key: 'callsign',
            align: 'center'
          }, {
            title: 'IMO',
            key: 'imo',
            align: 'center'
          },
          {
            title: '类型',
            key: 'shiptypename',
            align: 'center'
          },
          {
            title: '长度',
            key: 'length',
            align: 'center'
          }, {
            title: '宽度',
            key: 'breadth',
            align: 'center'
          }, {
            title: '船籍',
            key: 'nationality',
            align: 'center'
          },
        ],
        mess: {},
        derMes: {
          sjId: '',
          sjxm: ''
        },
        cell: {
          bindDrvFlag: false
        },
        messType: true,
        compName: '',
        clztDict: [],
        clztDictCode: 'ZDCLK0016',
        cxDict: [],
        cxDictCode: 'ZDCLK0019',
        SpinShow: true,
        tabHeight: 220,
        PickerTime: 2017,
        //分页
        pageTotal: 1,
        page: {
          pageNum: 1,
          pageSize: 8
        },
        tableData: [],
        data1: [],
        //收索
        param: {
          cphLike: '',
          pageNum: 1,
          pageSize: 8
        },
        drivers: [],
        deviceList: [],
      }
    },
    created() {
      this.SpinShow = false;
      this.getPageData()
      this.getCxDict();
      this.getClztDict();
    },
    methods: {
      editCar(car) {
        this.messType = false
        this.mess = car
        //由于数据传递丢失 司机ID 司机 姓名 单独传递
        this.derMes.sjId = car.sjId
        this.derMes.sjxm = car.sjxm
        this.compName = newmes
      },
      showDoc(car) {
        this.mess = car
        this.compName = allmes
      },
      trace(car) {
        this.$router.push(
          {
            name: 'historyTarck_new',
            params: {zdbh: car.zdbh}
          }
        );
      },
      showFance(car) {
        this.compName = bkShow
        this.mess = car
      },
      delCar(car) {
        this.listDele(car)
      },
      getDeviceList() {//获取终端编号
        let v = this;
        v.$http.post(this.apis.ZDGL.SXQUERY).then((res) => {
          if (res.code === 200) {
            if (res.result == undefined) {
              res.result = []
            }
            log('终端数据', res)
            this.deviceList = res.result;
            this.deviceList.push({'zdbh': v.mess.zdbh})
          }
        })
      },
      getDrivers() {
        let v = this;
        v.$http.get(this.apis.JSY.QUERY, {params: {pageSize: 1000}}).then((res) => {
          if (res.code === 200) {
            v.drivers = res.page.list;
          }
        })
      },
      ok(item) {

      },
      cancel(item) {

      },
      getCx(code) {
        let val = this.dictUtil.getValByCode(this, this.cxDictCode, code)
        return val;
      },
      getClztDict() {
        this.clztDict = this.dictUtil.getByCode(this, this.clztDictCode);
      },
      getCxDict() {
        this.cxDict = this.dictUtil.getByCode(this, this.cxDictCode);
      },
      getPageData() {
        var v = this
        v.tableData = [];
        v.data1 = [];
        this.$http.get(this.apis.CLGL.QUERY, {params: v.param}).then((res) => {
          if (res.code == 200 && res.page.list) {
            let data = res.page.list;
            this.data1 = res.page.list;
            for (let r of data) {
              r.bindDrvFlag = !!r.sjxm;
            }
            let colCount = 4;
            let rowCount = data.length / colCount;
            if (data.length % colCount != 0) {
              rowCount += 1;
            }
            let array = [];
            for (let i = 0; i < rowCount; i++) {
              let start = i * colCount;
              let end = start + colCount;
              array.push(data.slice(start, end));
            }
            v.tableData = array
            v.pageTotal = res.page.total
          }

          v.SpinShow = false;
        })
      },
      unbindDevice(carId) {
        swal({
          title: "确定解绑该终端？",
          text: "",
          icon: "warning",
          buttons: ['取消', '确认'],
        }).then((willDelete) => {
          if (willDelete) {
            this.$http.post(this.apis.CLGL.unbindDevice, {carId: carId}).then((res) => {
              if (res.code === 200) {
                this.getPageData();
                this.$Message.success("解绑成功");
              } else {
                this.$Message.error(res.message);
              }
            })
          }
        });
      },
      unbindDriver(carId) {
        swal({
          title: "确定解绑驾驶员？",
          text: "",
          icon: "warning",
          buttons: ['取消', '确认'],
        }).then((willDelete) => {
          if (willDelete) {
            this.$http.post(this.apis.CLGL.unbindDriver, {carId: carId}).then((res) => {
              if (res.code === 200) {
                this.getPageData();
                this.$Message.success("解绑成功");
              } else {
                this.$Message.error(res.message);
              }
            })
          }
        });
      },
      AddDataList() {
        var v = this
        v.mess = {}
        v.messType = true
        v.compName = 'newmes'
      },
      setParams(pms){
        for(let it in pms){
          console.log(it);
        }
      },
      findMessList() {
        this.getPageData()
      },
      listDele(id) {
        this.util.del(this, this.apis.CLGL.DELE, [id.clId], () => {
          this.getPageData()
        })
      },
      pageChange(event) {
        this.param.pageNum = event
        this.getPageData()
      },
    }
  }
</script>
<style lang="less">
  /*@import '../../../styles/common.less';*/
  .shipMessBox {
    flex: 1;
    overflow-y: auto;
    .ivu-card-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      .centerBody {
        flex: 1;
        overflow-y: auto;
      }
    }
  }
</style>
