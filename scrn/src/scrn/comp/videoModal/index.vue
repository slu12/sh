<template>
  <div>
    <Modal
      title="实时监控"
      width="70"
      v-model="showModal"
      :mask-closable="false"
      :footer-hide="true"
      @on-visible-change="visible"
      class-name="vertical-center-modal">
      <div style="height: 600px">
        <!--<video src=""></video>-->
        <img src="../file/login1.png" style="width: 100%;height: 100%" alt="">
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "index",
    components:{
    },
    data(){
      return {
        showModal:true,
      }
    },
    methods:{
      visible(val){
        if(!val){
          this.$emit("close")
        }
      }
    }
  }
</script>

<style scoped>

</style>
