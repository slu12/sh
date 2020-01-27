<template>
  <Card class="hisVideoCardBoxSty">
    <div class="boxPadd_LR boxPadd_B topLineBox box_row rowBetween">
      <div class="roomNumber">
        #100000
      </div>
      <div class="roomTyp">
        <Button type="info" size="small" @click="hisEvent">回放</Button>
      </div>
    </div>
    <div class="themeSty">
      <h2>车辆管理项目启动会</h2>
    </div>
    <div class="videoImgBox boxMar">
      <Icon type="logo-youtube" />
    </div>

    <div class="messBox boxMar_LR">
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
          开始时间：
        </div>
        <div class="labValName">
          2020-01-01 12:20:20
        </div>
      </div>
      <div class="box_row colCenter mesline">
        <div class="labTit">
          结束时间：
        </div>
        <div class="labValName">
          2020-01-01 14:20:20
        </div>
      </div>

    </div>
  </Card>
</template>

<script>
  export default {
    name: "index",
    methods:{
      hisEvent(){//加入会议
        this.$router.push({
          name:"HISROOM",
          query:{
            room:'0000000',
            userId:'11111'
          }
        })
      },
    }
  }
</script>

<style lang="less">
@import "./index";
</style>
