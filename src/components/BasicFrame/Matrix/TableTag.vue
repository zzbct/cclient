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
            <template v-if="type==='base'">
              <span @click="showInfo(unit.pos,unit.info)" class="infos">证据{{unit.pos}}:</span>
              <span>{{ unit.initial[0] }}->{{ unit.conf[0] }}</span>
            </template>
            <template v-if="type==='sadd'">
              <span>目标{{ unit.name }}:</span>
              <span>{{ unit.virtual }}->{{ unit.conf }}</span>
            </template>
          </p>
        </div>
      </div>
    </div>
    <div class="card" v-if="show">
      <Card>
        <div slot="header">
          <span>{{header}}</span>
          <Button @click='close' style="float: right; padding: 3px 0" type="text">
            <span class="icon-cross"></span>
          </Button>
        </div>
        <div class="text item">
          <p>{{'类型:' + infos.type}}</p>
          <p>{{'位置:' + infos.name + infos.chapter}}</p>
          <p>{{'页码:' + infos.startPage + '-' + infos.endPage}}</p>
          <p>{{'载体:' + infos.carrier}}</p>
          <p>{{'证据来源:' + infos.eviSource}}</p>
          <p>{{'证据收集者对该活动的熟知程度:' + infos.eviFamiliarity}}</p>
          <p>{{'证据收集者对该证据支持能力的评估:' + infos.eviSuppAccess}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>
<style scoped>
  .view {
    position: relative;
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
  .infos {
    font-weight: bolder;
    color: rgb(64, 158, 255);
    cursor: pointer;
  }
  .card {
    position: absolute;
    top: -20px;
    right: -280px;
    width: 280px;
    background-color: rgba(0,0,0,0.6);
    z-index: 1;
  }
  .item {
    font-size: 12px;
    text-align: left;
    padding: 0;
  }
  item>p {
    margin: 0;
  }
</style>
<script>
  import {Button, Card} from 'element-ui'
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
        infos: {},
        show: false,
        header: null
      }
    },
    components: {
      Button,
      Card
    },
    mounted () {
      // this.close()
    },
    methods: {
      showInfo (pos, infos) {
        this.show = true
        this.infos = infos
        this.header = `证据${pos}`
      },
      close () {
        this.show = false
      }
    }
  }
</script>
