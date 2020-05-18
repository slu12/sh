<template>
  <div class="homeBox box_col">
    <div class="textBox">
      欢迎使用 <br>
      船联网大数据平台
    </div>

  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style lang="less">
  .homeBox{
    position: relative;
    .textBox{
      position: absolute;
      left: 50%;
      top:45%;
      transform: translate(-50%,-50%);
      text-align: center;
      font-size: 50px;
      font-weight: 700;
      color: #004186;
    }
  }
</style>
