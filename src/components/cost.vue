<!--证据收集成本分析-->
<template>
  <div>
    <HNav target="gm">目标管理</HNav>
    <div class="title">>
      证据收集分析页--{{ static.heckItem }}
      <button @click="cost">执行分析</button>
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
          <p>待提升证据数： 3/12</p>
          <p>总提升成本：120</p>
        </div>
      </div>
      <div class="argu-info">
        <!--证据相关信息-->
        <div class="evi">
          <div class="evi-head">
            <div class="evi-discribe">证据描述</div>
            <div class="evi-confidence">证据置信度当前值</div>
            <div class="evi-confidence">证据置信度期望值</div>
            <div class="evi-math">证据收集成本公式</div>
            <div class="evi-cost">提升成本</div>
          </div>
          <div class="evi-body scroll">
            <div class="evi-item">
              <div class="evi-discribe">
                <p>类型：</p>
                <p>位置：1-2节</p>
                <p>页码：1-2</p>
                <p>细节说明：</p>
                <p>证据来源：</p>
                <p>证据收集者对该活动的熟知程度：</p>
                <p>证据收集者对该证据支持能力的评估：</p>
              </div>
              <div class="evi-confidence">
                <p><span class="evi-confidence-1">满足0.8</span></p>
                <p><span class="evi-confidence-2">不满足0.1</span></p>
                <p><span class="evi-confidence-3">不确定0.1</span></p>
              </div>
              <div class="evi-confidence">
                <p><span class="evi-confidence-1">满足0.87</span></p>
                <p><span class="evi-confidence-2">不满足0.1</span></p>
                <p><span class="evi-confidence-3">不确定0.03</span></p>
              </div>
              <div class="evi-math">
                <p>成本公式</p>
              </div>
              <div class="evi-cost">
                <p>24</p>
              </div>
            </div>
          </div>
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
    font-size: 20px;
  }
  .title>button {
    width: 80px;
    height: 30px;
    border-radius: 7px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #358fcb;
    color: #fff;
  }
  .title>button:hover {
    background-color: #ef8614;
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
    background-color: #358fcb;
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
    box-shadow: 3px 0 1px #358fcb inset;
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
    min-height: 180px;
    max-height: 210px;
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
</style>
<script>
  import HNav from '@/components/BasicFrame/HNav'

  export default{
    data () {
      return {
        static: {
          CheckItem: null,
          threshold: null,
          result: null,
          total: null
        }
      }
    },
    components: {
      HNav
    },
    created () {
      var cId = this.$route.query.cId
      var id = localStorage.getItem('ID')
      var auth = localStorage.getItem('Auth')
      this.staticInfo(cId, id, auth)
    },
    methods: {
      staticInfo (cId, id, auth) {
        this.$http.get('/server/users/cost/static', {
          params: {
            cId: cId,
            id: id,
            auth: auth
          }
        })
          .then((response) => {
            // 响应成功回调
            // 响应成功回调
            this.static = response.data
          })
          .catch((reject) => {
            console.log(reject)
          })
      },
      cost () {}
    }
  }
</script>
