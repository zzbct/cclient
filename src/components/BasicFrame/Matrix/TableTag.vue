<template>
  <div class="view">
    <!--title-->
    <div class="title">
      <span  v-if="type==='base'">{{ matrixData.dict }}</span>
      <span  v-if="type==='sadd'">{{ matrixData.EviItem }}</span>
    </div>
    <!--表头-->
    <div class="table-head">
      <div class="hv">hv</div>
      <div class="cost">MinCost</div>
      <div class="advice">advice</div>
    </div>
    <!--内容-->
    <div class="table-body scroll">
      <div class="table-row" v-for="item in matrixData.advice">
        <div class="hv"><p>{{ item.hv }}</p></div>
        <div class="cost"><p>{{ item.cost }}</p></div>
        <div class="advice">
          <p v-for="unit in item.evi">
            <span v-if="type==='base'">目标{{ unit.name }}{{unit.pos}}:{{ unit.initial[0] }}->{{ unit.conf[0] }}</span>
            <span v-if="type==='sadd'">目标{{ unit.name }}:{{ unit.virtual }}->{{ unit.conf }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .view {
    width: 400px;
    background-color: #ccc;
  }
  .title {
    padding-top: 5px;
  }
  .table-head {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 10px;
    text-align: left;
    box-shadow: 0 1px 1px #888;
  }
  .table-body {
    height: 140px;
    margin-top: 5px;
    overflow: auto;
  }
  .table-row {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    text-align: left;
    font-size: 12px;
  }
  .table-row:nth-of-type(even) {
    background-color: lightgray;
  }
  .hv {
    width: 25%;
  }
  .cost {
    width: 25%;
  }
  .advice {
    width: 50%;
  }
  .table-row p {
    margin: 0;
    padding: 0;
    height: 30px;
    line-height: 30px;
  }
</style>
<script>
  export default{
    props: {
      type: {
        type: String,
        default: 'base'
      },
      matrixData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
      }
    },
    components: {
    },
    methods: {
    }
  }
</script>
