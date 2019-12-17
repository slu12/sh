<template>
    <div class="box_row scrnBoxSty">
      <div class="box_row_100 centerMax">
        <component :is="pagetMax"></component>
      </div>
      <div class="RightBox box_col">
        <div class="box_col_100 itemTop">
          <component :is="rightTop"></component>
        </div>
        <div class="box_col_100 itemCenter">
          <component :is="rightCenter"></component>
        </div>
        <div class="box_col_100 itemBottom">
          <component :is="rightBottom"></component>
        </div>
      </div>
    </div>
</template>

<script>
  import pager1 from './comp/pager1'
  import pager2 from './comp/pager2'
  import pager3 from './comp/pager3'
  import pager4 from './comp/pager4'
  export default {
    name:'scnr',
    components:{
      pager1,pager2,pager3,pager4
    },
    data(){
      return {
        pagetMax:"pager1",
        rightTop:"pager2",
        rightCenter:"pager3",
        rightBottom:"pager4"
      }
    }
  }

</script>

<style lang="less">
@import "./index.less";
</style>
