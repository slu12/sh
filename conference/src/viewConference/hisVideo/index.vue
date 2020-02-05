<template>
  <div class="box_col">
    <div class="boxPadd_B box_row">
      <div class="boxMar_R">
        <DatePicker v-model="dateTime" type="daterange" @on-change="getTime"
                    split-panels placeholder="请选择时间" style="width: 200px"></DatePicker>
      </div>
      <div class="box_row_100 boxMar_R">
        <Input v-model="params.keyword" search enter-button placeholder="条件搜索"
               clearable
               @on-change="getRoom"
               @on-search="getRoom"/>
      </div>
    </div>
    <div class="box_col_autoY">
      <Row :gutter="16">
        <Col span="8" v-for="(it,index) in roomList">
          <video-card :item="it"></video-card>
        </Col>
      </Row>
    </div>
    <!--<div class="boxMar_T box_row rowRight">-->
      <!--<Page :total="100" />-->
    <!--</div>-->
  </div>
</template>

<script>
  import videoCard from './comp/cardItem'
  export default {
    name: "index",
    components:{videoCard},
    data() {
      return {
        roomList: [
          {
            _id: "b3c8b2cee5e74d69a0eef578ce31e6bc",
            cjsj: "2020-02-04 23:00:59",
            ly:'' ,
            token: '',
            kssj: "2020-02-05 23:00:00",
            name: "会议",
            zcr:{
              idcard: "111111",
              name: "9956",
              phone: "15827209956",
            },
            chr:{
              name: ["网系哦啊"],
              phone: ["13112121212"],
              uid: [100000],
            },
            ptr: null,
            zt: "20",
            record_url: "http://video.168car.net/20200204/23/1c0bcdf61d4c3395f7d67c8649da871c_20200204kzMbssVL.m3u8",
            room_name: "20200204kzMbssVL",
            startTime: "2020-02-04 23:05:46",
            stopTime: "2020-02-04 23:06:15",
            resourceId: "0t-jRBFRRFqDkP6FEGJg83Dv_VAMNAHTxLAKjyVxLrnRpDLY7Q6_kA5AsLkXYIu2d6ZuT1U4WlPSUrY6QFCP0gF_dhngpVQJG_wahHtXqakoHd3G6InbsmgNpnM7qL95T8UO6_vTvKPrZhu3WdtseuSSbKQD9izyE--NNBOqg4TgKiZEwqTXbyuEU9NRMPIcyOgMkR9sTKkQhOj5x68FaQeljJx4cvu17LwmesFSc7xQUnbBvWJBeKMM4CujFIQFgWF50yXy-gWI8zp1utzRRg",
            sid: "1c0bcdf61d4c3395f7d67c8649da871c",
          }
        ],
        dateTime:[
        ],
        params:{
          zt:"20",//,20
          times:"",
          keyword:"",
        }
      }
    },
    created() {
      // this.getRoom()
    },
    methods: {
      getRoom() {
        this.$http.get('/serverless/api/queryRooms',{params:this.params}).then(res => {
          this.roomList = res
        }).catch(err => {
        })
      },
      getTime(t){
        console.log(t);
        if(t[0] == 0){
          this.params.times = ""
        }else {
          this.params.times =t[0]+','+t[1]
        }
        this.getRoom()
      },
    }
  }
</script>

<style>

</style>
