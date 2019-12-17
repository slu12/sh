<template>
  <div class="chPagerBoxSty box_col">
    <div class="box_col_100" v-if="boxSpet==0">
      <div class="centerbox">
        <div class="pagerTit">
          充值
        </div>
        <div class="payType box_row rowAuto colItemCenter">
          <div class="title">
            充值方式：
          </div>
          <div class="typItem box_row rowCenter colItemCenter"
               :class="payTyp=='10'?'typItemSel':''"
               @click="payTyp = '10'">
            <img :src="bankImg" alt="">
            <div class="label">
              银行卡
            </div>
          </div>
          <div class="typItem box_row rowCenter colItemCenter"
               :class="payTyp=='20'?'typItemSel':''"
               @click="payTyp = '20'">
            <img :src="wxImg" alt="">
            <div class="label">
              支付宝
            </div>
          </div>
          <div class="typItem box_row rowCenter colItemCenter"
               :class="payTyp=='30'?'typItemSel':''"
               @click="payTyp = '30'">
            <img :src="zfbImg" alt="">
            <div class="label">
              微信
            </div>
          </div>
        </div>
        <div class="payNo">
          <div class="title">
            充值金额：
          </div>
          <div class="moneyLine box_row rowBetween">
            <div class="moneyItem"
                 :class="payMoney==100?'SelMoneyItem':''"
                 @click="payMoney=100">
              ¥100
            </div>
            <div class="moneyItem"
                 :class="payMoney==200?'SelMoneyItem':''"
                 @click="payMoney=200">
              ¥200
            </div>
            <div class="moneyItem"
                 :class="payMoney==500?'SelMoneyItem':''"
                 @click="payMoney=500">
              ¥500
            </div>
          </div>
          <div class="moneyLine box_row rowBetween">
            <div class="moneyItem"
                 :class="payMoney==1000?'SelMoneyItem':''"
                 @click="payMoney=1000">
              ¥1000
            </div>
            <div class="moneyItem"
                 :class="payMoney==2000?'SelMoneyItem':''"
                 @click="payMoney=2000">
              ¥2000
            </div>
            <div class="moneyItem"
                 :class="payMoney==5000?'SelMoneyItem':''"
                 @click="payMoney=5000">
              ¥5000
            </div>
          </div>

          <div class="zdyMoney box_row colItemTop">
            <div class="title">
              其它
            </div>
            <div class="moneyNumber box_row_100">
              <InputNumber :min="100" v-model="payMoney"></InputNumber>
            </div>
          </div>
        </div>
        <div class="submit" @click="payMoneyEvent">
          确定充值
        </div>
      </div>
    </div>
    <div class="box_col_auto orderMess" v-else-if="boxSpet == 1">
      <div class="orderTit">
        ¥{{orderMess.amount}}
        <div class="labSty">
          请及时完成付款，并点击付款完成（有效时间30分钟）
        </div>
        <div class="timeSty">
          28:58:00
        </div>
      </div>

      <div class="orderBox">
        <div class="lineBox box_row rowBetween colItemCenter">
          <div class="lineName">
            订单状态
          </div>
          <div class="lineVal typ">
            等待付款{{orderMess.zt}}
          </div>
        </div>
        <div class="lineBox box_row rowBetween colItemCenter">
          <div class="lineName">
            订单编号
          </div>
          <div class="lineVal">
            {{orderMess.orderid}}
          </div>
        </div>
        <div class="lineBox box_row rowBetween colItemCenter">
          <div class="lineName">
            创建时间
          </div>
          <div class="lineVal">
            {{orderMess.cjsj}}
          </div>
        </div>
      </div>

      <div class="PayTit box_row colItemBottom">
        <div class="tit">
          付款方式
        </div>
        <div>
          点击内容复制
        </div>
      </div>

      <div v-if="orderMess.bklx=='10'" class="cardBox zfb">
        <img src="./file/zfb.png" alt="">
        <div class="box_row colItemBottom itemLine">
          <div class="nameTit">
            姓名
          </div>
          <div class="nameVal">
            {{orderMess.bkhm}}
          </div>
        </div>
        <div class="box_row colItemBottom itemLine">
          <div class="nameTit">
            支付宝账号
          </div>
          <div class="nameVal">
            {{orderMess.zhkh}}
          </div>
        </div>
      </div>

      <div v-else-if="orderMess.bklx=='20'" if="orderMess.bklx=='10'" class="cardBox wx">
        <img src="./file/wx.png" alt="">
        <div class="box_row colItemBottom itemLine">
          <div class="nameTit">
            姓名
          </div>
          <div class="nameVal">
            {{orderMess.bkhm}}
          </div>
        </div>
        <div class="box_row colItemBottom itemLine">
          <div class="nameTit">
            微信账号
          </div>
          <div class="nameVal">
            {{orderMess.zhkh}}
          </div>
        </div>
      </div>

      <div v-else-if="orderMess.bklx=='30'" class="cardBox bank">
        <img src="./file/bank.png" alt="">
        <div class="box_row colItemBottom itemLine">
          <div class="nameTit">
            姓名
          </div>
          <div class="nameVal">
            {{orderMess.bkhm}}
          </div>
        </div>
        <div class="box_row colItemBottom itemLine">
          <div class="nameTit">
            银行名
          </div>
          <div class="nameVal">
            {{orderMess.qrcode}}
          </div>
        </div>
        <div class="box_row colItemBottom itemLine">
          <div class="nameTit">
            支行
          </div>
          <div class="nameVal">
            {{orderMess.zhmc}}
          </div>
        </div>
        <div class="box_row colItemBottom itemLine">
          <div class="nameTit">
            银行卡号
          </div>
          <div class="nameVal">
            {{orderMess.zhkh}}
          </div>
        </div>
      </div>

      <div class="altTxtBox">
        <div>
          1.禁止以支付宝或微信转账到银行卡的方式付款，请用网银或手机银行；
        </div>
        <div>
          2.平台不会自动扣款，请线下用网银或手机银行转账到卖家实名账户。
        </div>

      </div>

      <div class="payEvent box_row rowBetween">
        <div class="cancelBut box_row_100 butItem" @click="boxSpet=0">
          取消订单
        </div>
        <div class="subMitBut box_row_100 butItem">
          付款完成
        </div>
      </div>
      <div class="payEvent box_row rowBetween">
        <div class="cancelBut box_row_100 butItem" @click="boxSpet=0">
          申请仲裁
        </div>
      </div>
    </div>
    <!--ZCbox  申请仲裁-->
    <div class="box_col_auto ZCbox" v-else-if="boxSpet == 2">
      <div class="pagerTit">
        申请仲裁
      </div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <div class="formBox">
          <FormItem prop="txt">
            <Input v-model="formInline.txt" type="textarea"
                   :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入您的文字资料"/>
          </FormItem>
          <FormItem prop="password">
            <div class="box_row rowBetween">
              <div class="upFileBox" :style="{borderColor:formInline.fileUrl[0]!=''?'rgba(255,255,255,0)':''}">
                <up-file @handleSuccess="(url)=>{handleSuccess(0,url)}">
                  <img v-if="formInline.fileUrl[0]!=''" :src="formInline.fileUrl[0]"
                       style="width: 253px;height: 253px;border-radius: 10px;" alt="">
                </up-file>
              </div>
              <div class="upFileBox" :style="{borderColor:formInline.fileUrl[0]!=''?'rgba(255,255,255,0)':''}">
                <up-file @handleSuccess="(url)=>{handleSuccess(1,url)}">
                  <img v-if="formInline.fileUrl[1]!=''" :src="formInline.fileUrl[1]"
                       style="width: 253px;height: 253px;border-radius: 10px;" alt="">
                </up-file>
              </div>
              <div class="upFileBox" :style="{borderColor:formInline.fileUrl[0]!=''?'rgba(255,255,255,0)':''}">
                <up-file @handleSuccess="(url)=>{handleSuccess(2,url)}">
                  <img v-if="formInline.fileUrl[2]!=''" :src="formInline.fileUrl[2]"
                       style="width: 253px;height: 253px;border-radius: 10px;" alt="">
                </up-file>
              </div>
            </div>
          </FormItem>
        </div>
        <FormItem prop="phone">
          <div class="phoneBox box_row colItemCenter">
            <div class="mask"></div>
            <div class="titName">
              联系方式：
            </div>
            <Input v-model="formInline.phone" type="number" placeholder="请留下您的联系方式" class="box_row_100 inputBox" />
          </div>
        </FormItem>
      </Form>

      <div class="altLabBox">
        <div>
          1.请提交您的相关图像证据材料（可选）
        </div>
        <div>
          2.请确保图片清晰，无水印，无污渍
        </div>
        <div>
          3.点击图片可重新上传
        </div>
      </div>

      <div class="subBut">
        提交
      </div>
    </div>

  </div>
