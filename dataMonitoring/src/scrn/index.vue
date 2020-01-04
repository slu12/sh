<template>
  <div class="box_col scrnBoxSty">
    <div>
      <pager-top></pager-top>
    </div>
    <div class="box_col_100 box_row" style="margin: 30px 20px 20px 20px">
      <div class="box_col rowBetween">
        <hx-box></hx-box>
        <yq-box></yq-box>
      </div>
      <div class="box_row_100">

      </div>
      <div style="width: 638px">
        <xx-box></xx-box>
      </div>
    </div>

  </div>
</template>

<script>
  import pagerTop from './comp/pagerTop'
  import hxBox from './comp/hy'
  import yqBox from './comp/yq'

  import xxBox from './comp/xx'
  export default {
    name: 'scnr',
    components: {
      pagerTop,
      hxBox,yqBox,
      xxBox
    },
    data() {
      return {
        compName:""
      }
    },
    methods: {
    }
  }

</script>

<style lang="less">
  @import "./index.less";
</style>
