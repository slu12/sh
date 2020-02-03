<template>
  <div class="box_col hisvideoMessPager">
    <div id="" class="pagerRightBox box_col_auto boxPadd_LR boxPadd_T">
      <div class="playVideoBox box_col">
        <Icon type="logo-youtube"/>
      </div>
      <div class="settingBox box_row">
        <div class="settingItem">
          <Icon type="ios-rewind" />
        </div>
        <div class="settingItem">
          <Icon type="ios-play" />
        </div>
        <div class="settingItem">
          <Icon type="ios-pause" />
        </div>
        <div class="settingItem">
          <Icon type="ios-fastforward" />
        </div>

        <div class="settingItem" title="关闭" @click="closePager">
          <Icon type="md-close-circle" color/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AgoraRTC from 'agora-rtc-sdk'
  import videoItemBox from './video/itemBox'

  export default {
    name: "videoMess",
    components: {videoItemBox},
    data() {
      return {
        client: ''
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
      closePager(){
        this.$router.back()
      }

    }
  }
</script>

<style lang="less">
  @import "./less/mess";
</style>
