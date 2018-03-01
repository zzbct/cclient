<!--目标管理子页--目标论证页-->
<template>
  <div>
    <ENav>目标管理</ENav>
    <div class="title">>
      目标论证页--{{ goal.CheckItem }}
      <button @click="argu">执行论证</button>
    </div>
    <div class="argu">
      <div class="argu-info">
        <!--目标相关信息-->
        <div class="info-tag">
          <div class="tag-block">
            <div class="block-head">目标审定结果阈值</div>
            <div class="block-body">{{ goal.threshold }}</div>
          </div>
          <div class="tag-block scroll-x">
            <div class="block-head">论证模式</div>
            <div class="block-body">
              <div>
                <span>{{ mode }}</span>
              </div>
            </div>
          </div>
          <div class="tag-block">
            <div class="block-head">目标审定结果</div>
            <div class="block-body">{{ result }}</div>
          </div>
        </div>
        <!--证据相关信息-->
        <div class="evi">
          <div class="evi-head">
            <div class="evi-discribe">证据描述</div>
            <div class="evi-confidence">证据置信度</div>
            <div class="evi-parent">直接论证目标项</div>
          </div>
          <div class="evi-body scroll">
            <div class="evi-item" v-for="item in evis">
              <div class="evi-discribe">
                <p>类型：{{ item.eviBody.type }}</p>
                <p>位置：{{ item.eviBody.name }}-{{item.eviBody.chapter }}节</p>
                <p>页码：{{ item.eviBody.startPage }}-{{ item.eviBody.endPage }}</p>
                <p v-if="item.eviBody.details">细节说明：{{ item.eviBody.details }}</p>
                <p>'载体:'{{ item.eviBody.carrier }}</p>
                <p>证据来源：{{ item.eviBody.eviSource }}</p>
                <p>证据收集者对该活动的熟知程度：{{ item.eviBody.eviFamiliarity }}</p>
                <p>证据收集者对该证据支持能力的评估：{{ item.eviBody.eviSuppAccess }}</p>
              </div>
              <div class="evi-confidence">
                <p><span class="evi-confidence-1">满足{{ item.eviBody.pass }}</span></p>
                <p><span class="evi-confidence-2">不满足{{ item.eviBody.fail }}</span></p>
                <p><span class="evi-confidence-3">不确定{{ item.eviBody.uncertain }}</span></p>
              </div>
              <div class="evi-parent evi-parent1">{{ item.eviItem }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="argu-goal scroll">
        <div class="argu-goal-head">子目标集</div>
        <div class="argu-goal-body">
          <p v-for="(sub, index) in subs">{{sub.dict}}-{{sub.EviItem}}</p>
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
    width: 80px;
    height: 30px;
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
    margin-left: 60px;
    width: 58%;
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
    word-break: break-all;
    font-size: 14px;
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
    overflow: auto;
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
    width: 16%;
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
  .evi-parent {
    width: 44%;
  }
  .evi-parent1 {
    margin-top: 20px;
  }
</style>
<script>
  import ENav from '@/components/BasicFrame/ENav'
  import { Message } from 'element-ui'

  export default{
    data () {
      return {
        evidences: null,
        subs: null,
        goal: {
          CheckItem: null,
          threshold: null
        },
        evis: null,
        mode: null,
        result: null
      }
    },
    components: {
      ENav
    },
    created () {
      var cId = this.$route.query.cId
      var id = localStorage.getItem('ID')
      var auth = localStorage.getItem('Auth')
      this.goalInfo(cId)
      this.eviInfo(cId, id, auth)
      this.subsInfo(cId)
    },
    methods: {
      eviInfo (cId, id, auth) {
        this.$http.get('/server/users/argu/evis', {
          params: {
            cId: cId,
            id: id,
            auth: auth
          }
        })
          .then((response) => {
            // 响应成功回调
            var body = response.body.ItemForm
            var tmp = []
            var result = []
            if (body.eviForm && body.eviForm.length) {
              tmp = body.eviForm
              tmp.forEach(function (item) {
                var obj = {
                  eviID: item.eviID,
                  eviItem: item.eviItem,
                  eviBody: item.evilist
                }
                result.push(obj)
              })
            } else {
              if (confirm('请先为该目标提供支撑证据！')) {
                this.$router.push({ path: '/manage' })
              }
            }
            this.evis = result
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
            this.mode = this.goal.mode
            this.result = this.goal.result
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
            let i = 0
            let dict = null
            this.subs = response.data.reduce((pre, cur) => {
              return pre.concat(cur.EviItem.split(';').map((item) => {
                if (cur.dict.indexOf('s') === -1) {
                  i++
                  dict = i
                } else {
                  dict = cur.dict
                }
                return {EviItem: item, dict: dict, eviID: cur.eviID}
              }))
            }, [])
          })
          .catch((reject) => {
            console.log(reject)
          })
      },
      argu () {
        var tmp = []
        this.evis.forEach((item) => {
          let dict
          for (var i = 0; i < this.subs.length; i++) {
            let unit = this.subs[i]
            if (unit.eviID === item.eviID) {
              dict = i + 1
              break
            }
          }
          let obj = {
            dict: dict,
            pass: +item.eviBody.pass,
            uncertain: +item.eviBody.uncertain,
            fail: +item.eviBody.fail
          }
          tmp.push(obj)
        })
        var param = {
          mode: this.mode,
          refItem: this.$route.query.cId,
          confidenceInfo: tmp
        }
        this.$http.post('/server/users/argu/results', param)
          .then((response) => {
            // 响应成功回调
            let data = response.data
            if (data.code === 200) {
              this.result = data.result
              Message.success({
                message: '完成论证',
                duration: 1000
              })
            } else {
              Message.error({
                message: '论证失败',
                duration: 1000
              })
            }
          })
          .catch((reject) => {
            console.log(reject)
          })
      }
    }
  }
</script>
