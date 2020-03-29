<template>
  <div>
    <Modal
      v-model="showModal"
      width='80%'
      :closable='true'
      :mask-closable="true"
      :title="'新增电子围栏'"
      @on-visible-change="visible"
      :footer-hide="!true"
    >
      <div>
        <Form
          ref="param"
          :model="param"
          :rules="ruleInline"
          label-position="top"
        >
          <Row :gutter="12">
            <Col span="8">
              <FormItem label='围栏名称' prop="wlmc">
                <Input type="text"
                       v-model="param.wlmc"
                       placeholder='请输入电子围栏名称'/>
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label='MMSI'>
                <Select
                  v-model="param.mmsi"
                  multiple
                  filterable
                  remote
                  :remote-method="remoteMethod2"
                  :loading="loading2">
                  <Option v-for="(option, index) in options2" :value="option.clId" :key="index">{{option.mmsi}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <FormItem prop="dlxxzb">
          <div style="height: 500px">
            <my-map ref='maps' :mapDot="mapDot" @choosePoint="choosePoint"></my-map>
          </div>
          </FormItem>
        </Form>
      </div>
      <div slot='footer'>
        <Button type="primary" size="large" @click="close" style="">
          取消
        </Button>
        <Button type="success"
                size="large"
                style="margin: 0 8px;"
                @click="finish">保存电子围栏</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import myMap from '@/viewDevelop/map/mapBK.vue'

  export default {
    name: "index",
    components: {
      myMap
    },
    data() {
      return {
        showModal: true,
        mmsi: '',
        mapDot: [],
        param: {
          cjsjInRange: '',
          cphLike: '',
          pageNum: 1,
          pageSize: 8,
          dlxxzb: '',
          clIds: '',
          wlmc: '',
          mmsi:[]
        },
        ruleInline: {
          wlmc: [
            {required: true, message: '请输入围栏名称', trigger: 'blur'}
          ],
          mmsi: [
            {required: true, type: 'array', min: 1, message: '请选择 MMSi ', trigger: 'change'},
          ],
          dlxxzb:[
            {required: true, message: '请创建电子围栏', trigger: 'blur'}
          ]
        },
        mmsiList: [],
        loading2: false,
        options2: []
      }
    },
    created() {
      this.getCarTree()//获取终端数据
    },
    methods: {
      getCarTree(mmsi) {
        this.$http.post('/api/cl/getCbForDzwl', {pageNum: 1, pageSize: 99999999}).then((res) => {
          this.mmsiList = res.result
        }).catch((error) => {
        })
      },
      choosePoint(points) {
        console.log(points);
        this.param.dlxxzb = '';
        for (let r of points) {
          this.param.dlxxzb += r.lng + "," + r.lat + ";";
        }
        console.log(this.param.dlxxzb);
      },
      remoteMethod2(query) {
        if (query !== '') {
          this.loading2 = true;
          setTimeout(() => {
            this.loading2 = false;
            this.options2 = this.mmsiList.filter(item => {
              return item.mmsi.indexOf(query.toUpperCase()) != -1
            });
          }, 200);
        } else {
          this.options2 = [];
        }
      },

      cancelRali() {
        this.RootShow = !this.RootShow
      },
      finish() {
        this.$refs['param'].validate((valid) => {
          if (valid) {
            this.saveDzwl();
          } else {
            this.$Message.error('请将数据填写完整');
          }
        })
      },
      saveDzwl() {
        var v = this
        this.$http.post(this.apis.DZWL.ADD, {wlmc: v.param.wlmc, dlxxzb: v.param.dlxxzb}).then((res) => {
          if (res.code === 200) {
            // this.fanceId = res.message;
            this.save(res.message);//围栏绑定终端
          }
        })
      },
      save(wlID) {
        console.log('savedz');
        console.log(this.param.mmsi);
        this.$http.post(this.apis.DZWL.setCarsDzwl, {
          wlid: wlID,
          carIds: this.param.mmsi.toString()
        }).then((res) => {
          if (res.code === 200) {
            this.param.mmsi = null
          } else {
            this.$Message.error(res.message);
          }
          this.close()
        })
      },
      visible(val) {
        if (!val) {
          this.colse()
        }
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>
