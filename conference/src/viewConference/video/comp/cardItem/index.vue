<template>
  <Card class="videoCardBoxSty">
    <div class="boxPadd_LR boxPadd_B topLineBox box_row rowBetween">
      <div class="roomNumber">
        {{item.name}}
      </div>
      <div class="roomTyp">
        <Tag color="magenta">{{item.zt | roomZT}}</Tag>
      </div>
    </div>
    <div class="videoImgBox boxMar">
      <Icon type="logo-youtube"/>
    </div>

    <div class="messBox boxMar_LR">
      <div class="box_row colCenter mesline">
        <div class="labTit">
          开始时间：
        </div>
        <div class="labValName">
          {{moment(item.kssj).format('YYYY-MM-DD HH:mm')}}
        </div>
      </div>
      <div class="box_row colCenter mesline">
        <div class="labTit">
          主讲人：
        </div>
        <div class="labValName">
          {{item.zcr.name}}
        </div>
      </div>
      <div class="box_row colCenter mesline">
        <div class="labTit">
          参与人：
        </div>
        <div class="joinPerBox box_row_100 box_row">
          <div class="perItem" v-for="(chrItem, index) in item.chr.name" v-if="index<3">
            {{ getNameFrist(chrItem) }}
          </div>
          <div class="perNum">
            +{{item.chr.name.length}}
          </div>
        </div>
        <div class="flexItemE">
          <!--<Button type="success" @click="joinEvent">参加会议</Button>-->
        </div>
      </div>
      <!--<div v-if="false" class="box_row colCenter mesline">-->
        <!--<div class="labTit">-->
          <!--旁听人：-->
        <!--</div>-->
        <!--<div class="joinPerBox box_row_100 box_row">-->
          <!--<div class="perItem">-->
            <!--A-->
          <!--</div>-->
          <!--<div class="perItem">-->
            <!--A-->
          <!--</div>-->
          <!--<div class="perItem">-->
            <!--A-->
          <!--</div>-->
          <!--<div class="perNum">-->
            <!--+5-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="flexItemE">-->
          <!--<Button type="info" @click="listenEvent">旁听会议</Button>-->
        <!--</div>-->
      <!--</div>-->
      <div style="margin: 12px 0">
        <!--:disabled="item.zt=='00'?true:false"-->
        <Button type="success"
                @click="joinEvent" long>开始会议</Button>
      </div>
    </div>
  </Card>
</template>

<script>
  export default {
    name: "index",
    filters:{
      roomZT:(val)=>{
        if(val == '00'){
          return '未开始'
        }else if(val == '01'){
          return '待开庭'
        }else if(val == '10'){
          return '庭审中'
        }else if(val == '20'){
          return '已结束'
        }
      }
    },
    props:{
      item:{
        props:{
          type:Object,
          default:()=>{
            return {}
          }
        }
      }
    },
    methods: {
      joinEvent() {//加入会议
        this.$router.push({
          name: "ROOM",
          query: {
            typ: 'join',
            id:this.item._id,
            room: this.item.room_name,
          },
          params:this.item
        })
      },
      listenEvent() {//旁听会议
        this.$router.push({
          name: "ROOM",
          query: {
            typ: 'listen',
            room: '0000000',
            userId: '11111'
          }
        })
      },
      getNameFrist(name){
        let arrName = name.split(' ')
        return arrName[0]
      }
    }
  }
</script>

<style lang="less">
  @import "./index";
</style>
