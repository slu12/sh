<style lang="less">
  @import '../../../styles/common.less';

</style>
<!--查询统计-->
<template>
  <div class="box_col">
    <div class="box_row rowBetween colItemCenter boxMar_B">
      <pager-tit></pager-tit>
      <div class="box_row_100 box_row rowRight">
        <div class="box_row_100" style="margin-right:18px">
          <Row :gutter="18" type="flex" justify="end">
            <Col span="4">
              <Input v-model="param.zdbhLike" placeholder='终端编号'
                     @on-keyup.enter="getPageData()"/>
            </Col>
            <Col span="4">
              <Input v-model="param.versionLike" placeholder='版本号'
                     @on-keyup.enter="getPageData()"/>
            </Col>
            <Col span="4">
              <Select v-model="param.zxzt"
                      @on-change='getPageData'
                      clearable
                      placeholder='状态'
                      filterable>
                <Option v-for="(item,index) in Dictionary"
                        :value="item.key"
                        :key="index">{{item.val}}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="butevent box_row rowBetween" style="width: 230px">
          <Tooltip content="查询" placement="top">
            <Button type="primary" @click="getPageData()">
              <Icon type="md-search"></Icon>
            </Button>
          </Tooltip>
          <Tooltip content="新增" placement="top">
            <Button type="primary" @click="AddMess()">
              <Icon type="md-add"></Icon>
            </Button>
          </Tooltip>
          <Tooltip content="批量导入" placement="top">
            <Button type="success" @click="componentName='plmess'">
              <Icon type="md-redo"></Icon>
            </Button>
          </Tooltip>
          <Tooltip content="升级设备" placement="top">
            <Button type="warning" @click="batchUpdate()">
              <Icon type="md-arrow-round-up"></Icon>
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
    <div class="box_col_auto">
      <Row>
        <Table ref="table" :height="tabHeight" :row-class-name="rowClassName" :columns="tableTiT"
               :data="tableData"></Table>
        <div v-if="SpinShow"
             style="width:100%;height:100%;position: absolute;top: 0;left:0;z-index: 100;">
          <Spin fix>
            <Icon type="load-c" :size=loading.size class="demo-spin-icon-load"></Icon>
            <div style="font-size: 30px;">{{loading.text}}</div>
          </Spin>
        </div>
      </Row>
      <Row class="margin-top-10 pageSty">
        <Page :total=pageTotal :current=param.pageNum :page-size=param.pageSize
              :page-size-opts=[8,10,15,20,30,40,50]
              @on-page-size-change='(e)=>{param.pageSize=e;pageChange()}' show-total show-elevator
              show-sizer placement='top' @on-change='pageChange'></Page>
      </Row>

    </div>
    <component
      :is="componentName"
      :mess="choosedRow"></component>
  </div>
</template>

