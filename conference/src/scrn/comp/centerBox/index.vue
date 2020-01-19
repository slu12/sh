<template>
  <div class="box_col centerPagerBox" style="">
    <div class="valNameBoxSty box_row rowBetween">
      <div class="box1">
        采集数 （笔）
      </div>
      <div class="box2">
        <span class="span1">同比增长</span>
        <span class="span2">28.9%</span>
        <span class="span3"><Icon type="md-arrow-round-up" size="24"/></span>
      </div>
    </div>

    <div class="moneyBoxSty box_row">
      <div class="codeUnit">
        ,
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem" style="margin: 0">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
    </div>

    <div class="valNameBoxSty box_row rowBetween">
      <div class="box1">
        标的总额 （百万元）
      </div>
      <div class="box2">
        <span class="span1">同比增长</span>
        <span class="span2">28.9%</span>
        <span class="span3"><Icon type="md-arrow-round-up" size="24"/></span>
      </div>
    </div>

    <div class="moneyBoxSty box_row">
      <div class="codeUnit">
        ,
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem" style="margin: 0">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
    </div>

    <div class="valNameBoxSty box_row rowBetween">
      <div class="box1">
        受理标的额 （元）
      </div>
      <div class="box2">
        <span class="span1">同比增长</span>
        <span class="span2">28.9%</span>
        <span class="span3"><Icon type="md-arrow-round-up" size="24"/></span>
      </div>
    </div>

    <div class="moneyBoxSty box_row">
      <div class="codeUnit">
        ,
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
      <div class="cardItem" style="margin: 0">
        <Icon type=" iconfont iconshuzi9"></Icon>
      </div>
    </div>

    <div class="box_row rowBetween imgMesBox">
      <div class="itemBox">
        <div class="imgBox">
          <img :src="img01" alt="">
        </div>
        <div class="titleBox">
          汽车金融
        </div>
        <div class="messBox box_row rowBetween" style="color:#df5a5a">
          <div>
            667笔
          </div>
          <div>
            36%
          </div>
        </div>
      </div>
      <div class="itemBox">
        <div class="imgBox">
          <img :src="img02" alt="">
        </div>
        <div class="titleBox">
          履约保证险
        </div>
        <div class="messBox box_row rowBetween" style="color:#f28c3b">
          <div>
            667笔
          </div>
          <div>
            36%
          </div>
        </div>
      </div>
      <div class="itemBox">
        <div class="imgBox">
          <img :src="img03" alt="">
        </div>
        <div class="titleBox">
          房抵押贷款
        </div>
        <div class="messBox box_row rowBetween" style="color:#8b70f7">
          <div>
            667笔
          </div>
          <div>
            36%
          </div>
        </div>
      </div>
    </div>

    <div class="box_row rowBetween imgMesBox">
      <div class="itemBox">
        <div class="imgBox">
          <img :src="img04" alt="">
        </div>
        <div class="titleBox">
          车房抵押贷款
        </div>
        <div class="messBox box_row rowBetween" style="color:#19dc7c">
          <div>
            667笔
          </div>
          <div>
            36%
          </div>
        </div>
      </div>
      <div class="itemBox">
        <div class="imgBox">
          <img :src="img05" alt="">
        </div>
        <div class="titleBox">
          个人信用借款
        </div>
        <div class="messBox box_row rowBetween" style="color:#34a5fc">
          <div>
            667笔
          </div>
          <div>
            36%
          </div>
        </div>
      </div>
      <div class="itemBox">
        <div class="imgBox">
          <img :src="img06" alt="">
        </div>
        <div class="titleBox">
          小企业贷款
        </div>
        <div class="messBox box_row rowBetween" style="color:#ffe20c">
          <div>
            667笔
          </div>
          <div>
            36%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import img01 from '../file/01.png'
  import img02 from '../file/02.png'
  import img03 from '../file/03.png'
  import img04 from '../file/04.png'
  import img05 from '../file/05.png'
  import img06 from '../file/06.png'
  export default {
    name: "index",
    data(){
      return {
        img01,img02,
        img03,img04,
        img05,img06
      }
    }
  }
</script>

<style scoped>

</style>
