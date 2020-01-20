<template>
  <div class="box_col">
    <div class="box_col_autoY">
      <Row :gutter="16">
        <Col span="8" v-for="(it,index) in 4">
          <video-card></video-card>
        </Col>
      </Row>
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
