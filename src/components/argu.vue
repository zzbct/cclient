<!--目标管理子页--目标论证页-->
<template>
  <div>
    <HNav target="gm">目标管理</HNav>
    <div class="title">>目标论证页<</div>
    <div class="argu">
      <div class="argu-info">
        <!--目标相关信息-->
        <div>
          <div class="info-block">
            <div class="block-head">顶级论证目标</div>
            <div class="block-body">{{ goal.CheckItem }}</div>
          </div>
          <div class="info-block">
            <div class="block-head">目标审定结果阈值</div>
            <div class="block-body">{{ goal.threshold }}</div>
          </div>
          <div class="info-block">
            <div class="block-head">论证模式</div>
            <div class="block-body">
              <div>
                <span>(1|2)&3&4</span>
              </div>
            </div>
          </div>
        </div>
        <!--证据相关信息-->
        <div>
          <div class="evi-head">
            <div class="evi-discribe">证据描述</div>
            <div class="evi-confidence">证据置信度</div>
            <div class="evi-parent">直接论证目标项</div>
          </div>
          <div class="evi-body">
            <div v-for="item in evidences">
              <div class="evi-discribe">
                <p>位置：{{ item.name }}-{{ item.chapter }}节</p>
                <p>页码：{{ item.startPage }}-{{ item.endPage }}</p>
                <p>证据来源：工具/文档</p>
                <p>证据收集者对该活动的熟知程度：精通</p>
                <p>证据收集者对该证据支持能力的评估：较强</p>
              </div>
              <div class="evi-confidence">
                <span>满足0.8</span>
                <span>不满足0.1</span>
                <span>不确定0.1</span>
              </div>
              <div class="evi-parent">{{ item.checkItem }}</div>
            </div>
          </div>
        </div>
        <div>
          <button>执行论证</button>
          <button>查看论证详细</button>
        </div>
      </div>
      <div class="argu-goal scroll">
        <div class="argu-goal-head">子目标集</div>
        <div class="argu-goal-body">
          <p v-for="(sub, index) in subs">{{index}}-{{sub.EviItem}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .title {
    padding: 30px 20px;
    text-align: left;
    font-size: 24px;
  }
  .argu {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
  .argu-info {
    margin-left: 60px;
    width: 55%;
  }
  .argu-goal {
    max-width: 500px;
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
  .info-block {
    margin: 0 auto 20px auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 3px 0 1px #358fcb inset;
    text-align: left;
  }
  .block-head {
    position: relative;
    width: 30%;
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
  .evi-head {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    text-align: left;
  }
  .evi-discribe {
    width: 60%;
  }
  .evi-confidence {
    width: 28%;
  }
  .evi-parent {
    width: 12%;
  }
</style>
<script>
  import HNav from '@/components/BasicFrame/HNav'
  export default{
    data () {
      return {
        evidences: null,
        subs: null,
        goal: null
      }
    },
    components: {
      HNav
    },
    created () {
      var cId = this.$route.query.cId
      // var id = localStorage.getItem('ID')
      // var auth = localStorage.getItem('Auth')
      this.goalInfo(cId)
      // this.arguInfo(cId, id, auth)
      this.subsInfo(cId)
    },
    methods: {
      arguInfo (cId, id, auth) {
        this.$http.get('/server/users/arguInfo', {
          params: {
            cId: cId,
            id: id,
            auth: auth
          }
        })
          .then((response) => {
            // 响应成功回调
            console.log(response)
            this.goals = response.data
          })
          .catch((reject) => {
            console.log(reject)
          })
      },
      goalInfo (cId) {
        this.$http.get('/server/users/argu/goal', {
          params: {
            id: cId
          }
        })
          .then((response) => {
            // 响应成功回调
            this.goal = response.data
          })
          .catch((reject) => {
            console.log(reject)
          })
      },
      subsInfo (cId) {
        this.$http.get('/server/users/argu/subs', {
          params: {
            id: cId
          }
        })
          .then((response) => {
            // 响应成功回调
            this.subs = response.data
          })
          .catch((reject) => {
            console.log(reject)
          })
      }
    }
  }
</script>
