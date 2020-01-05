<template>
  <div class="xxBox box_col">
    <div class="boxTitle">
      最新消息
    </div>
    <div class="box_col_100 centerBox">
      <div class="box_col">
        <div>
          <table-box></table-box>
        </div>
        <div style="margin-top: 70px">
          <statistics-val></statistics-val>
        </div>
        <div class="box_col_100 box_row rowAuto" style="margin-top: 30px">
          <div style="width: 220px;">
            <chart-left></chart-left>
          </div>
          <div style="width: 220px;">
            <chart-right></chart-right>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tableBox from './comp/table'
  import statisticsVal from './comp/statisticsVal'
  import chartLeft from './comp/chartLeft'
  import chartRight from './comp/chartRight'
  export default {
    name: "index",
    components:{
      tableBox,statisticsVal,
      chartLeft,chartRight
    }
  }
</script>

<style scoped>

</style>
