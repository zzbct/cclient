<!--证据收集成本分析-->
<template>
  <div>
    <ENav target="gm">目标管理</ENav>
    <div class="title">>
      证据收集分析页--{{ static.heckItem }}
      <button @click="analyse">执行分析</button>
      <button v-if="advice.length" @click="reviewer">回审数据</button>
<!--
      <button v-if="advice.length" @click="additional">“补充证据”建议</button>
-->
    </div>
    <div class="argu">
      <div class="argu-goal scroll">
        <div class="argu-goal-head">信息</div>
        <div class="argu-goal-body">
          <p>目标审定结果当前值：{{static.result }}</p>
          <p>目标审定结果阈值： {{ static.threshold }}</p>
          <p>证据项总数： {{ static.total }}</p>
        </div>
        <div class="argu-goal-head">结果</div>
        <div class="argu-goal-body">
          <p>待提升证据数： {{ advice.length }} / {{static.total}}</p>
          <p>总提升成本：{{ cost }}</p>
        </div>
      </div>
      <div class="argu-info">
        <!--证据相关信息-->
        <div class="evi">
          <div class="evi-head">
            <div class="evi-discribe">证据描述</div>
            <div class="evi-confidence">证据置信度当前值</div>
            <div class="evi-confidence">证据置信度期望值</div>
            <div class="evi-math">受支持目标项</div>
            <div class="evi-cost">提升成本</div>
          </div>
          <div class="evi-body scroll">
            <div class="evi-item" v-for="item in advice">
              <div class="evi-discribe">
                <p>类型：{{ item.info.type }}</p>
                <p>位置：{{ item.info.chapter }}节</p>
                <p>页码：{{ item.info.startPage }}-{{ item.info.endPage }}</p>
                <p>细节说明：{{ item.info.details }}</p>
                <p>'载体:'{{ item.info.carrier }}</p>
                <p>证据来源：{{ item.info.eviSource  }} </p>
                <p>证据收集者对该活动的熟知程度：{{ item.info.eviFamiliarity }}</p>
                <p>证据收集者对该证据支持能力的评估：{{ item.info.eviSuppAccess }}</p>
              </div>
              <div class="evi-confidence">
                <p><span class="evi-confidence-1">通过{{ item.initial[0] }}</span></p>
                <p><span class="evi-confidence-2">不通过{{ item.initial[1] }}</span></p>
                <p><span class="evi-confidence-3">不确定{{ item.initial[2] }}</span></p>
              </div>
              <div class="evi-confidence">
                <p><span class="evi-confidence-1">通过{{ item.conf[0] }}</span></p>
                <p><span class="evi-confidence-2">不通过{{ item.conf[1] }}</span></p>
                <p><span class="evi-confidence-3">不确定{{ item.conf[2] }}</span></p>
              </div>
              <div class="evi-math">
                <p>{{ item.name }}</p>
              </div>
              <div class="evi-cost">
                <p>{{ item.cost }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗-->
    <div class="window" id="wd" v-if="show1||show2">
      <div class="box" id="bx" v-if="show1">
        <Matrix :first="first" :matrixB="matrixB" :matrixS="matrixS" ></Matrix>
      </div>
      <div v-if="show2">
        <div class="chart">
          <ELine></ELine>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .title {
    height: 60px;
    line-height: 60px;
    text-align: left;
    font-size: 16px;
  }
  .title>button {
    height: 30px;
    padding: 0 10px;
    margin: 0 5px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: none;
    cursor: pointer;
    background-color: #fff;
  }
  .title>button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .argu {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
  .argu-info {
    margin-right: 20px;
    width: 70%;
  }
  .argu-goal {
    width: 400px;
    max-height: 700px;
    overflow: scroll;
    background-color: #fff;
  }
  .argu-goal-head {
    height: 60px;
    padding-left: 10px;
    line-height: 60px;
    background-color: #409eff;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }
  .argu-goal-body {
    padding: 0 20px;
  }
  .info-tag {
    display: flex;
    justify-content: space-between;
    margin: 0 auto 20px auto;
  }
  .tag-block {
    width: 26%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 3px 0 1px #409eff inset;
    text-align: left;
  }
  .block-head {
    position: relative;
    width: 60%;
    height: 20px;
    font-weight: bold;
  }
  .block-head:after {
    position: absolute;
    content: '';
    left: 0;
    bottom: -8px;
    width: 100%;
    height: 1px;
    background-color: black;
  }
  .block-body {
    margin-top: 20px;
  }
  .evi {
    background-color: #fff;
  }
  .evi-head {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 20px;
    text-align: left;
    box-shadow: 0 3px 1px #888;
  }
  .evi-body {
    max-height: 700px;
    overflow: auto;
  }
  .evi-item {
    display: flex;
    justify-content: space-between;
    min-height: 220px;
    max-height: 250px;
    padding: 0 20px;
    font-size: 12px;
  }
  .evi-item:nth-of-type(even) {
    background-color: lightgray;
  }
  .evi-discribe {
    width: 40%;
  }
  .evi-confidence {
    width: 20%;
  }
  .evi-confidence span {
    display: inline-block;
    width: 50%;
    height: 28px;
    line-height: 28px;
    font-weight: 600;
  }
  .evi-confidence-1 {
    color: green;
  }
  .evi-confidence-2 {
    color: #358fcb;
  }
  .evi-confidence-3 {
    color: dimgray;
  }
  .evi-math {
    width: 20%;
  }
  .evi-cost {
    width: 15%;
  }
  .window {
    position: fixed;
    top: 68px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
  }
  .box {
    width: 80%;
    margin: 20px auto 0;
    background-color: white;
  }
</style>
<script>
  import ENav from '@/components/BasicFrame/ENav'
  import Matrix from '@/components/BasicFrame/Matrix/matrix'
  import ELine from '@/components/BasicFrame/ELine'
  import { Message } from 'element-ui'

  export default{
    data () {
      return {
        static: {
          CheckItem: null,
          threshold: null,
          result: null,
          total: null
        },
        cId: null,
        id: null,
        auth: null,
        first: [],
        advice: [],
        matrixB: [],
        matrixS: [],
        cost: null,
        show1: false,
        show2: false
      }
    },
    components: {
      ENav,
      Matrix,
      ELine
    },
    created () {
      this.cId = this.$route.query.cId
      this.id = localStorage.getItem('ID')
      this.auth = localStorage.getItem('Auth')
      this.staticInfo()
    },
    mounted () {
      this.close()
    },
    methods: {
      staticInfo () {
        this.$http.get('/server/users/cost/static', {
          params: {
            cId: this.cId,
            id: this.id,
            auth: this.auth
          }
        })
          .then((response) => {
            // 响应成功回调
            this.static = response.data
          })
          .catch((reject) => {
            console.log(reject)
          })
      },
      analyse (cId, id, auth) {
        if (this.static.total === 0) {
          Message.error({
            message: '请先提供证据',
            duration: 1000
          })
          return
        }
        this.$http.get('/server/users/cost/analyse', {
          params: {
            cId: this.cId,
            id: this.id,
            auth: this.auth
          }
        })
          .then((response) => {
            // 响应成功回调
            // this.static = response.data
            let data = response.data
            if (data.code === 200) {
              this.cost = data.cost
              this.first = data.dataTree.first.evi
              this.advice = data.dataTree.res
              this.matrixB = data.dataTree.matrixB
              this.matrixS = data.dataTree.matrixS
              Message.success({
                message: '完成分析',
                duration: 1000
              })
            } else {
              Message.error({
                message: '执行分析失败',
                duration: 1000
              })
            }
          })
          .catch((reject) => {
            console.log(reject)
          })
      },
      reviewer () {
        this.show1 = !this.show1
      },
      additional () {
        // 获取证据绝对成本

        this.show2 = !this.show2
      },
      close () {
        let $this = this
        let parent = document.body
        parent.addEventListener('click', function (e) {
          e = e || window.event
          let target = e.target || e.srcElement
          if (target.className === 'window' && ($this.show1 || $this.show2)) {
            $this.show1 = false
            $this.show2 = false
          }
          e.stopPropagation()
        }, false)
      }
    }
  }
</script>
