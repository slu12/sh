<template>
  <div class="box_row pagerTop">
    <div class="dateBoxSty box_row_100">
      {{times}} <span style="margin-left: 12px">8°C</span>
      <span style="margin-left: 8px"> <img :src="cloude" style="width: 24px;height: 14px" alt=""> </span>
    </div>
    <div class="titleBoxSty box_row_100">
      数据监控
    </div>
    <div class="box_row_100">
      <div class="box_row rowRight colItemCenter topRightTextBox">
        <div class="labelsty">
          平台稳定运营天数
        </div>
        <div class="valCard">
          8
        </div>
        <div class="valCard">
          3
        </div>
        <div class="valCard">
          5
        </div>
        <div class="daySty">
          <span>天</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import cloude from '../file/cloud.png'
  export default {
    name: "index",
    data() {
      return {
        cloude,
        times: ""
      }
    },
    created() {
      this.getTime()
    },
    mounted() {
      var v = this
      this.$nextTick(() => {
      })
    },
    methods: {
      getTime(){
        let Y = this.moment().format('YYYY年MM月DD日')
        let H = this.moment().format('HH:mm')
        let P = this.moment().format('A')
        let pp = ''
        if(P == 'AM'){
          pp = '上午'
        }else {
          pp = '下午'
        }
        let a = new Date()
        let week = a.getDay()
        let weeks = {
          '0': '日',
          '1': '一',
          '2': '二',
          '3': '三',
          '4': '四',
          '5': '五',
          '6': '六'
        }
        this.times = Y + ' 星期' +weeks[week] + ' ' + pp+H
      }
    }
  }
</script>

<style lang="less">
</style>
