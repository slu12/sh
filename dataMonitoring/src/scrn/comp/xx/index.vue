<template>
  <div class="xxBox box_col">
    <div class="boxTitle">
      最新消息
    </div>
    <div class="box_col_100 centerBox">
      <div class="box_col">
        <table-box></table-box>
      </div>
    </div>
  </div>
</template>

<script>
  import tableBox from './comp/table'
  export default {
    name: "index",
    components:{
      tableBox
    }
  }
</script>

<style scoped>

</style>
