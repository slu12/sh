<template>
  <div>
    <Modal
      width="980"
      v-model="showModal"
      :closable="!false"
      :mask-closable="false"
      :footer-hide="true"
      @on-visible-change="visible"
      class-name="vertical-center-modal">
      <div slot="header">
        <h2>预约会议</h2>
      </div>
      <Form ref="formInline" label-position="top"
            :model="formInline" :rules="ruleInline">
        <div class="box_row" style="height: 400px">
          <div style="width: 65%">
            <Row :gutter="16">
              <Col span="10">
                <FormItem label="会议名称" prop="name">
                  <Input v-model="formInline.name" placeholder="请填写会议名称"/>
                </FormItem>
              </Col>
              <Col span="10">
                <FormItem label="会议日期" prop="kssj">
                  <DatePicker v-model="formInline.kssj" type="date"
                              :options="options"
                              placeholder="选择日期" style="width: 100%"></DatePicker>
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem label="会议时间" prop="time">
                  <InputNumber :max="23" :min="0" style="width: 100%"
                               v-model="formInline.time"></InputNumber>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="8">
                <FormItem label="主持人姓名" prop="zcrname">
                  <Input v-model="formInline.zcrname" placeholder="主持人姓名"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="主持人手机号" prop="phone">
                  <Input v-model="formInline.phone" placeholder="主持人手机号"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="证件号码后6位" prop="idcard">
                  <Input v-model="formInline.idcard" placeholder="证件号码后6位"/>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
              </Col>
              <Col span="12">

              </Col>
            </Row>
            <FormItem prop="chr">
              <div class="box_row colCenter">
                <h3>添加参会人员 </h3> ( {{formInline.chr.length}} )
              </div>
            </FormItem>
            <che-item ref="cheItem" @addPre="addPre"></che-item>
          </div>
          <div class="box_row_1auto boxMar_L">
            <div class="box_col">
              <div>
                <h3>参会人员信息</h3>
              </div>
              <Table :columns="columns"
                     height="400"
                     :data="formInline.chr"></Table>

              </div>
          </div>
        </div>
      </Form>
      <div class="box_row rowRight boxMar_T">
        <Button @click="close" class="boxMar_R">关闭</Button>
        <Button type="info" @click="save">预约会议</Button>
      </div>
      <!---->
    </Modal>
  </div>
</template>

<script>
  import cheItem from './comp/chrItem'

  export default {
    name: "index",
    components: {
      cheItem
    },
    data() {
      return {
        showModal: true,
        columns:[
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '手机号',
            key: 'phone'
          },
          {
            title: '证件号',
            key: 'idcard'
          },
          {
            title: '操作',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'md-close-circle',
                    size: '20',
                    color:"#ed4014"
                  },
                  on: {
                    click: () => {
                      this.removeEvent(params.index)
                    }
                  }
                }),
              ]);
            }
          }
        ],
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        formInline: {
          "name": "",
          // zcr: {},
          "phone": "",
          "idcard": "",//证件号码后六位
          "zcrname": "",

          "kssj": "",//YYYY-MM-DD HH
          "time": 12,
          "chr": [
            // {
            //   "phone": "13112341234",
            //   "idcard": "123456",
            //   "name": "王晓明"
            // }
          ]
        },
        ruleInline: {
          name: [
            {required: true, message: '请填写会议名称', trigger: 'blur'}
          ],
          kssj: [
            {required: true, type: 'date', message: '请选择会议日期', trigger: 'blur'}
          ],
          time: [
            {required: true, type: "number", message: '请选择会议时间', trigger: 'blur'}
          ],
          zcrname: [
            {required: true, message: '主持人姓名', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '主持人手机号', trigger: 'blur'}
          ],
          idcard: [
            {required: true, min: 6, max: 6, message: '请填写证件号码后6位', trigger: 'blur'}
          ],
          chr: [
            {required: true, type: 'array', min: 1, message: '请选择参会人员', trigger: 'change'}
          ],
        }
      }
    },
    created() {

    },
    methods: {
      addPre(it) {
        var v = this
        if (this.formInline.chr.length == 0) {
          this.formInline.chr.push(it)
          v.$refs['cheItem'].formInlineC = {
            "phone": "",
            "idcard": "",
            "name": ""
          }
        } else {
          this.formInline.chr.forEach((its, index) => {
            if (it.phone == its.phone) {
              v.swal({
                title: "手机号码重复请重新填写！",
                type: 'warning'
              })
              v.$refs['cheItem'].formInlineC.phone = ""

            }
            if (index == this.formInline.chr.length - 1) {
              // this.formInline.chr.push(it)
              this.formInline.chr.splice(0, 0,it)
              v.$refs['cheItem'].formInlineC = {
                "phone": "",
                "idcard": "",
                "name": ""
              }
            }
          })
        }
      },
      removeEvent(index) {
        this.formInline.chr.splice(index, 1)
      },
      save() {
        var v = this
        let prs = JSON.parse(JSON.stringify(v.formInline))
        prs.zcr = {}
        prs.zcr.name = prs.zcrname
        prs.zcr.phone = prs.phone
        prs.zcr.idcard = prs.idcard
        prs.time
        if (prs.time.length == 1) {
          prs.time = '01'
        }
        prs.kssj = v.moment(prs.kssj).format("YYYY-MM-DD") + ' ' + prs.time

        delete prs.zcrname
        delete prs.phone
        delete prs.idcard
        delete prs.time
        console.log(JSON.stringify(prs));
        this.$refs["formInline"].validate((valid) => {
          if (valid) {
            this.$http.post('/serverless/api/addRoom', prs).then(res => {
              v.close()
            }).catch(err => {
              v.swal({
                title: err.data.message,
                type: 'error'
              })
              console.log('err', err);
            })
          }
        })
      },
      visible(val) {
        if (!val) {
          this.close()
        }
      },
      close() {
        console.log('关闭');
        this.$emit('closeModal')
      }
    }
  }
</script>

<style scoped>

</style>
