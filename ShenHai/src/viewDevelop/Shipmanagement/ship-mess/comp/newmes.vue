<template>
      <div>
            <Modal
                    v-model="showModal"
                    width='900'
                    :closable='false'
                    :mask-closable="false"
                    :title="operate+'船舶'">
                  <Form
                          ref="addmess"
                          :model="addmess"
                          :rules="ruleInline"
                          :label-width="130"
                          :styles="{top: '20px'}">
                        <div style="overflow: auto;">
                              <Row>
                                    <Col span="12">
                                          <FormItem prop="MMSI" label='名称：'>
                                                <Input type="text" v-model="addmess.shipname"
                                                       placeholder="请设置 名称"></Input>
                                          </FormItem>
                                    </Col>
                                <Col span="12">
                                          <FormItem prop="MMSI" label=' MMSI：'>
                                                <Input type="text" v-model="addmess.mmsi" :readonly="!messType"
                                                       placeholder="请设置 MMSI"></Input>
                                          </FormItem>
                                    </Col>
                                    <Col span="12">
                                          <FormItem label='类型：'>
                                                <Select filterable clearable label-in-value @on-change="checkLX" v-model="addmess.shiptype">
                                                      <Option v-for="cx in cxDict" :value="cx.key">{{cx.val}}</Option>
                                                </Select>
                                          </FormItem>
                                    </Col>
                                    <Col span="12">
                                          <FormItem prop="zkl" label='呼号：'>
                                            <Input type="text" v-model="addmess.callsign"
                                                   placeholder="请设置呼号"></Input>
                                          </FormItem>
                                    </Col>
                                    <Col span="12">
                                          <FormItem prop="sjxm" label='IMO：'>
                                            <Input type="text" v-model="addmess.imo"
                                                   placeholder="请设置 IMO"></Input>
                                          </FormItem>
                                    </Col>
                                    <Col span="12">
                                          <FormItem prop="zt" label='长度(m)：'>
                                            <Input type="text" v-model="addmess.length"
                                                   placeholder="请设置 长度"></Input>
                                          </FormItem>
                                    </Col>
                                    <Col span="12">
                                          <FormItem prop="zdbh" label='宽度(m)：'>
                                            <Input type="text" v-model="addmess.breadth"
                                                   placeholder="请设置 宽度"></Input>
                                          </FormItem>
                                    </Col>
                                    <Col span="12">
                                          <FormItem prop="zdbh" label='船籍：'>
                                                <Input type="text" v-model="addmess.nationality"
                                                       placeholder="请输入船籍"></Input>
                                          </FormItem>
                                    </Col>
                                <Col span="12">
                                  <FormItem label='型深：'>
                                    <Input type="text" v-model="addmess.xs"
                                           placeholder="请输入型深"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label='船舶识别号：'>
                                    <Input type="text" v-model="addmess.cbsbh"
                                           placeholder="请输入 船舶识别号"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label='登记号码：'>
                                    <Input type="text" v-model="addmess.djhm"
                                           placeholder="请输入 登记号码"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label='总吨位：'>
                                    <Input type="text" v-model="addmess.zdw"
                                           placeholder="请输入 总吨位"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label='净吨：'>
                                    <Input type="text" v-model="addmess.jd"
                                           placeholder="请输入 净吨"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label='主机种类：'>
                                    <Input type="text" v-model="addmess.zjzl"
                                           placeholder="请输入 主机种类"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label='主机数量：'>
                                    <Input type="text" v-model="addmess.zjsl"
                                           placeholder="请输入 主机数量"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label=' 主机总功率：'>
                                    <Input type="text" v-model="addmess.zjgl"
                                           placeholder="请输入 主机总功率"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label='造船厂：'>
                                    <Input type="text" v-model="addmess.zcc"
                                           placeholder="请输入 造船厂"></Input>
                                  </FormItem>
                                </Col>
                                <Col span="12">
                                  <FormItem label=' 建成日期：'>
                                    <Input type="text" v-model="addmess.jcrq"
                                           placeholder="请输入  建成日期"></Input>
                                  </FormItem>
                                </Col>
                              </Row>
                        </div>
                  </Form>
                  <div slot='footer'>
                        <Button type="default" @click="colse" style="color: #949494">取消</Button>
                        <Button type="primary" @click="AddDataListOk('addmess')">确定</Button>
                  </div>
            </Modal>
      </div>
</template>

