<!--订单查阅-->
<style lang="less">
    @import '../../../styles/common.less';
</style>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list-box{
    	width: 100%;
    	height: 100%;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
        margin: auto;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
	<div class="boxbackborder acdive">
		<Card>
			<Row class="margin-top-10" style='background-color: #fff;position: relative;'>
    			<span class="tabPageTit">
    				<Icon type="ios-paper" size='30' color='#fff'></Icon>
    			</span>
				<div style="height: 45px;line-height: 45px;">
					<div class="margin-top-10 box-row">
						<div class="titmess">
							<span>{{$t("ACTIVITY_MANAGEMENT")}}</span>
						</div>
						<div class="body-r-1 inputSty">
							<Input v-model="param.hdbtLike" :placeholder='$t("ACTIVITY_NAME")' style="width: 200px" @on-change="findMessList"></Input>
						</div>
						<div class="butevent">
							<Button type="primary" @click="findMessList()">
								<Icon type="md-search"></Icon>
								<!--查询-->
							</Button>
							<Button type="primary" @click="getDataList()">
								<Icon type="md-add"></Icon>
							</Button>
						</div>
					</div>
				</div>
			</Row>
			<Row>
				<Table ref="table"
						:height="tabHeight"
						:row-class-name="rowClassName"
						:columns="tableTiT"
						:data="data9"></Table>
			</Row>
			<Row class="margin-top-10 pageSty">
				<Page
						:total=pageTotal
						:current=param.pageNum
						:page-size=param.pageSize :page-size-opts=[8,10,20,30,40,50]  @on-page-size-change='(e)=>{param.pageSize=e;pageChange()}'
						show-total
						show-elevator show-sizer placement='top'
						@on-change='pageChange'></Page>
			</Row>
		</Card>
    	<component :is="compName"
    		:mess = 'choosedRow'
    		@colsemodal='colsemodal'></component>
	</div>
</template>
<script>


    import expandRow from './table-expand.vue';
	import i18nTabTit from '@/mixins/i18nTabTit'
    import addmess from './comp/addmess.vue'
	import mess from './comp/mess.vue'
    export default {
        components: {
        	expandRow,
        	addmess,
			mess
        },
        mixins:[i18nTabTit],
        data () {
            return {
            	Carousel:3,
            	SpinShow:true,
				tabHeight: 220,
            	compName: '',
            	//收索
                datetime:[],
                choosedRow:{},
                param:{
                	hdbtLike:'',
                	pageNum:1,
            		pageSize:8
                },
            	//弹层
            	pageTotal:1,
            	page:{
            		pageNum:1,
            		pageSize:8
            	},
            	showModal:false,
				tableTiT: [
                	{
                        title: '序号',
						tit:"ORDER",
                        width: 65,
                        align:'center',
                        type: 'index',
                    },
                    {
                        title: '活动标题',
						tit:"ACTIVITY_TITLE",
                        align:'center',
                        key: 'hdbt'
                    },
                    {
                        title: '内容/URL',
						tit:"CONTENT",
                        align:'center',
                        key: 'url',
                        render: (h, params) => {
                            return h('a', {
                                attrs: {
                                    href: params.row.url
                                }
                            },params.row.url)
                        }
                    },
					 {
						 title: '活动类型',//微信--自能站牌
						 tit:"ACTIVITY_STYLE",
						 align:'center',
						 key: 'hdlx',
						 render: (h, params) => {
							 let lx = '';
							 switch(params.row.hdlx){
									case '00':
										lx = '微信';
										break;
									case '01':
								 default:
									 lx = '智能站牌'
									 break;
								}
							 return h('div',lx);
						 }
					 },
					 {
						 title: '位置',//微信--自能站牌
						 tit:"POSITION",
						 align:'center',
						 key: 'wz',
						 render: (h, params) => {
							 let s = '';
							 switch(params.row.wz){
									case '00':
										s = '上';
										break;
									case '01':
									    s = '中';
                                        break;
									case '02':
									    s = '下';
                                        break;
								 default:
                                     s = '上';
									 break;
								}
							 return h('div',s);
						 }
					 },
                    // {
                    //     title: '创建时间',
                    //     align:'center',
                    //     key: 'cjsj'
                    // },
                    {
	                	title:'附件',
						tit:"ACCESSORY",
	                    type: 'expand',
	                    width: 65,
	                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                   row: params.row
                            }
                        })
                    }
                    },{
						title: '操作',
						tit:"OPERATION",
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
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
											if(params.row.filePaths == null){
												params.row.filePaths = ''
											}
										    this.choosedRow = params.row;
											this.compName = 'mess'
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
                                        	this.remove(params.row.hdId)
										}
									}
								})
							]);
						}
					}
                ],
                data9: []
            }
        },
        watch:{
        	defaultList:function(n,o){
        	}
        },
        created(){
        	this.$store.commit('setCurrentPath', [{
                title: '首页',
            },{
                title: '系统管理',
            },{
                title: '活动管理',
            }]),
			this.tabHeight = this.getWindowHeight() - 290
			this.SpinShow = false;
     		this.getmess()
        },
        methods:{
        	getmess(){
				var v = this
				v.SpinShow = true;
				this.$http.get(this.apis.ADVERTISING.QUERY).then((res) =>{
					v.data9 = res.page.list
					v.pageTotal = res.page.total
					v.SpinShow = false;
				})
			},
        	changeTime(val){
        	},
        	pageChange(event){
        		var v = this
        	},
        	findMessList(){
        		var v = this
        		v.SpinShow = true;
				this.$http.get(this.apis.ADVERTISING.QUERY,{params:this.param}).then((res) => {
					 v.data9 = res.page.list
					 v.pageTotal = res.page.total
					 v.SpinShow = false;
				 })
        	},
        	remove(id){
        		this.util.del(this,this.apis.ADVERTISING.DELE,[id],()=>{
                    this.getmess();
				});
        	},
        	getDataList() {
				var v = this
				this.choosedRow = null;
				v.compName = 'addmess'
				v.choosedRow = null
			},
			colsemodal() {
				this.compName = ''
			},
        }
    }
</script>
