import tabI18n from '@/mixin/i18nTabTit'
export default {
  mixins:[tabI18n],
  data() {
    return {
      tabBox:'tabBox',
      tab_H: 0,
      tabTit: [
        {
          title: "序号",
          type: 'index'
        },
        {
          title: '帐号',
          key: 'zh'
        },
        {
          title: '姓名',
          key: 'xm'
        },
        {
          title: '证件号码',
          key: 'zjhm'
        },
        {
          title: '性别',
          key: 'xb',
          render: (h, params) => {
            return h('div', params.row.xb == '10' ? '男' : '女')
          }
        },
        {
          title: '手机号',
          key: 'sjh'
        },
        {
          title: '职务',
          key: 'zw'
        },
        {
          title: '类型',
          key: 'lx',
          slot: 'slotLX',

          // render: (h, p) => {
          //   let val = this.dictUtil.getValByCode(this, this.yhlxDictCode, p.row.lx)
          //   return h('div', val)
          // }
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            if (params.row.lx === 'su') {
              return ''
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  icon: 'md-key',
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
                    this.compName = 'ukey'
                  }
                }
              }),
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
                    // this.listDele(params.row.yhid)
                  }
                }
              })
            ]);
          }
        }
      ],
      tabData: [],
      pageTotal:0,
      params: {
        sjhLike: '',
        xmLike: '',
        timers: '',
        pageNum: 1,
        pageSize: 20
      },
    }
  },
  created() {
    this.setTabTitItem()
  },
  mounted() {
    this.$nextTick(()=>{
      try {
        this.tab_H = this.AF.getDom_H(this.tabBox)
      }catch (e) {
      }
    })
  },
  methods: {
    setTabTitItem() {
      this.tabTit.forEach((it, index) => {
        if(it.className){
          it.className = it.className + ' tabItemSty'
        }else {
          it.className = 'tabItemSty'
        }

        if(!it.align){
          it.align = 'center'
        }
        if(!it.minWidth){
          it.minWidth = 120
        }
      })
    }
  }
}
