<style lang="less">
  @import '../../../styles/common.less';
</style>
<!--用户管理-->
<template>
  <div class="box_col">
    <div class="box_row rowBetween colItemCenter boxMar_B">
      <pager-tit></pager-tit>
      <div class="box_row rowRight">
        <div class="body-r-1 inputSty">
          <Input v-model="param.xmLike"
                 placeholder='用户名' style="width: 200px"
                 @on-keyup.enter="findMessList()"
                 @on-change="findMessList"></Input>
          <Input v-model="param.sjhLike"
                 placeholder='电话号码' style="width: 200px"
                 @on-keyup.enter="findMessList()"
                 @on-change="findMessList"></Input>
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
    <div class="box_col_auto">
      <div :id="tabBox" style="position: relative;height: 100%">
        <Table size='large'
               :height="tab_H"
               :columns="tableTiT"
               :data="tableData"></Table>
      </div>
    </div>
    <Row class="boxMar_T box_row rowRight">
      <Page :total=pageTotal :current=param.pageNum :page-size=param.pageSize
            :page-size-opts=[8,10,20,30,40,50] @on-page-size-change='(e)=>{param.pageSize=e;pageChange()}'
            show-total show-elevator show-sizer placement='top' @on-change='pageChange'></Page>
    </Row>
    <component
      :is="compName"
      :usermes="usermes"
      :usermesType="userMesType"
      @listF='listF'></component>
  </div>
</template>

<script>
  import newmess from './comp/newmes.vue'
  import changemes from './comp/changmes.vue'
  import i18nTabTit from '@/mixins/i18nTabTit'

  export default {
    name: 'char',
    components: {
      newmess,
      changemes
    },
    mixins: [i18nTabTit],
    data() {
      return {
        //tab高度
        tab_H: 0,
        tabBox:'tabBox',
        //动态组建
        compName: '',
        //动态组建数据
        usermes: {},
        userMesType: true,
        //分页
        //---数据总数
        pageTotal: 2,
        tableTiT: [
          {
            title: "序号",
            width: 80,
            align: 'center',
            type: 'index'
          },
          {
            title: '帐号',
            align: 'center',
            key: 'zh'
          },
          {
            title: '姓名',
            minWidth: 100,
            align: 'center',
            key: 'xm'
          },
          {
            title: '证件号码',
            align: 'center',
            key: 'zjhm'
          },
          {
            title: '性别',
            align: 'center',
            key: 'xb',
            render: (h, params) => {
              return h('div', params.row.xb == '1' ? '男' : '女')
            }
          },
          {
            title: '手机号',
            width: 120,
            align: 'center',
            key: 'sjh'
          },
          {
            title: '职务',
            align: 'center',
            key: 'zw'
          },
          {
            title: '类型',
            align: 'center',
            key: 'lx',
            render: (h, p) => {
              console.log('---------------------------------字典项处理--------------------------------------');
              let val = this.dictUtil.getValByCode(this, this.yhlxDictCode, p.row.lx)
              return h('div', val)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              if (params.row.lx === 'su') {
                return ''
              }
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    icon: 'md-create',
                    shape: 'circle',
                    size: 'small'
                  },
                  style: {
                    cursor: "pointer",
                    margin: '0 8px 0 0'
                  },
                  on: {
                    click: () => {
                      this.userMesType = false
                      this.usermes = params.row
                      this.compName = 'newmess'
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'primary',
                    icon: 'md-menu',
                    shape: 'circle',
                    size: 'small'
                  },
                  style: {
                    cursor: "pointer",
                    margin: '0 8px 0 0'
                  },
                  on: {
                    click: () => {
                      this.RootShowF(params.row)

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
                      this.listDele(params.row.yhid)
                    }
                  }
                })
              ]);
            }
          }
        ],
        tableData: [],
        param: {
          sjhLike: '',
          xmLike: '',
          pageNum: 1,
          pageSize: 8
        },
        yhlxDict: [],
        yhlxDictCode: 'ZDCLK0003'
      }
    },
    watch: {
    },
    created() {
      this.getmess()
      this.getDict()
    },
    // mounted() {
    //   this.$nextTick(()=>{
    //     try {
    //       this.tab_H = this.AF.getDom_H(this.tabBox)
    //       // this.GetTabTitLang()
    //     }catch (e) {
    //     }
    //   })
    // },
    methods: {
      getDict() {
        this.yhlxDict = this.dictUtil.getByCode(this, this.yhlxDictCode);
      },
      enter(mes) {
//				log(mes)
//
//				log('页面高度',Math.floor((this.getWindowHeight() - 290)/48))
      },
      getmess() {
        var v = this
        this.$http.get(this.apis.USER.QUERY, {params: v.param}).then((res) => {
//					log(res)
          v.tableData = res.page.list
          v.pageTotal = res.page.total
        })
      },
      //权限分配
      RootShowF(val) {
        var v = this
        v.compName = 'changemes'
        this.usermes = val;
//              log(val);

      },
      //收索事件
      findMessList() {
        var v = this
        this.$http.get(this.apis.USER.QUERY, {params: v.param}).then((res) => {
//					log(res)
          v.tableData = res.page.list
        })
      },
      //添加新用户信息
      AddDataList() {
        var v = this
        v.compName = 'newmess'
        v.userMesType = true
        this.usermes = null
      },
      listF(res) {
        this.getmess()
        this.compName = ''
      },
      //删除数据
      listDele(id) {
        this.util.del(this, this.apis.USER.DELE, [id], () => {
          this.getmess();
        });
      },
      //分页点击事件按
      pageChange(event) {
        var v = this
        v.param.pageNum = event
        v.getmess()
      }
    }
  }
</script>
