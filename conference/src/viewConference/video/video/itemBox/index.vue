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

      <div class="settingBox box_row">
        <div class="settingItem">
          <Icon type="md-settings" />
        </div>
        <div class="settingItem">
          <Icon type="md-mic-off" />
          <!--<Icon type="md-mic" />-->
        </div>
        <div class="settingItem">
          <Icon type="ios-videocam" />
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
    created(){
      console.log('********************',this.item.getId());

      console.log('idididi',this.item.getId());
    },
    mounted(){
      this.$nextTick(()=>{
        // this.$parent.localStream.play("remote_video_"+this.item.getId())
        console.log(this.$parent);
      })
    }
  }
</script>

<style lang="less">
  @import "./index";
</style>