</template>

<script>
  import zfbImg from './file/zfb.png'
  import wxImg from './file/wx.png'
  import bankImg from './file/bank.png'
  import axios from 'axios';
  import nonce from 'nonce-str';
  import qs from 'qs';
  import upFile from './comp/upFileBox'

  export default {
    name: "index",
    components: {
      upFile
    },
    data() {
      return {
        zfbImg, wxImg, bankImg,
        axiosUrl: "",
        token: "",
        http: "",

        boxSpet: 2,

        payTyp: '10',
        payMoney: 100,
        urlParams: {},

        endTime: "",
        IntervalTime: null,
        orderMess: {
          "amount": "100",
          "bkhm": "测试商",
          "bklx": "20",
          "cjsj": "2019-11-15 04:25:06",
          "cssj": "2019-11-15 04:55:06",
          "orderid": "644875543887478784",
          "qrcode": null,
          "yhmc": null,
          "zhkh": "微信账号",
          "zhmc": null,
          "zt": "00"
        },
        //----------------------------------
        getImg: 'http://mt.xxpt123.com:81/img/',
        formInline: {
          text: "",
          fileUrl: {
            '0': '',
            '1': '',
            '2': '',
          },
          phone: ''
        },
        ruleInline: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.urlParams = JSON.parse(sessionStorage.getItem('urlParams'))
      // id             商户ID
      // token          token验证码
      // aip            接口ip
      // aport          接口端口
      this.setAxios()
    },
    methods: {
      payMoneyEvent() {
        this.http.post('/merapi/page/unifiedorder', {
          payid: this.urlParams.id,
          amount: this.payMoney,
          bklx: this.payTyp,
          nonce: nonce(32)
        }).then(res => {
        })
        this.boxSpet = 1
        setInterval(() => {
          let x = this.moment().utc().valueOf() - this.moment().utc().valueOf();
          let a = this.moment(x).utc().format("HH:mm:ss")
          this.endTime = a
        }, 1000)
      },
      setAxios() {
        try {
          this.axiosUrl = "http://" + this.urlParams.aip + ":" + this.urlParams.aport
          this.token = this.urlParams.token
        } catch (e) {
        }

        let httpInstance = axios.create({
          baseURL: this.axiosUrl,
          timeout: 30000,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': this.token
          },
          withCredentials: true
        });

        httpInstance.interceptors.request.use((config) => {
          let headers = config.headers;
          let contentType = headers['Content-Type'];
          if (contentType == 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(config.data);
            try {
              // 如果是数组对象，将转换出来的数组字符串中的[]关键字替换，这样方便后台接收数据
              config.data = config.data.replace(/(%5B\d%5D)/g, '');
            } catch (e) {

            }
          }
          return config;
        })

        this.http = httpInstance
      },
      handleSuccess(index, url) {
        console.log(this.formInline.fileUrl[index])
        this.formInline.fileUrl[index] = this.getImg + url
        console.log(this.formInline.fileUrl[index])
      }
    }
  }
</script>

<style lang="less">
  @import "./css/pay";
  @import "./css/orderMess";
  @import "./css/zcSty";

  .chPagerBoxSty {
    background: linear-gradient(0deg, rgba(0, 155, 183, 1) 0%, rgba(0, 104, 183, 1) 100%);
  }
</style>