<script>


    export default {
        name: '',
        data() {
            return {
                showModal: true,
                operate: '新增',
                editMode: false,
                //新增数据
                addmess: {
                  mmsi:'', // MMSI
                  shipname:'', // 名称
                  callsign:'', // 呼号
                  imo:'', // imo
                  shiptype:'46', //船舶类型
                  shiptypename:'货船', //船舶类型名称
                  length:'', //长度
                  breadth:'', //宽度
                  nationality:'', // 船籍
                  xs:'', // 型深
                  cbsbh :'', // 船舶识别号
                  djhm:'', // 登记号码
                  zdw :'', // 总吨位
                  jd :'', // 净吨
                  zjzl :'', // 主机种类
                  zjsl :'', // 主机数量
                  zjgl:'', // 主机总功率
                  zcc :'', // 造船厂
                  jcrq :'', // 建成日期
                },
                ruleInline: {
                    // cph: [
                    //     {required: true, message: '请输入车牌号', trigger: 'blur'}
                    // ],
                    // zkl: [
                    //     { required: true, message: '请输入载客量', trigger: 'blur' }
                    // ],
                },
                deviceList: [],//终端设备
                drivers: [],//驾驶员
                fleetList: [],
                clztDict: [],//车辆状态
                clztDictCode: 'ZDCLK0016',
                cxDict: [],//车量型号
                cxDictCode: 'CBLX',
                zws: [5, 7, 11, 20, 32, 45, 48],
            }
        },
        filters:{
            // zdLx:function(val){
            //     let a = this.dictUtil.getValByCode(this, 'ZDCLK1017', val)
            //     return a
            // }
        },
        props: {
            messType: {
                type: Boolean,
                default: true
            },
            mess: {
                type: Object,
                default: {}
            },
            derMess: {
                type: Object,
                default: {}
            }
        },
        created() {
            if (!this.messType) {
                this.operate = '编辑';
                this.editMode = true;
                if (this.mess.zdbh == null) {
                    this.mess.zdbh = ''
                }
                this.addmess = JSON.parse(JSON.stringify(this.mess))
            }
            this.getDrivers();
            this.getDict();
            this.getFleetList();
            this.getDeviceList();
        },
        methods: {
            checkLX(a){
              console.log(a)
              this.addmess.shiptypename = a.label
            },
            zdLx(val){
                    let a = this.dictUtil.getValByCode(this, 'ZDCLK1017', val)
                    return a
            },
            getDeviceList() {//获取终端编号
                let v = this;
                v.$http.post(this.apis.ZDGL.SXQUERY,{'zdbh': v.mess.zdbh}).then((res) => {
                    if (res.code === 200) {
                        if (res.result == undefined) {
                            res.result = []
                        }
                        this.deviceList = res.result;
                        // if (!this.messType) {
                        //     console.log('**',v.mess);
                        //
                        //     this.deviceList.push({'zdbh': v.mess.zdbh,'zdLx':v.mess.zdLx})
                        // }
                    }
                })
            },
            getFleetList() {
                let v = this;
                v.$http.get(this.apis.CD.QUERY, {params: {pageSize: 10000}}).then((res) => {
                    if (res.code === 200) {
                        this.fleetList = res.page.list;
                    }
                })
            },
            getDriverName() {
                for (let r of this.drivers) {
                    if (r.sfzhm === this.addmess.sjId) {
                        this.addmess.sjxm = r.xm;
                    }
                }
            },
            getDict() {
                this.clztDict = this.dictUtil.getByCode(this, this.clztDictCode);
                this.cxDict = this.dictUtil.getByCode(this, this.cxDictCode);
            },
            getDrivers() {
                let v = this;
                v.$http.get(this.apis.JSY.QUERY, {params: {pageSize: 1000}}).then((res) => {
                    if (res.code === 200) {
                        v.drivers = res.page.list;
                        // if(v.derMess.sjId!=null&&!v.messType){
                        // 	v.drivers.push({'xm':v.derMess.sjxm,'sfzhm':v.derMess.sjId})
                        // }
                    }
                })
            },
            colse() {
                var v = this
                v.$parent.compName = ''
            },
            //确认添加新用户进行前台表单数据验证
            AddDataListOk(name) {
                var v = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.getDriverName();
//                    	新增
                        if (v.messType) {
                            v.$http.post(this.apis.CLGL.ADD, v.addmess).then((res) => {
                                if (res.code === 200) {
                                    v.$Message.success('车辆添加成功');
                                } else {
                                    v.$Message.error('车辆添加创建失败');
                                }
                                v.$parent.getPageData()
                                v.$parent.compName = ''
                            })
                        } else {
                            delete v.addmess.clDzwlCl;
                            delete v.addmess.clDzwl;
                            v.$http.post(this.apis.CLGL.CHANGE, v.addmess).then((res) => {
                                if (res.code === 200) {
                                    v.$Message.success('车辆修改成功');
                                } else {
                                    v.$Message.error('车辆修改失败');
                                }
                                v.$parent.getPageData()
                                v.$parent.compName = ''
                            })
                        }
                    } else {
                        v.$Message.error('请认真填写信息!');
                    }
                })
            },
        }
    }
</script>

<style>
</style>
