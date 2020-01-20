<template>
  <Card class="videoCardBoxSty">
    <div class="boxPadd_LR boxPadd_B roomNumber">
      #100000
    </div>
    <div class="videoImgBox boxMar">
      <Icon type="logo-youtube" />
    </div>

    <div class="messBox boxMar_LR">
      <div class="box_row">
        <div class="labTit">
          会议名称：
        </div>
        <div class="labVal">
          Arron
        </div>
      </div>
      <div class="box_row">
        <div class="labTit">
          主讲人：
        </div>
        <div class="labVal">
          Arron
        </div>
      </div>
      <div class="box_row colCenter">
        <div class="labTit">
          参与人：
        </div>
        <div class="joinPerBox box_row">
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
      </div>

    </div>
  </Card>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="less">
@import "./index";
</style>
