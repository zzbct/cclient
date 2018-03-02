<!--显示动态规划成本矩阵-->
<template>
  <div class="view scroll">
    <div class="unit">
      <div class="title">
        <span class="circle c1">1</span>
        <span>提升建议</span>
        <span v-if="chart" @click="slider">图</span>
        <span v-if="!chart" @click="slider">表</span>
      </div>
      <div class="piece">
        <span v-for="item in first">目标{{ item.name }} : {{ item.virtual }}->{{ item.conf }}</span>
      </div>
    </div>
    <div class="unit">
      <div class="title">
        <span class="circle c2">2</span>
        <span>基本矩阵</span>
      </div>
      <div class="tag-p scroll" >
        <div class="tag-c" v-for="(item, index) in matrixB">
          <ELine v-if="chart" :pos="index" :datas="item"></ELine>
          <TableTag v-if="!chart" :matrixData="item" type="base"></TableTag>
        </div>
      </div>
    </div>
    <div class="unit">
      <div class="title">
        <span class="circle c3">3</span>
        <span>拓展矩阵</span>
      </div>
      <div  class="tag-p scroll" >
        <div class="tag-c" v-for="(item,index) in matrixS">
          <ELine v-if="chart" :pos="index" :external="matrixB" :datas="item"></ELine>
          <TableTag  v-if="!chart" :matrixData="item" type="sadd"></TableTag>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .view {
    padding: 5px;
  }
  .unit {
    padding: 5px 0;
    border-bottom: 1px solid #f7c106;
  }
  .circle {
    margin-right: 5px;
    padding: 2px 6px;
    border-radius: 10px;
  }
  .c1 {
    background-color: olivedrab;
  }
  .c2 {
    background-color: palevioletred;
  }
  .c3 {
    background-color: #f7c106;
  }
  .title {
    height: 30px;
    line-height: 30px;
    font-weight: bold;
  }
  .piece {
    display: flex;
    justify-content: start;
    flex-wrap: nowrap;
  }
  .piece>span {
    display: inline-block;
    margin: 5px;
    padding: 3px;
    color: white;
    background-color: olivedrab;
  }
  .piece>span:nth-of-type(even) {
    background-color: palevioletred;
  }
  .tag-p {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 235px;
    overflow: auto;
  }
  .tag-c {
    margin-top: 10px;
  }
</style>
<script>
  import TableTag from '@/components/BasicFrame/Matrix/TableTag'
  import ELine from '@/components/BasicFrame/ELine'

  export default{
    props: {
      first: {
        type: Array,
        default: []
      },
      matrixB: {
        type: Array,
        default: []
      },
      matrixS: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        chart: false
      }
    },
    components: {
      TableTag,
      ELine
    },
    methods: {
      slider () {
        this.chart = !this.chart
      }
    }
  }
</script>
