<template>
  <div class="box_col pager1Sty" @contextmenu.prevent="sysEvent">
    <div class="box_row pagerTop">
      <div class="pager4Tit" @click="sysEvent">摄像头视频</div>
    </div>
    <div id="carouselBox4" class="box_col_100">
      <div v-if="domeEH.w>0&&domeEH.h>0"
           style="position: relative"
           :style="{width:domeEH.w+'px',height:domeEH.h+'px'}">
        <img v-if="itUrl!==''" :src="itUrl" style="width: 100%;height: 100%" alt="">
        <Icon v-else type="ios-images-outline" color="#ffffff" size="100"
              style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%)"/>
      </div>
    </div>
    <div class="pager4footer box_row rowBetween">
      <div>
        GNS-WERPS1243235
      </div>
      <div class="iconItem">
        <Icon type="md-camera" size="22" @click.native="photo"/>
        <Icon type="md-videocam" size="23" @click.native="videoEvent" style="margin-left: 12px"/>
      </div>
    </div>
  </div>
</template>

<script>
  import login1 from '../file/login1.png'
  import login2 from '../file/login2.png'

  export default {
    name: "index",
    data() {
      return {
        CarouselConfig: {
          val: 3,
          loop: true,
          autoplay: false,
          autoplaySpeed: 5000,
          fileUrl: [login1, login2, login1, login2]
        },
        domeEH: {
          w: 0,
          h: 0
        },
        itUrl: ""
      }
    },
    mounted() {
      var v = this
      this.$nextTick(() => {
        v.domeEH.h = v.AF.getDom_H('carouselBox4')
        v.domeEH.w = v.AF.getDom_W('carouselBox4')
      })
      this.setIntervalEvent()
    },
    methods: {
      sysEvent() {
        this.$emit('sysEvent', 4)
      },
      setIntervalEvent(){
        this.photo()
        setTimeout(()=>{
          this.setIntervalEvent()
        },10500)
      },
      photo() {
        this.$http.post('/pub/zp', {sbh: '34286', chn: '0'}).then(res => {
          if (res.code == 200) {
            // this.$Message.success('抓拍成功');
            this.itUrl = res.message
          } else {
            // this.$Message.warning(res.message);
          }
        })
      },
      videoEvent() {
        this.$emit('videoEvent')
      }
    }
  }
</script>

<style lang="less">
  .pager1Sty {
    background-color: #5E687D;
    .pagerTop {
      height: 40px;
      .pager4Tit {
        width: 120px;
        background: rgba(54, 62, 79, 1);
        text-align: center;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
    }

    .pager4footer {
      padding: 0 14px;
      height: 40px;
      background: rgba(0, 0, 0, 1);
      border-top: 1px solid rgba(94, 104, 125, 1);
      height: 40px;
      line-height: 40px;

      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

    .iconItem {
      cursor: pointer;
    }
  }

</style>
