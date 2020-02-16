<style lang="less">
  @import '../../../styles/common.less';

</style>
<!--查询统计-->
<template>
  <div class="box_col">
    <div class="box_row rowBetween colItemCenter boxMar_B">
      <pager-tit></pager-tit>
      <div class="box_row rowRight">
        <div class="body-r-1 inputSty">
          <!--<Input v-model="param.mcLike" placeholder="请输入终端名称" style="width: 200px"-->
          <!--@on-keyup.enter="getPageData()"></Input>-->
          <Input v-model="param.zdbhLike" placeholder='终端编号' style="width: 200px"
                 @on-keyup.enter="getPageData()"></Input>
<!--          <Input v-model="param.cphLike" placeholder='车牌号' style="width: 200px"-->
<!--                 @on-keyup.enter="getPageData()"></Input>-->
          <!--<Input v-model="param.versionLike" placeholder="请输入版本号" style="width: 200px"-->
          <!--@on-keyup.enter="getPageData()"></Input>-->
          <Select v-model="param.zxzt"
                  @on-change='getPageData'
                  clearable
                  placeholder='在线状态'
                  filterable style="width: 160px;">
            <Option v-for="(item,index) in Dictionary"
                    :value="item.key"
                    style="text-align: left;"
                    :key="index">{{item.val}}
            </Option>
          </Select>
        </div>
        <div class="butevent">
          <Tooltip content='INQUIRE' placement="top">
            <Button type="primary" @click="getPageData()">
              <Icon type="md-search"></Icon>
            </Button>
          </Tooltip>
          <Tooltip content="新增" placement="top">
          <Button type="primary" @click="AddMess()">
          <Icon type="md-add"></Icon>
          </Button>
          </Tooltip>
          <!--<Tooltip content="批量导入" placement="top">-->
          <!--<Button type="success" @click="componentName='plmess'">-->
          <!--<Icon type="md-cloud-upload" size="18"/>-->
          <!--</Button>-->
          <!--</Tooltip>-->
          <!--<Tooltip content="升级设备" placement="top">-->
          <!--<Button type="warning" @click="batchUpdate()">-->
          <!--<Icon type="md-arrow-round-up"></Icon>-->
          <!--</Button>-->
          <!--</Tooltip>-->
        </div>
      </div>
    </div>
    <div class="box_col_auto">
      <Row>
        <Table ref="table" :height="tabHeight"  :columns="tableTiT"
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
      :mess="choosedRow" @getpager="getPageData"></component>
  </div>
</template>

<script>

  import i18nTabTit from '@/mixins/i18nTabTit'
  import mixin from '@/mixins'

  import zdxq from '../../components/zd_xq'
  import add from './comp/add'
  export default {
    name: 'char',
    mixins: [i18nTabTit,mixin],
    components: {
      zdxq,add
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
            title: '设备号',
            tit:"TERMINAL_NUMBER",
            align: 'center',
            key: 'sbh',
            minWidth: 180
          },
          {
            title: '设备通道',
            tit:"BOUND_VEHICLE",
            align: 'center',
            key: 'chns',
            minWidth: 150,
          },
          // {
          //   title: '在线状态',
          //   tit:"ON_LINE_STATE_TAB",
          //   align: 'center',
          //   key: 'zxzt',
          //   minWidth: 100,
          //   render: (h, p) => {
          //     let val = this.dictUtil.getValByCode(this, this.lmdmDictionary, p.row.zxzt)
          //     return h('div', {
          //       style: {
          //         color: p.row.zxzt == 20 ? '#727272' : (p.row.zxzt == 10 ? '#ed4014' : '#279a3b')
          //       }
          //     }, val)
          //   }
          // },
          {
            title: '创建时间',
            tit:"EXPIRATION_DATE",
            align: 'center',
            key: 'cjsj',
            minWidth: 120,
          },
          {
            title: '创建人',
            tit:"EXPIRATION_DATE",
            align: 'center',
            key: 'cjr',
            minWidth: 120,
          },
          {
            title: '操作',
            tit:"OPERATION",
            align: 'center',
            type: 'action',
            minWidth: 120,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Tooltip',
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
          pageNum: 1,
          pageSize: 15,
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
        this.$http.get('/api/cbsb/pager',{params:this.param}).then((res) => {
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
        this.componentName = 'add'
        this.choosedRow = null;
      },
      //删除数据
      listDele(r) {
        this.swal({
          title:'是否确认删除?',
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
        }).then( (val) =>{
          if (val.value) {
            this.$http.post('/api/cbsb/remove/'+r.sbh).then((res)=>{
              if (res.code == 200){
                this.$Message.success(res.message)
                this.getPageData()
              }else {
                this.$Message.success(res.message)
              }
            })
          } else {

          }
        })
      },
    }
  }
</script>
