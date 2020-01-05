<template>
  <div class="yqBox box_col">
    <div class="boxTitle">
      未来三年预期
    </div>
    <div id="echartDemYQ" class="box_col_100 chartsBox">

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
        var myChart = echarts.init(document.getElementById('echartDemYQ'))
        let option ={
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["银行", "网贷", "汽车", "其他"],
            // x: "right",
            right:'40',
            textStyle: {
              color: "rgb(86, 170, 255)",
              fontSize: 12
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: ["2019", "2020", "2021", "2022"],
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "rgb(255, 255, 255)"
                }
              },
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: "value",
              splitLine: {
                show: true
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "rgb(255, 255, 255)"
                }
              }
            }
          ],
          series: [
            {
              type: "line",
              name: "银行",
              data: [1000, 1500, 1600, 2000],
              symbolSize: 0,
              symbol: "circle",
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "rgb(252, 78, 78)"
                  }
                }
              }
            },
            {
              type: "line",
              name: "网贷",
              data: [700, 800, 1100, 1200],
              symbolSize: 0,
              symbol: "circle",
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "rgb(18, 222, 128)"
                  }
                }
              }
            },
            {
              type: "line",
              name: "汽车",
              data: [500, 500, 750, 1500],
              symbolSize: 0,
              symbol: "circle",
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "rgb(0, 151, 255)"
                  }
                }
              }
            },
            {
              type: "line",
              name: "其他",
              data: [200, 400, 600, 800],
              symbolSize: 0,
              symbol: "circle",
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "rgb(255, 226, 12)"
                  }
                }
              }
            }
          ],
        }

        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>
