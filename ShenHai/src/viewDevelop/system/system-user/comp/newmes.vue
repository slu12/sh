<template>
	<div>
		<Modal
      :v-model="showModal"
			height="600"
			width="900"
		    :closable='false'
		    :mask-closable="false"
		    :title='operate+"用户"'>
    		<Form
    			ref="addmess"
    			:model="addmess"
    			:rules="ruleInline"
    			:label-width="100"
    			:styles="{top: '20px'}">
	    		<div style="overflow: auto;height: 400px;width:800px">
					<Row>
						<Col span="12">
							<FormItem prop="jgdm" :label='$t("ORGANITION")+":"'>
								<Cascader @on-change="change" v-model="orgPath" change-on-select :data="orgTree"  :placeholder='$t("SELECT_ORGANIZATION")'  filterable clearable  ></Cascader>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem prop="zh" :label='$t("NAME")+":"'>
								<Input :readonly="!usermesType" type="text" v-model="addmess.zh" :placeholder='$t("USER_ACCOUNT")'>
								</Input>
							</FormItem>
						</Col>
						<Col span="12" v-if="showPsd">
							<FormItem prop="mm" :label='$t("PASSWORD")+":"'>
								<Input type="password" v-model="addmess.mm" :placeholder='$t("PASSWORD_TAB")'>
								</Input>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem prop="xm" :label='$t("NAME")+":"'>
								<Input type="text" v-model="addmess.xm" :placeholder='$t("NAME_TAB")'>
								</Input>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem :label='$t("GENDER")+":"'>
								<Select filterable clearable  v-model="addmess.xb">
									<Option value="1">{{$t("MALE")}}</Option>
									<Option value="0">{{$t("FEMALE")}}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem :label='$t("TYPE")+":"'>
								<Select filterable clearable  v-model="addmess.lx">
									<Option v-for="item in yhlxDict" :value="item.key">{{item.val}}</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem :label='$t("DUTY")+":"'>
								<Input type="text" v-model="addmess.zw" :placeholder='$t("DUTY_TAB")'>
								</Input>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem prop="sjh" :label='$t("TELPHONE_NUM")+":"'>
								<Input type="text" v-model="addmess.sjh" :placeholder='$t("PHONE_NUMBER")'>
								</Input>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem prop="zjhm" :label='$t("ID_NUMBER")+":"'>
								<Input type="text" v-model="addmess.zjhm" :placeholder='$t("ID_NUMBER_TAB")'>
								</Input>
							</FormItem>
						</Col>
					</Row>
	    		</div>
    		</Form>
		    <div slot='footer'>
		    	<Button type="default" @click="colse" style="color: #949494">{{$t("CANCEL")}}</Button>
	        	<Button type="primary" @click="AddDataListOk('addmess')">{{$t("DETERMINE")}}</Button>
		    </div>
		</Modal>
	</div>
</template>

<script>


	export default {
		name:'',
		data(){
			return {
				showModal:true,
				operate:'新增',
				//新增数据
            	addmess: {
                    zh: '',
                    xm:'',
                    mm:'',
                    lx:'',
                    xb:'0',
                    zw:'',
                    sjh:'',
                    zjhm:'',
                    jgdm:''
                },
                showPsd:false,
                ruleInline: {
                  zh: [
                      { required: true, message: '请输入用户账号', trigger: 'blur' }
                  ],
                  xm: [
                      { required: true, message: '请输入姓名', trigger: 'blur' }
                  ],
                  sjh:[
                      { required: true,message: "请输入手机号码", trigger: 'blur' }
                  ],
              	},
                yhlxDict:[],
                yhlxDictCode:'ZDCLK0003',
				orgList:[],
                treeValue:[],
                orgTree:[],
                orgPath:[],
			}
		},
		props:{
			usermesType:{
				type:Boolean,
				default:true
			},
			usermes:{
				type:Object,
				default:{}
			}
		},
		created(){
			this.fullcal()
            if(this.usermesType){
                this.showPsd = true;
            }else{
                this.addmess = this.usermes
                this.operate = '修改'
                this.getOrgPath(this.addmess.jgdm);
			}
			this.yhlxDict = this.$parent.yhlxDict
            this.getOrgTree();
        },
		methods:{
            change(vaule,selectedData){
                this.addmess.jgdm=selectedData[selectedData.length-1].value
                this.treeValue = vaule;
            },
			getOrgPath(orgCode){
                this.orgPath = [];
                this.$http.get(this.apis.FRAMEWORK.getOrgPath+'?orgCode='+orgCode).then((res)=>{
                    if (res.code == 200){
                        for(let r of res.result){
                            this.orgPath.push(r.jgdm);
                        }
					}
				})
			},
            getOrgTree(){
                this.$http.get(this.apis.FRAMEWORK.getCurrentOrgTree).then((res) =>{
                    this.orgTree = res.result
                })
            },
		    getOrgList(){
		        let v = this;
                v.$http.get(this.apis.FRAMEWORK.QUERY,{params:{pageSize:10000}}).then((res) =>{
                    if(res.code===200){
                        this.orgList = res.page.list;
                    }else{
                        v.$Message.error(res.message);
                    }
                }).catch((error) =>{
                    v.$Message.error('出错了');
                })
			},
			fullcal(){

			},
			colse(){
				var v = this
				v.$parent.compName = ''
		   	},
		   //确认添加新用户进行前台表单数据验证
            AddDataListOk(name){
            	var v = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
//                    	新增
                    	if(v.usermesType){
                    		v.$http.post(this.apis.USER.ADD,v.addmess).then((res) =>{
								if(res.code===200){
			                    	v.$Message.success('用户注册成功');
									v.$emit('listF',res)
								}else{
                                    v.$Message.error(res.message);
								}
							}).catch((error) =>{
								v.$Message.error('出错了');
							})
                    	}else{
                    	    delete v.addmess.mm;
                    		v.$http.post(this.apis.USER.CHANGE,v.addmess).then((res) =>{
								if(res.code===200){
									v.$Message.success("用户修改成功");
									v.$emit('listF',res)
								}else{
                                    v.$Message.error(res.message);
								}
							}).catch((error) =>{
								v.$Message.error('出错了');
							})
                    	}
                    } else {
                        v.$Message.error('请认真填写用户信息');
                    }
                })
            },
		}
	}
//15271928827
</script>

<style>
</style>
