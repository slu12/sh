<style lang="less">
  @import "../../../styles/common.less";
</style>
<style type="text/css" scoped="">
  .carlist {
    padding: 3px 4px;
    background-color: #fff;
  }

  .carlistBor {
    border: solid 1px #bbb3b3;
  }

  #input div {
    float: left
  }

  #input button {
    float: left
  }
</style>
<template>
  <div class="box-col">
    <div class="box_row rowBetween colItemCenter boxMar_B" v-show="!RootShow">
      <pager-tit></pager-tit>
      <div class="box_row rowRight">
        <div class="body-r-1 inputSty">
          <Input v-model="param.mmsi" placeholder='请输入船舶mmsi号查询' style="width: 200px"
                 @on-keyup.enter="findMessList()"></Input>
        </div>
        <div class="butevent">
          <Button type="success" @click="findList" style="margin-right: 12px">
            <Icon type="md-search"></Icon>
            <!--查询-->
          </Button>
          <Button type="primary" @click="AddRali">
            <Icon type="md-add"></Icon>
          </Button>
        </div>
      </div>
    </div>
    <div class="body">
      <Table ref="table"
             :height="tabHeight"
             :row-class-name="rowClassName"
             :columns="tableTiT"
             :data="data9"></Table>
      <div v-if="SpinShow" style="width:100%;height:100%;position: absolute;top: 0;left:0;z-index: 100;">
        <Spin fix>
          <Icon type="load-c" size=55 class="demo-spin-icon-load"></Icon>
          <div style="font-size: 30px;">数据加载中请稍后</div>
        </Spin>
      </div>
      <Row class="margin-top-10 pageSty">
        <Page
          :total=pageTotal
          :current=param.pageNum
          :page-size=param.pageSize :page-size-opts=[8,10,20,30,40,50]
          @on-page-size-change='(e)=>{param.pageSize=e;pageChange()}'
          show-total
          show-elevator show-sizer placement='top'
          @on-change='pageChange'></Page>
      </Row>
    </div>
    <component
      ref="comp"
      :is="componentName"
      :mess="mess"
      @close="closeModal"
    ></component>
  </div>
</template>

