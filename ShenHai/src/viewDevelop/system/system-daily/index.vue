<style lang="less">
    @import '../../../styles/common.less';

</style>
<!--日志管理-->
<template>
    <div class="box_col">
      <div class="box_row rowBetween colItemCenter boxMar_B">
        <pager-tit></pager-tit>
        <div class="box_row rowRight">
          <div class="body-r-1 inputSty">
            <DatePicker v-model="czsjInRange" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder='请选择时间' @on-keyup.enter="findMessList()" style="width: 220px"></DatePicker>
          </div>
          <div class="butevent">
            <Button type="primary" @click="findMessList()">
              <Icon type="md-search"></Icon>
              <!--查询-->
            </Button>
          </div>
        </div>
      </div>
		<div class="box_col_auto">
      <Row>
        <Table ref="table"
               :height="tabHeight"
               :row-class-name="rowClassName"
               :columns="tableTiT"
               :data="tableData"></Table>
      </Row>
      <Row class="margin-top-10 pageSty">
        <Page :total=pageTotal
              :current=param.pageNum
              :page-size=param.pageSize :page-size-opts=[8,10,20,30,40,50]  @on-page-size-change='(e)=>{param.pageSize=e;pageChange()}'
              show-total
              show-elevator show-sizer placement='top'
              @on-change='pageChange'></Page>
      </Row>
    </div>
    </div>
</template>

<script>
	import mixins from '@/mixins'
	import i18nTabTit from '@/mixins/i18nTabTit'


	export default {
    	name:'char',
    	mixins:[mixins,i18nTabTit],
        data () {
            return {
            	SpinShow:true,
				tabHeight: 220,
            	PickerTime:2017,
            	//分页
            	pageTotal:1,
            	page:{
            		pageNum:1,
            		pageSize:8
            	},
            	//弹层
            	showModal:false,
                tableTiT: [
                	{
	                	title:"序号",
						tit:"ORDER",
	                	width:80,
	                	align:'center',
	                	type:'index'
	                },
                    // {
                    //     title: '操作类型',
                    //     width:120,
                    //     align:'center',
                    //     key: 'czlx'
                    // },
                    {
                        title: '操作时间',
						tit:"ACTION_TIME",
                        align:'center',
                        key: 'czsj'
                    },
                    {
                        title: '操作人 ',
						tit:"OPERATOR",
                        align:'center',
                        key: 'czr'
                    },
                    // {
                    //     title: '对象ID',
                    //     align:'center',
                    //     key: 'dx_id'
                    // },
                    // {
                    //     title: '对象类型',
                    //     align:'center',
                    //     key: 'dxlx'
                    // },
                    {
                        title: '参数',
						tit:"PARAMETER",
                        align:'center',
                        key: 'cs',
						render:(h,p)=>{
                            let s = p.row.cs;
							if (s.length > 20) s = s.substring(0,17)+"...";
                            return  h('Poptip',
                                {
                                    props: {
                                        trigger:'hover',
                                        placement: 'top',
                                        content: p.row.cs,
                                    },
                                },
                                [
                                    h('div',s),
                                ]
                            )
						}
                    },
                    {
                        title: '耗时',
						tit:"TIME_CONSUMING",
                        align:'center',
                        key: 'zxsj',
						render:(h,p)=>{
                            return h('div',p.row.zxsj+" ms")
						}
                    },
                    {
                        title: '备注',
						tit:"COMMONT",
                        align:'center',
                        key: 'sm'
                    },
                    {
                        title: '方法',
						tit:"METHOD",
                        align:'center',
                        key: 'ff'
                    },
                    {
                        title: '操作结果',
						tit:"ACTION_RESULT",
                        key: 'jg',
                        width: 150,
                        align: 'center',
                    }
                ],
                tableData: [],
                //form表单
                formTop: {
                },
                //select
                cityList: [
                ],
                //收索
                datetime:[],
                czsjInRange:[],
                param:{
                	czsjInRange:[],
                	pageNum:1,
            		pageSize:8
                }
            }
        },
        watch: {
			czsjInRange:function(newQuestion, oldQuestion){
				this.param.czsjInRange = this.getdateParaD(newQuestion[0]) + ',' + this.getdateParaD(newQuestion[1])
			},
		},
        created(){
        	this.$store.commit('setCurrentPath', [{
                title: '首页',
            },{
                title: '系统管理',
            },{
                title: '日志管理',
            }]),
			this.tabHeight = this.getWindowHeight() - 260
            this.getmess()
        },
        methods: {
        	getmess(){
				var v = this
				v.SpinShow = true;
				this.$http.get(this.apis.DAILY.QUERY,{params:v.param}).then((res) =>{
					v.tableData = res.page.list
					v.pageTotal = res.page.total;
					v.SpinShow = false;
				})
			},
            pageChange(event){
        		var v = this
        		v.param.pageNum = event
        		v.findMessList()
//      		log(v.page)
        	},
        	findMessList(){
        		var v = this
        		v.SpinShow = true;
        		this.$http.get(this.apis.DAILY.QUERY,{params:v.param}).then((res) =>{
					log('数据',res)
					v.tableData = res.page.list
                    v.pageTotal = res.page.total;
					v.SpinShow = false;
				})
        	},

        }
    }
</script>
