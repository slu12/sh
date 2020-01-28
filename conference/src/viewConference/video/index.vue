<template>
  <div class="box_col">
    <div class="boxPadd_B box_row">
      <div class="boxMar_R">
        <DatePicker type="daterange" split-panels placeholder="请选择时间" style="width: 200px"></DatePicker>
      </div>
      <div class="box_row_100 boxMar_R">
        <Input search enter-button placeholder="条件搜索" />
      </div>
      <div class="boxMar_R">
        <Button type="info"> 创建会议</Button>
      </div>
      <div class="boxMar_R">
        <Button type="info"> 预约会议</Button>
      </div>
    </div>
    <div class="box_col_autoY">
      <Row :gutter="16">
        <Col span="8" v-for="(it,index) in 4">
          <video-card></video-card>
        </Col>
      </Row>
    </div>
    <div class="boxMar_T box_row rowRight">
      <Page :total="100" />
    </div>
  </div>
</template>

<script>
  import videoCard from './comp/cardItem'
  export default {
    name: "index",
    components:{videoCard}
  }
</script>

<style scoped>

</style>
