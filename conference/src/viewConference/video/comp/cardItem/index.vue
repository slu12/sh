<template>
  <Card class="videoCardBoxSty">
    <div class="boxPadd_LR boxPadd_B topLineBox box_row rowBetween">
      <div class="roomNumber">
        #100000
      </div>
      <div class="roomTyp">
        <Tag color="magenta">状态</Tag>
      </div>
    </div>
    <div class="themeSty">
      <h2>车辆管理项目启动会</h2>
    </div>
    <div class="videoImgBox boxMar">
      <Icon type="logo-youtube" />
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
          Arron
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
          <Button type="success" @click="joinEvent">参加会议</Button>
        </div>
      </div>
      <div class="box_row colCenter mesline">
        <div class="labTit">
          旁听人：
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
          <Button type="info" @click="listenEvent">旁听会议</Button>
        </div>
      </div>

    </div>
  </Card>
</template>

<script>
  export default {
    name: "index",
    methods:{
      joinEvent(){//加入会议
        this.$router.push({
          name:"ROOM",
          query:{
            typ:'join',
            room:'0000000',
            userId:'11111'
          }
        })
      },
      listenEvent(){//旁听会议
        this.$router.push({
          name:"ROOM",
          query:{
            typ:'listen',
            room:'0000000',
            userId:'11111'
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import "./index";
</style>
