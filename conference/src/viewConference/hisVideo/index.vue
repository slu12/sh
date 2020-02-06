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
    <div class="box_col_autoY" style="position: relative">
<!--      <Row :gutter="16">-->
<!--        <Col span="8" v-for="(it,index) in roomList">-->
<!--          <video-card :item="it"></video-card>-->
<!--        </Col>-->
<!--      </Row>-->

      <Row :gutter="16">
        <Col span="23">
          <Table border :columns="columns1" :data="roomList"></Table>
        </Col>
      </Row>
      <img v-if="roomList.length == 0" :src="nodata" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%)" alt="">

    </div>
    <!--<div class="boxMar_T box_row rowRight">-->
      <!--<Page :total="100" />-->
    <!--</div>-->
  </div>
</template>

<script>
  import videoCard from './comp/cardItem'
  import nodata from '@/assets/images/nodata.png'

  export default {
    name: "index",
    components:{videoCard},
    data() {
      return {
        nodata,
        roomList: [],
        dateTime:[
        ],
        columns1: [
            {
                title: '#',
                width:60,
                type: 'index'
            },
            {
                title: '会议室',
                key: 'name'
            },
            {
                title: '主持人',
                key: 'zcr',
                render: (h, params) => {
                    return h('div', params.row.zcr.name);
                }
            },
            {
                title: '参会人数',
                key: 'chr',
                render: (h, params) => {
                    return h('div', params.row.chr.name.length);
                }
            },
            {
                title: '开始时间',
                key: 'startTime'
            },
            {
                title: '结束时间',
                key: 'stopTime'
            },
            {
                title: '会议记录',
                render: (h, params) => {
                    return h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.$router.push({
                                    name:"HISROOM",
                                    query:{
                                        videoUrl:params.row.record_url,
                                    },
                                    params:{
                                        url:params.row.record_url
                                    }
                                })
                            }
                        }
                    }, '视频回看');
                }
            }
        ],
        params:{
          zt:"20",//,20
          times:"",
          keyword:"",
        }
      }
    },
    created() {
       this.getRoom()
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
