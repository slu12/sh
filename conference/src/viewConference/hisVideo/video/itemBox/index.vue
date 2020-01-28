<template>
  <Card class="cardaItemBox boxMar_B">
    <div slot="title" class="box_row rowBetween colCenter">
      <div class="box_row colCenter">
        <Avatar>A</Avatar>
        <div class="namebox">
          name
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
    <div class="videoBox">
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
        type: String,
        default: () => {
          return '0'
        }
      }
    }
  }
</script>

<style lang="less">
  @import "./index";
</style>
