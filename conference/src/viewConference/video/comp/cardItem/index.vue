<template>
  <Card class="videoCardBoxSty">
    <div class="boxPadd_LR boxPadd_B topLineBox box_row rowBetween">
      <div class="roomNumber">
        #{{item.room_name}}
      </div>
      <div class="roomTyp">
        <Tag color="magenta">{{item.zt | roomZT}}</Tag>
      </div>
    </div>
    <div class="themeSty">
      <h3>{{item.name}}</h3>
    </div>
    <div class="startTime">
      {{moment(item.kssj).format('YYYY-MM-DD HH:mm:ss')}}
    </div>
    <div class="videoImgBox boxMar">
      <Icon type="logo-youtube"/>
    </div>

    <div class="messBox boxMar_LR">
      <!--<div class="box_row colCenter">-->
      <!--<div class="labTit">-->
      <!--会议名称：-->
      <!--</div>-->
      <!--<div class="labVal">-->
      <!--Arron-->
      <!--</div>-->
      <!--</div>-->
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
          <div class="perItem">
            A
          </div>
          <div class="perItem">
            A
          </div>
          <div class="perItem">
            A
          </div>
          <div class="perNum">
            +5
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
        <Button type="success" :disabled="item.zt=='00'?true:false"
                @click="joinEvent" long>开始会议 {{item.zt}}</Button>
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
      }
    }
  }
</script>

<style lang="less">
  @import "./index";
</style>
