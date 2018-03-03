<template>
  <div class="view">
    <div id="myChart" class="chart"></div>
  </div>
</template>
<style scoped>
  .view {
    width: 400px;
    background-color: white;
  }
  .chart {
    width: 400px;
    height: 250px;
  }
</style>
<script>
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default{
    data () {
      return {
        xData: [],
        yData: []
      }
    },
    props: {
      pos: {
        type: Number,
        default: 0
      },
      external: {
        type: Array,
        default: function () {
          return []
        }
      },
      datas: {
        type: Object,
        default: function () {
          return {}
        }
      },
      title: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#333'
      }
    },
    components: {
    },
    computed: {
      idx () {
        return this.pos + this.external.length
      }
    },
    mounted () {
      let dat = this.datas.advice
      dat.forEach(item => {
        this.xData.push(item.hv)
        this.yData.push(item.cost)
      })
      this.drawLine()
    },
    beforeUpdate () {
      this.drawLine()
    },
    methods: {
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        let $this = this
        let myChart = echarts.init(document.getElementsByClassName('chart')[`${this.idx}`])
        // 绘制图表
        myChart.setOption({
          title: {
            text: `目标${$this.title}`,
            left: 'center',
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '12%',
            top: 30,
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: $this.xData
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '成本',
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  color: 'rgb(107, 142, 35)',
                  lineStyle: {
                    color: $this.color
                  }
                }
              },
              data: $this.yData
            }
          ]
        })
      }
    }
  }
</script>
