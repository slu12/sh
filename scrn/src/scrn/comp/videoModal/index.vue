<template>
  <div>
    <Modal
      title="监控直播"
      width="70"
      v-model="showModal"
      :mask-closable="false"
      :footer-hide="true"
      @on-visible-change="visible"
      class-name="vertical-center-modal">
      <div style="height: 600px">
        <!--<video src=""></video>-->
        <!--<img src="../file/login1.png" style="width: 100%;height: 100%" alt="">-->
        <iframe :src="videoUrl" width="100%" height="100%" style="border: none;"></iframe>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {
        showModal: true,
        videoUrl: ""
      }
    },
    created() {
      this.getVideo()
    },
    methods: {
      visible(val) {
        if (!val) {
          this.$emit("close")
        }
      },
      getVideo() {
        this.$http.post('/pub/zb', {sbh: 30895}).then(res => {
          if (res.code == 200) {
            this.videoUrl = res.result[0]
          }
        }).catch(err => {
        })
      }
    }
  }
</script>

<style lang="less">
  /*.iframeStyleBox {*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
</style>
