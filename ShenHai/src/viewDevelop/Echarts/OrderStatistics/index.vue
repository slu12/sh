<style lang="less">
	@import '../../../styles/common.less';
</style>
<!--角色管理-->
<template>
	<div class="boxbackborder">
		<Card>
			<Row class="margin-top-10" style='background-color: #fff;position: relative;'>
				<span class="tabPageTit">
    				<Icon type="ios-paper" size='30' color='#fff'></Icon>
    			</span>
				<div style="height: 45px;line-height: 45px;">
					<div class="margin-top-10 box-row">
						<div class="titmess">
							<span>订单统计</span>
						</div>
						<div class="body-r-1 inputSty">
							<DatePicker v-model="param.kssj" :options="dateOpts" type="date" placeholder="请输入开始时间" ></DatePicker>
							<DatePicker v-model="param.jssj" :options="dateOpts" type="date"  placeholder="请输入结束时间"  ></DatePicker>
							<Cascader style="width:300px;float: right;margin-top: 7px;margin-left: 4px;padding-right: 10px;" @on-change="change" change-on-select :data="orgTree"  placeholder="请选择用船单位"  filterable clearable  ></Cascader>
						</div>
						<div class="butevent">
							<Button type="primary" @click="getData()">
								<Icon type="md-search"></Icon>
							</Button>
							<Button type="primary" size="large" @click="v.util.exportData(v,'订单统计')">
								<Icon type="ios-download-outline"></Icon>导出
							</Button>
						</div>
					</div>
				</div>
			</Row>
			<Row style="position: relative;">
				<Table ref="table"  :height="tabHeight" :row-class-name="rowClassName" :columns="tableColumns" :data="pageData"></Table>
			</Row>
		</Card>
	</div>
</template>

<script>
    import mixins from '@/mixins'

    Date.prototype.format = function(format)
    {
        var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(),    //day
            "h+" : this.getHours(),   //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
            "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
            (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length==1 ? o[k] :
                    ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }
    export default {
        name: 'char',
        mixins: [mixins],
        components: {
        },
        data() {
            return {
                v:this,
                SpinShow: true,
                tabHeight: 220,
                dateOpts: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            }
                        },
                        {
                            text: '三天前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 3);
                                return date;
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            }
                        }
                    ]
                },
                tableColumns: [
                    {
                        title:"序号",
                        width:80,
                        align:'center',
                        type:'index'
                    },
                    {
                        title: '用船单位',
                        align:'center',
                        key: 'jgmc'
                    },
                    {
                        title: '订单总数',
                        align:'center',
                        key: 'ddzsCount'
                    },
                    {
                        title: '已审核',
                        align:'center',
                        key: 'yshCount'
                    },
                    {
                        title: '未审核',
                        align:'center',
                        key: 'wshCount'
                    },
                    {
                        title: '已取消',
                        align:'center',
                        key: 'yqxCount'
                    },
                    {
                        title: '驾驶员确认',
                        align:'center',
                        key: 'dsjCount'
                    },
                    {
                        title: '队长确认',
                        align:'center',
                        key: 'ddzCount'
                    },
                    {
                        title: '财务确认',
                        align:'center',
                        key: 'cwCount '
                    }
                ],
                pageData: [],
                param: {
                    sjxmLike: '',
                    total: 0,
                    jgdm:'',
                },
                treeValue:[],
                orgTree:[],
            }
        },
        created() {
            this.param.kssj  = this.getTodayDate();
            this.param.jssj  = this.getTodayDate();
            this.$store.commit('setCurrentPath', [{title: '首页',}, {title: '数据报表',}, {title: '安全驾驶',}])
            this.tabHeight = this.getWindowHeight() - 295
            this.getData()
            this.getOrgTree();
        },
        methods: {
            getOrgTree(){
                this.$http.get(this.apis.FRAMEWORK.GET_TREE_Node).then((res) =>{
                    this.orgTree = res.result
                })
            },
            change(vaule,selectedData){
                this.param.jgdm=selectedData[selectedData.length-1].value
                this.treeValue = vaule;
            },
            getTodayDate(){
                let now = new Date();
                return now.format("yyyy-MM-dd");
            },
            getData(){
                let startTime = this.param.kssj;
                let endTime = this.param.jssj;
                if (typeof startTime === 'object'){
                    this.param.kssj = startTime.format('yyyy-MM-dd');
                }
                if (typeof endTime === 'object'){
                    this.param.jssj = endTime.format('yyyy-MM-dd');
                }
                this.$http.post(this.apis.ORDER.TJ,this.param).then((res) =>{
                    if (res.code == 200){
                        this.pageData = res.result;
                    }
                })
            },
        }
    }
</script>
