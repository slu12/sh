<template>
  <Card :class="sel?'selSty':''"
        class="cardaItemBox boxMar_B"
  >
    <div slot="title" class="box_row rowBetween colCenter">
      <div class="box_row colCenter">
        <Avatar>{{getName(item.getId())}}</Avatar>
        <div class="namebox">
          {{getName(item.getId())}}
        </div>
      </div>
      <Icon v-if="sel" type="md-contract" size="22"
            color="" style="cursor: pointer"
            @click.native="closeVideoBox()"/>
      <Icon v-else type="md-expand" size="22"
            style="cursor: pointer"
            @click.native="showMaxVideo()"/>
    </div>
    <div :id="'remote_video_'+item.getId()" class="videoBox">
      <Icon type="logo-youtube"/>
    </div>
    <div class="box_row cardFooterButtonBox">
      <div class="box_row_100 butItem" @click="setAudio">
        <Icon v-show="muteAudio" size="18" color="#348EED" type="md-mic"/>
        <Icon v-show="!muteAudio" size="18" color="#515a6e" type="md-mic-off"/>
      </div>
      <div class="box_row_100 butItem" style="position: relative" @click="setVideo">
        <Icon v-show="muteVideo" size="18" color="#348EED" type=" iconfont iconvideo_on"/>
        <Icon v-show="!muteVideo" size="18" color="#515a6e" type=" iconfont iconvideo_off"/>
      </div>
    </div>
  </Card>
</template>

<script>
  export default {
    name: "index",
    props: {
      item: '',
      index: null,
      sel: false
    },
    computed: {
      orderAudioStop() {
        return this.$parent.orderAudioStop
      }
    },
    watch: {
      orderAudioStop: function (n, o) {
        this.setAudio()
      }
    },
    data() {
      return {
        muteAudio: true,//音频轨道
        muteVideo: true,//视频轨道
      }
    },
    created() {

    },
    mounted() {
      var v = this
      this.$nextTick(() => {
        v.buildVideoBox()
      })
    },
    beforeDestroy() {
      this.closeVideoBox()
    },
    methods: {
      buildVideoBox() {
        this.item.play("remote_video_" + this.item.getId())
      },
      closeVideoBox() {
        this.$emit('showMaxVideo', '0000')
      },
      showMaxVideo() {
        this.$emit('showMaxVideo', this.index)
      },
      setAudio() {//启用/关闭 音频轨道
        if (this.muteAudio) {
          let nut = this.item.muteAudio()
          if (nut) {
            this.muteAudio = !this.muteAudio
          }
        } else {
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
        } else {
          let nut = this.item.unmuteVideo()
          if (nut) {
            this.muteVideo = !this.muteVideo
          }
        }
      },
      getName(uid) {
        const chrName = this.$parent.roomMEss.chr.name
        const chrUid = this.$parent.roomMEss.chr.uid
        let key = ''
        chrUid.forEach((it, index) => {
          if (it == uid) {
            key = index
          }
        })

        return chrName[key]
      }
    }
  }
</script>

<style lang="less">
  @import "./index";

  .selSty {
    border-right-color: #ed4014!important;
    border-right-width: 3px!important;
  }
</style>
