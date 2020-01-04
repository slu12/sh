<template>
  <div class="box_row scrnBoxSty">
    <div class="box_row_100 centerMax">
      <component :is="pagetMax" @sysEvent="sysEvent"></component>
    </div>
    <div class="RightBox box_col">
      <div class="box_col_100 itemTop">
        <component :is="rightTop" @sysEvent="sysEvent"></component>
      </div>
      <div class="box_col_100 itemCenter" style="margin: 10px 0">
        <component :is="rightCenter" @sysEvent="sysEvent"></component>
      </div>
      <div class="box_col_100 itemBottom">
        <component :is="rightBottom" @sysEvent="sysEvent" @videoEvent="compName='viderModal'"></component>
      </div>
    </div>
    <component :is="compName" @close="compName=''"></component>
  </div>
</template>

<script>
  import pager1 from './comp/pager1'
  import pager2 from './comp/pager2'
  import pager3 from './comp/pager3'
  import pager4 from './comp/pager4'

  import viderModal from './comp/videoModal'
  export default {
    name: 'scnr',
    components: {
      pager1, pager2, pager3, pager4,viderModal
    },
    data() {
      return {
        pagetMax: "pager1",
        rightTop: "pager2",
        rightCenter: "pager3",
        rightBottom: "pager4",
        compName:""
      }
    },
    methods: {
      sysEvent(index) {
        if(index == 1){
          this.pagetMax = "pager1";
          this.rightTop = "pager2";
          this.rightCenter = "pager3";
          this.rightBottom = "pager4";
        }else if(index == 2){
          this.pagetMax = "pager2";
          this.rightTop = "pager1";
          this.rightCenter = "pager3";
          this.rightBottom = "pager4";
        }else if(index == 3){
          this.pagetMax = "pager3";
          this.rightTop = "pager2";
          this.rightCenter = "pager1";
          this.rightBottom = "pager4";
        }else if(index == 4){
          this.pagetMax = "pager4";
          this.rightTop = "pager2";
          this.rightCenter = "pager3";
          this.rightBottom = "pager1";
        }
      }
    }
  }

</script>

<style lang="less">
  @import "./index.less";
</style>
