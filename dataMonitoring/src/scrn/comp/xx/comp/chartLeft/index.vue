<template>
  <div class="box_col chartBox">
    <div id="leftID" class="chartDom">

    </div>
    <div class="legLine box_row colItemCenter">
      <div class="legCode" style="background-color: #0e6de9"></div>
      <div class="legName">银行</div>
      <div class="legVal">212笔</div>
      <div class="legPID">36%</div>
    </div>

    <div class="legLine box_row colItemCenter">
      <div class="legCode" style="background-color: #00af6d"></div>
      <div class="legName">网贷</div>
      <div class="legVal">212笔</div>
      <div class="legPID">36%</div>
    </div>

    <div class="legLine box_row">
      <div class="legCode" style="background-color: #e6af08"></div>
      <div class="legName">汽车</div>
      <div class="legVal">212笔</div>
      <div class="legPID">36%</div>
    </div>

    <div class="legLine box_row" style="margin-bottom: 0">
      <div class="legCode" style="background-color: #fc4e4e"></div>
      <div class="legName">其他</div>
      <div class="legVal">212笔</div>
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
        var myChart = echarts.init(document.getElementById('leftID'))
        let option = {
          series: [
            {
              name: '',
              type: 'pie',
              clockWise: false, //顺时加载
              radius: ['100', '110'],
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

                }
              },

              data: [{
                value: 8,
                name: '80%',
                itemStyle:{color:'#0e6de9'}
              },{
                value:2,
                name:'',
                itemStyle:{color:'#0a0f5f'}

              }]
            },
            {
              name: '',
              type: 'pie',
              clockWise: false, //顺时加载
              radius: ['88', '98'],
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

                }
              },            data: [{
                value: 7,
                name: '70%',
                itemStyle:{color:'#00af6d'}
              },{
                value:3,
                name:'',
                itemStyle:{color:'#0a0f5f'}

              }]
            },
            {
              name: '',
              type: 'pie',
              clockWise: false, //顺时加载
              radius: ['76', '86'],
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

                }
              },
              data: [{
                value: 6,
                name: '60%',
                itemStyle:{color:'#e6af08'}
              },{
                value:4,
                name:'',
                itemStyle:{color:'#0a0f5f'}

              }]
            },
            {
              name: '',
              type: 'pie',
              clockWise: false, //顺时加载
              radius: ['64', '74'],
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

                }
              },
              data: [{
                value: 5,
                name: '50%',
                itemStyle:{color:'#fc4e4e'}
              },{
                value:5,
                name:'',
                itemStyle:{color:'#0a0f5f'}

              }]
            }

          ]
        };


        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>