<script>
  import formData from './formData'
  import change from './change'
  import jkdz from './jkdz'
  import update from './update'
  import setting from './setting'
  import plmess from './plMess'
  import i18nTabTit from '@/mixins/i18nTabTit'
  import mixin from '@/mixins'

  import zdxq from '../../components/zd_xq'

  export default {
    name: 'char',
    mixins: [i18nTabTit, mixin],
    components: {
      zdxq,
      formData, change, jkdz, setting, update, plmess
    },
    data() {
      return {
        PickerTime: 2017,
        updateMode: 'single',
        SpinShow: false,
        //分页
        loading: this.$store.state.app.loading,
        pageTotal: 1,
        cjsjInRange: '',
        tabHeight: 220,
        componentName: '',
        choosedRow: {},
        //弹层
        showModal: false,
        tableTiT: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '终端编号',
            tit: "TERMINAL_NUM_TAB",
            align: 'center',
            key: 'zdbh',
            minWidth: 180
          },
          {
            title: '绑定船舶',
            align: 'center',
            key: 'cph',
            minWidth: 100,
            render: (h, p) => {
              let s = p.row.cl.shipname + '-' + p.row.cl.mmsi;
              return h('div', s);
            }
          },
          {
            title: '在线状态',
            tit: "ON_LINE_STATE_TAB",
            align: 'center',
            key: 'zxzt',
            minWidth: 100,
            render: (h, p) => {
              let val = this.dictUtil.getValByCode(this, this.lmdmDictionary, p.row.zxzt)
              return h('div', {
                style: {
                  color: p.row.zxzt == 20 ? '#727272' : (p.row.zxzt == 10 ? '#ed4014' : '#279a3b')
                }
              }, val)
            }
          },

          {
            title: '注册时间',
            tit: "REGISTRATION_DATE",
            align: 'center',
            key: 'cjsj',
            minWidth: 100,
            render: (h, p) => {
              return h('div', p.row.cjsj.substring(0, 10))
            }
          },
          // {
          //   title: '版本号',
          //   tit: "VERSION_NUM_TAB",
          //   align: 'center',
          //   key: 'version',
          //   minWidth: 120,
          // },
          {
            title: '到期时间',
            align: 'center',
            key: 'zdJssj',
            minWidth: 120,
            render: (h, p) => {
              if (p.row.zdJssj == '') {
                return h('div', '-')
              } else if (p.row.zdJssj == '#') {
                return h('div', '永久')
              } else {
                return h('div', p.row.zdJssj.substring(0, 10))
              }
            }
          },
          {
            title: '制造商',
            tit: "MANUFACTURER",
            align: 'center',
            key: 'zzsmc',
            minWidth: 120,
            render: (h, p) => {
              if (p.row.zzsmc == '') {
                return h('div', '-----')
              } else {
                return h('div', p.row.zdJssj)
              }
            }
          },
          {
            title: '操作',
            align: 'center',
            type: 'action',
            minWidth: 180,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Tooltip',
                  {
                    props: {
                      placement: 'top',
                      content: '设备升级',
                      transfer: true
                    },
                  },
                  [
                    h('Button', {
                      props: {
                        type: 'warning',
                        icon: 'md-arrow-round-up',
                        shape: 'circle',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.updateMode = 'single'
                          this.choosedRow = params.row
                          this.componentName = 'update'
                        }
                      }
                    }),
                  ]
                ),

                h('Tooltip',
                  {
                    props: {
                      placement: 'top',
                      content: '设置接口地址',
                      transfer: true
                    },
                  },
                  [
                    h('Button', {
                      props: {
                        type: 'primary',
                        icon: 'ios-pulse',
                        shape: 'circle',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.choosedRow = params.row
                          console.log('jkdz');
                          this.componentName = 'jkdz'
                        }
                      }
                    }),
                  ]
                ),
                h('Tooltip',
                  {
                    props: {
                      placement: 'top',
                      transfer: true,
                      content: '删除',
                    },
                  },
                  [
                    h('Button', {
                      props: {
                        type: 'error',
                        icon: 'md-close',
                        shape: 'circle',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.listDele(params.row)
                        }
                      }
                    })
                  ]
                ),
              ]);
            }
          },
        ],
        tableData: [],
        //form表单
        formTop: {},
        //select
        cityList: [],
        //收索
        param: {
          orderBy: 'zdbh asc',
          mcLike: '',
          versionLike: '',
          zxzt: '',
          zdbhLike: '',
          pageNum: 1,
          pageSize: 15,
          // zdLx: '10',//终端类型 字典：ZDCLK1017
        },
        Dictionary: [],
        lmdmDictionary: 'ZDCLK0032',//在线状态
        ztDictionary: [],
        ztlmdmDictionary: 'ZDCLK0031'//设备状态
      }
    },
    created() {
      this.tabHeight = this.getWindowHeight() - 260
      this.getPageData()
      this.getLXDic()
    },
    methods: {
      batchUpdate() {
        this.choosedRow = null;
        this.updateMode = 'batch'
        this.componentName = 'update';
      },
      getLXDic() {
        this.Dictionary = this.dictUtil.getByCode(this, this.lmdmDictionary);
        this.ztDictionary = this.dictUtil.getByCode(this, this.ztlmdmDictionary);
      },
      getPageData() {
        this.pageTotal = 0;
        this.tableData = [];
        this.$http.get('/api/zdgl/pager', {params: this.param}).then((res) => {
          this.SpinShow = false;
          if (res.code === 200) {
            this.tableData = res.page.list;
            this.pageTotal = res.page.total;
          }
        })
      },
      pageChange(e) {
        this.param.pageNum = e;
        this.getPageData();
      },
      //新增数据
      AddMess() {
        this.componentName = 'formData'
        this.choosedRow = null;
      },
      //删除数据
      listDele(r) {
        this.util.del(this, this.apis.ZDGL.DELE, [r.zdbh])
      },
    }
  }
</script>
