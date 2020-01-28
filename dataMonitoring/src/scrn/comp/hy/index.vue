<template>
  <div class="hyBox box_col">
    <div class="boxTitle">
      涉及服务行业
    </div>
    <div id="echartDemHY" class="box_col_100 chartsBox">

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
        var myChart = echarts.init(document.getElementById('echartDemHY'))
        let option ={
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['25%', '60%'],
              center: ['50%', '50%'],
              //silent:true,
              data: [
                {
                  value: 335,
                  name: '银行',
                  itemStyle:{
                    color:'#fc4e4e',
                  }
                },
                {
                  value: 310,
                  name: '网贷',
                  itemStyle:{
                    color:'#12de80'
                  }
                },
                {
                  value: 274,
                  name: '其他',
                  itemStyle:{
                    color:'#ffe20c'
                  }
                },
                {
                  value: 235,
                  name: '汽车',
                  itemStyle:{
                    color:'#0097ff'
                  }
                },

              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                color: 'white',
                position: 'outside',
                formatter:'{b}         \n{c}笔   {d}%',
                fontSize:'16'
              },
              labelLine: {
                show: true,
                smooth: 0.1,
                length: 30,
                length2: 50
              },
            },
            {
              name: '',
              type: 'pie',
              clockWise: true, //顺时加载
              radius: ['150', '153'],
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
          ]
        }

        myChart.setOption(option);
      }
    }

  }
</script>

<style scoped>

</style>
