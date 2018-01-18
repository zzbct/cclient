<!--显示动态规划成本矩阵-->
<template>
  <div class="view">
    <div class="unit">
      <div class="title"><span class="circle c1">1</span>提升建议</div>
      <div class="piece">
        <span v-for="item in first">目标{{ item.name }} : {{ item.virtual }}->{{ item.conf }}</span>
      </div>
    </div>
    <div class="unit">
      <div class="title"><span class="circle c2">2</span>基本矩阵</div>
      <div class="tag-p scroll" >
        <div class="tag-c" v-for="item in matrixB">
          <TableTag :matrixData="item" type="base"></TableTag>
        </div>
      </div>
    </div>
    <div class="unit">
      <div class="title"><span class="circle c3">3</span>拓展矩阵</div>
      <div  class="tag-p scroll" >
        <div class="tag-c" v-for="item in matrixS">
          <TableTag :matrixData="item" type="sadd"></TableTag>
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
    padding: 10px 0;
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
    height: 220px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: auto;
  }

</style>
<script>
  import TableTag from '@/components/BasicFrame/Matrix/TableTag'

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
      }
    },
    components: {
      TableTag
    },
    methods: {
    }
  }
</script>
