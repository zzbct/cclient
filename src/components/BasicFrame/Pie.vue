<!--圆环-->
<template>
  <div class="view">
    <div class="chart-area" ref='area'></div>
  </div>
</template>
<style scoped>
  .view{
    position: relative;
    width:100%;
    height:300px;
    padding-right:30px;
  }
  .title{
    box-sizing: border-box;
    width: 100%;
    height:60px;
    padding-left: 21px;
    line-height:60px;
    font-size:16px;
    font-weight: bold;
    color:#464c5b;
    border-bottom: 1px solid #dadee3;
  }
  .chart-area{
    box-sizing: border-box;
    width:100%;
    height:300px;
    padding:20px 0 20px 30px;
  }
</style>
<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        data: []
      }
    },
    mounted () {
      this.$on('bridge', (val) => {
        this.setData(val)
      })
    },
    methods: {
      initChart: function () {
        let vm = this
        vm.myChart = echarts.init(vm.$refs.area)
        var option = {
          color: ['#43a3fa', '#f8d249', '#a4f089', '#fe7847'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: 'review result',
              type: 'pie',
              radius: '70%',
              center: ['40%', '50%'],
              data: this.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  borderWidth: 2,
                  borderColor: '#fff',
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.myChart.setOption(option)
      },
      setData: function (data) {
        this.data = data
        this.initChart()
      }
    }
  }
</script>
