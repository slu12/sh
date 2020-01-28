<template>
  <div class="box_col chartBox">
    <div id="RightID" class="chartDom">

    </div>
    <div class="legLine box_row colItemCenter">
      <div class="legCode" style="background-color: #0e6de9"></div>
      <div class="legName">银行</div>
      <div class="legVal">212万元</div>
      <div class="legPID">36%</div>
    </div>

    <div class="legLine box_row colItemCenter">
      <div class="legCode" style="background-color: #00af6d"></div>
      <div class="legName">网贷</div>
      <div class="legVal">212万元</div>
      <div class="legPID">36%</div>
    </div>

    <div class="legLine box_row">
      <div class="legCode" style="background-color: #e6af08"></div>
      <div class="legName">汽车</div>
      <div class="legVal">212万元</div>
      <div class="legPID">36%</div>
    </div>

    <div class="legLine box_row" style="margin-bottom: 0">
      <div class="legCode" style="background-color: #fc4e4e"></div>
      <div class="legName">其他</div>
      <div class="legVal">212万元</div>
      <div class="legPID">36%</div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "index",
    mounted(){
      this.$nextTick(()=>{
        this.buildChart()
      })
    },
    methods:{
      buildChart(){
        var v = this
        var myChart = echarts.init(document.getElementById('RightID'))
        let option = {
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['25%', '60%'],
              center: ['50%', '50%'],
              //silent:true,
              data: [
                {
                  value: 38,
                  name: '',
                  itemStyle:{
                    color:'#fc4e4e'
                  }
                },
                {
                  value: 30,
                  name: '',
                  itemStyle:{
                    color:'#0097ff'
                  }
                },
                {value: 25, name: '',
                  itemStyle:{
                    color:'#ffe20c'
                  }
                },
                {value: 20, name: '',
                  itemStyle:{
                    color:'#12de80'
                  }
                },

              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                show:false
              },
              labelLine: {
                show: false
              },


            },
            {
              name: '',
              type: 'pie',
              clockWise: false, //顺时加载
              radius: ['107', '110'],
              avoidLabelOverlap: true,
              silent:true,
              itemStyle: {

                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color:"#0292b5"
                }
              },
              data: [{
                value: 8,
                name: '80%',

              }]
            },
          ],
        };


        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>
