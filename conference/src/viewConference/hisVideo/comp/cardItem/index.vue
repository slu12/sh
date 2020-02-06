<template>
  <Card class="hisVideoCardBoxSty">
    <div class="boxPadd_LR boxPadd_B topLineBox box_row rowBetween">
      <div class="roomNumber">
        {{item.name}}
      </div>
    </div>

    <div class="messBox boxMar_LR">
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
          开始时间：
        </div>
        <div class="labValName">
          {{item.startTime}}
        </div>
      </div>
      <div class="box_row colCenter mesline">
        <div class="labTit">
          结束时间：
        </div>
        <div class="labValName">
          {{item.stopTime}}
        </div>
      </div>
      <div style="margin: 12px 0">
        <Button type="info" long @click="hisEvent">回放</Button>
      </div>
    </div>
  </Card>
</template>

<script>
  import videojs from 'video.js'
  import 'videojs-contrib-hls'

  export default {
    name: "index",
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
    data() {
        return {
            myVideo: '',
            videoSrc:""
        }
    },
    methods:{
      hisEvent(){//会议回放
        this.$router.push({
          name:"HISROOM",
          query:{
            videoUrl:this.item.record_url,
          },
          params:{
            url:this.item.record_url
          }

        })
      },
    }
  }
</script>

<style lang="less">
@import "./index";
</style>
