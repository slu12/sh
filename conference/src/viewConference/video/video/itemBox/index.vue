<template>
  <Card class="cardaItemBox boxMar_B">
    <div slot="title" class="box_row rowBetween colCenter">
      <div class="box_row colCenter">
        <Avatar>A</Avatar>
        <div class="namebox">
          name{{item.getId()}}
        </div>
      </div>
      <div v-if="item==0">
        主讲
      </div>
      <div v-else-if="item>0 && item<6">
        参与
      </div>
      <div v-else-if="item>5">
        旁听
      </div>
    </div>
    <div :id="'remote_video_'+item.getId()" class="videoBox">
      <Icon type="logo-youtube" />
    </div>
    <div style="position: relative">
      <div class="settingBox box_row">
        <!--<div class="settingItem">-->
          <!--<Icon type="md-settings" />-->
        <!--</div>-->
        <div class="settingItem" @click="setAudio">
          <Icon v-show="muteAudio" type="md-mic"/>
          <Icon v-show="!muteAudio" type="md-mic-off"/>
        </div>
        <div class="settingItem" @click="setVideo">
          <Icon v-show="muteVideo" type=" iconfont iconvideo_on"/>
          <Icon v-show="!muteVideo" type=" iconfont iconvideo_off"/>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
  export default {
    name: "index",
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data(){
      return {
        muteAudio:true,//音频轨道
        muteVideo:true,//视频轨道
      }
    },
    created(){
      console.log('********************',this.item.getId());

      console.log('idididi',this.item.getId());
    },
    mounted(){
      this.$nextTick(()=>{
        this.item.play("remote_video_"+this.item.getId())
        console.log(this.$parent);
      })
    },
    methods:{
      setAudio() {//启用/关闭 音频轨道
        if (this.muteAudio) {
          let nut = this.item.muteAudio()
          if (nut) {
            this.muteAudio = !this.muteAudio
          }
        }else{
          let nut = this.item.unmuteAudio()
          if (nut) {
            this.muteAudio = !this.muteAudio
          }
        }
      },
      setVideo() {//启用/关闭 视频轨道
        if (this.muteVideo) {
          let nut = this.item.muteVideo()
          if (nut) {
            this.muteVideo = !this.muteVideo
          }
        }else{
          let nut = this.item.unmuteVideo()
          if (nut) {
            this.muteVideo = !this.muteVideo
          }
        }
      },
    }
  }
</script>

<style lang="less">
  @import "./index";
</style>
