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
      <div class="">
        <Button type="info" @click="AddRoom"> 预约会议</Button>
      </div>
    </div>
    <div class="box_col_autoY" style="position: relative">
      <Row :gutter="16">
        <Col span="8" v-for="(it,index) in roomList" :key="index">
          <video-card :item="it"></video-card>
        </Col>
      </Row>
      <img v-if="roomList.length == 0" :src="nodata" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%)" alt="">
    </div>
    <!--<div class="boxMar_T box_row rowRight">-->
    <!--<Page :total="100"/>-->
    <!--</div>-->
    <component :is="compName" @closeModal="closeModal"></component>
  </div>
</template>

<script>
  import videoCard from './comp/cardItem'
  import addroomModal from './comp/addRoom'

  import nodata from '@/assets/images/nodata.png'

  export default {
    name: "index",
    components: {videoCard, addroomModal},
    data() {
      return {
        nodata,
        compName: "",
        roomList: [
          // {
          //   "_id": "f6f73ade-c399-48f9-9ea1-73a1a51587a1",
          //   "cjsj": "2020-01-26 10:00:00",
          //   "ly": "武仲云",
          //   "token": "00691dd00e92095452bb2cb1c28cc42c1d5IAAA4dPPJkrE8CNVq39BkasYQ9J/FMZ6GTct72xF9L3RKjVihjeGk+ouEADvg/WpgWI3XgEAAQAAAAAA",
          //   "kssj": "2020-02-02 10:00:00",
          //   "zcr": {
          //     "phone": "15827209956",
          //     "name": "李仲裁员"
          //   },
          //   "chr": {
          //     "phone": ["15827209956", "18602714782"],
          //     "name": ["被申请人", "申请人"],
          //     "uid":[],
          //   },
          //   "name": "招商银行信用卡纠纷执行庭审",
          //   "ptr": "旁听人json",
          //   "zt": "01",
          //   "record_url": "",
          //   "room_name": "2020013100002"
          // }
        ],
        dateTime: [
        ],
        params: {
          zt: "00,01,10",//,20
          times: "",
          keyword: "",
        }
      }
    },
    created() {
        this.getRoom()
    },
    methods: {
      getRoom() {
        this.$http.get('/serverless/api/queryRooms', {params: this.params}).then(res => {
          this.roomList = res
        }).catch(err => {
        })
      },
      getTime(t) {
        console.log(t);
        if (t[0] == 0) {
          this.params.times = ""
        } else {
          this.params.times = t[0] + ',' + t[1]
        }
        this.getRoom()
      },
      AddRoom() {
        this.compName = "addroomModal"
      },
      closeModal() {
        this.compName = "";
        this.getRoom()
      }
    }
  }
</script>

<style scoped>

</style>