<script>
  import i18nTabTit from '@/mixins/i18nTabTit'
  import mixins from '@/mixins'
  import formData from './comp/formData'
  import bkShow from './comp/BKshow'
  //新增电子围栏
  import addRail from './comp/addNewRail'
  export default {
    name: '',
    mixins: [mixins, i18nTabTit],
    components: {
      formData, bkShow,addRail
    },
    data() {
      return {
        pageTotal: 1,
        page: {
          pageNum: 1,
          pageSize: 8
        },
        SpinShow: false,
        tabHeight: 220,
        mess: {},
        mapDot: [],
        points: [],
        RootShow: false,
        choosedRow: null,
        componentName: '',
        //收索
        cjsjInRange: [],
        param: {
          cjsjInRange: '',
          cphLike: '',
          pageNum: 1,
          pageSize: 8,
          dlxxzb: '',
          clIds: '',
          wlmc:''
        },
        ruleInline: {
          // wlmc: [
          //     { required: true, message: '请输入围栏名称', trigger: 'blur' }
          // ],
        },
        fanceId: '',
        tableTiT: [
          {
            title: '序号',
            tit: "ORDER",
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '机构名称',
            tit: "CAR_NUM_TAB",
            align: 'center',
            key: 'jgmc'
          },
          {
            title: '围栏名称',
            tit: "FENCE_NAME",
            align: 'center',
            key: 'wlmc'
          },
          {
            title: '绑定船舶mmsi',
            align: 'center',
            key: 'l',
            render: (h, p) => {
              if (p.row.cls && p.row.cls.length > 0) {
                let l = ''
                for (let i = 0; i < p.row.cls.length; i++) {
                  l = l + p.row.cls[i].mmsi + ','
                  // console.log(l);
                }
                return h('div', l)
              } else {
                return h('div', '无绑定船舶')
              }
            }
          },
          {
            title: '创建时间',
            tit: "CREATE_TIME",
            width: 180,
            align: 'center',
            key: 'cjsj'
          },
          {
            title: '操作',
            tit: "OPERATION",
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {//电子围栏展示
                  props: {
                    type: 'primary',
                    icon: 'ios-globe-outline',
                    shape: 'circle',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.mess = params.row
                      this.componentName = 'bkShow'
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'error',
                    icon: 'md-close',
                    shape: 'circle',
                    size: 'small'
                  },
                  style: {
                    cursor: "pointer",
                    margin: '0 8px 0 0'
                  },
                  on: {
                    click: () => {
                      this.listDele(params.row.id)
                    }
                  }
                }),
              ]);
            }
          }
        ],
        data9: [],
        data1: [{
          "children": [{
            "mapCenMap": {},
            "title": "111111"
          }, {
            "mapCenMap": {},
            "title": "1212"
          }, {
            "mapCenMap": {},
            "title": "121212"
          }],
          "expand": true,
          "title": "小车"
        }, {
          "children": [{
            "mapCen": {
              "lat": "31.3366798136",
              "lng": "114.2353441913"
            },
            "title": "鄂A66771"
          }, {
            "mapCenMap": {
              "lat": "31.2173317951",
              "lng": "114.1443044286"
            },
            "title": "鄂A66773"
          }, {
            "mapCenMap": {},
            "title": "鄂TEST"
          }],
          "expand": true,
          "title": "校巴"
        }],
        carIds: '',
        mmsi: '',
        wlid: '',
        loading2: false,
        options2: [],
        list: ['1', '2', '3']
      };
    },
    computed: {},
    watch: {
      cjsjInRange: function (newQuestion, oldQuestion) {
        this.param.cjsjInRange = this.getdateParaD(newQuestion[0]) + ',' + this.getdateParaD(newQuestion[1])
      },
    },
    created() {
      this.tabHeight = this.getWindowHeight() - 240
      this.findMessList();
      this.getCarTree()
    },
    methods: {
      closeModal(){
        this.componentName = '';
        this.findMessList();
        this.getCarTree()
      },
      remoteMethod2(query) {
        if (query !== '') {
          this.loading2 = true;
          setTimeout(() => {
            this.loading2 = false;
            // const list = this.data1.map(item => {
            //   return {
            //     value: item.clId,
            //     label: item.mmsi
            //   };
            // });
            // console.log(this.data1 ,  "----");
            this.options2 = this.data1.filter(item => {
              return item.mmsi.indexOf(query.toUpperCase()) != -1
            });
            // console.log(this.options2, "+++");
          }, 200);
        } else {
          this.options2 = [];
        }
      },
      //删除数据
      listDele(id) {
        this.util.del(this, this.apis.DZWL_CL.DELE, [id], () => {
          this.findMessList();
        });
      },
      finish() {
        this.saveDzwl();
        this.findList();
      },
      getCarTree(mmsi) {
        this.$http.post('/api/cl/getCbForDzwl', {pageNum: 1, pageSize: 99999999}).then((res) => {
          this.data1 = res.result
        }).catch((error) => {
        })
      },
      choosePoint(points) {
        this.param.dlxxzb = '';
        for (let r of points) {
          this.param.dlxxzb += r.lng + "," + r.lat + ";";
        }
        console.log(this.param.dlxxzb);
      },
      //电子围栏
      cancelRali() {
        // this.componentName = "addRail"
        // this.RootShow = !this.RootShow
      },
      AddRali() {
        this.componentName = "addRail"
        // this.RootShow = !this.RootShow
        // this.$refs.maps.bk();
      },
      //树多选框
      checkClick(event) {
        var v = this
        v.mapDot = []
        if (event[0]) {
          v.getLeaf([event[0]])
        } else if (event == undefined) {
          v.getLeaf([])
        }
      },
      getLeaf(list) {
        let v = this;
        if (list.length > 0) {
          for (let r of list) {
            if (r.children) {
              v.getLeaf(r.children)
            } else {
              v.mapDot.push(r);
            }
          }
        } else {
          v.mapDot.push([]);
        }
      },
      getChoosedIds() {
        this.carIds = '';
        let nodes = this.$refs['tree'].getCheckedNodes();
        for (let r of nodes) {
          this.carIds += r.clid + ",";
        }
      },
      save() {
        console.log('savedz');
        this.$http.post(this.apis.DZWL.setCarsDzwl, {
          wlid: this.fanceId,
          // carIds: this.carIds
          carIds: this.mmsi.toString()
        }).then((res) => {
          if (res.code === 200) {
            this.RootShow = !this.RootShow
            this.findMessList();
            this.mmsi = null
          } else {
            this.$Message.error(res.message);
          }
          this.SpinShow = false;
        })
        // var v = this
        // this.$refs['param'].validate((valid) => {
        //   if (valid) {
        //     this.getChoosedIds();
        //
        //   } else {
        //     v.$Message.error('请认真填写信息!');
        //   }
        // })
      },
      saveDzwl() {
        var v = this
        if (!v.param.wlmc || v.param.wlmc == '') {
          v.$Message.error('请输入围栏名称');
          return;
        }
        this.$http.post(this.apis.DZWL.ADD, {wlmc:v.param.wlmc}).then((res) => {
          if (res.code === 200) {
            this.fanceId = res.message;
            this.save();
          }
          v.SpinShow = false;
        })
      },
      //树多点击事件
      treeClick(mess) {
        if (mess[0]) {
          this.mapDot = mess
        }
      },
      changeTime(val) {
      },
      findList() {
        this.findMessList();
      },
      findMessList() {
        var v = this
        delete this.param.dlxxzb;
        delete this.param.wlmc;
        this.$http.get(this.apis.DZWL.QUERY, {params: v.param}).then((res) => {
          if (res.code == 200) {
            v.data9 = res.page.list
            v.pageTotal = res.page.total
            v.SpinShow = false;
          }
        })
      },
      pageChange(event) {
        var v = this
        v.param.pageNum = event
        v.findMessList()
      },
    }
  };
</script>

<style>
</style>
