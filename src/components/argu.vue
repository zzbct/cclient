<!--目标管理子页--目标论证页-->
<template>
  <div>
    <ENav>目标管理</ENav>
    <div class="title">>
      目标论证页--{{ goal.CheckItem }}
      <button @click="argu">执行论证</button>
      <button @click="addEvi">新增证据</button>
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
        <!--原有证据相关信息-->
        <div class="evi">
          <div class="evi-head">
            <div class="evi-discribe">证据描述</div>
            <div class="evi-confidence">证据置信度</div>
            <div class="evi-parent">直接论证目标项</div>
          </div>
          <div class="evi-body scroll">
            <div class="evi-item" v-for="item in evis">
              <div v-if="item.type === 'old'" class="evi-discribe">
                <p>类型：{{ item.eviBody.type }}</p>
                <p>位置：{{ item.eviBody.name }}-{{item.eviBody.chapter }}节</p>
                <p>页码：{{ item.eviBody.startPage }}-{{ item.eviBody.endPage }}</p>
                <p v-if="item.eviBody.details">细节说明：{{ item.eviBody.details }}</p>
                <p>'载体:'{{ item.eviBody.carrier }}</p>
                <p>证据来源：{{ item.eviBody.eviSource }}</p>
                <p>证据收集者对该活动的熟知程度：{{ item.eviBody.eviFamiliarity }}</p>
                <p>证据收集者对该证据支持能力的评估：{{ item.eviBody.eviSuppAccess }}</p>
              </div>
              <div v-if="item.type === 'new'" class="evi-discribe">
                <p>{{ item.text }}</p>
              </div>
              <div class="evi-confidence">
                <p><span class="evi-confidence-1">通过{{ item.pass }}</span></p>
                <p><span class="evi-confidence-2">不通过{{ item.fail }}</span></p>
                <p><span class="evi-confidence-3">不确定{{ item.uncertain }}</span></p>
              </div>
              <div class="evi-parent evi-parent1">{{ item.eviItem }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="argu-goal scroll">
        <div class="argu-goal-head">子目标集</div>
        <div class="argu-goal-body">
          <ElmInput placeholder="输入关键字进行过滤" v-model="filterText"></ElmInput>
          <Tree :data="treeData" :filter-node-method="filterNode" ref="tree"></Tree>
<!--
          <p v-for="(sub, index) in subs">{{sub.dict}}-{{sub.EviItem}}</p>
-->
        </div>
      </div>
    </div>
    <div class="card" v-if="show">
      <Card>
        <div slot="header">
          <span class="header-text">请为以下目标提供必要证据：</span>
          <span @click='close' class="header-icon icon-cross"></span>
        </div>
        <div class="item">
          <p v-for="item in empty">{{ item }}</p>
        </div>
      </Card>
    </div>
    <!--新增证据测试弹窗-->
    <div class="creates" v-if="creates">
      <CreatesEvi @pushEvi="pushEvi" @cancelPush="cancelPush" :datas = "subs"></CreatesEvi>
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
  .evi1 {
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
  .card {
    position: fixed;
    top: 120px;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    border: 1px solid #ccc;
    background-color: rgba(0,0,0,0.6);
    z-index: 1;
  }
  .header-icon {
    float: right;
    padding: 3px 0;
    cursor: pointer;
  }
  .item {
    font-size: 12px;
    text-align: left;
  }
  .item>p {
    margin: 10px 0;
  }
  .creates {
    position: fixed;
    top: 120px;
    left: 50px;
    width: 60%;
    height: 600px;
    padding: 20px;
    background-color: rgba(0,0,0,0.6);
  }
</style>
<script>
  import ENav from '@/components/BasicFrame/ENav'
  import CreatesEvi from '@/components/BasicFrame/CreatesEvi'
  import { Message, Tree, Input, Card } from 'element-ui'
  import Common from '@/js/common.js'

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
        result: null,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        filterText: '',
        empty: [],
        show: false,
        creates: false
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    components: {
      ENav,
      CreatesEvi,
      Tree,
      Card,
      ElmInput: Input
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
                  eviBody: item.evilist,
                  type: 'old'
                }
                result.push(obj)
              })
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
            let data = response.data
            this.treeData.push(data.tree)
            this.subs = data.subs
            console.log(this.subs)
          })
          .catch((reject) => {
            console.log(reject)
          })
      },
      argu () {
        var tmp = []
        this.empty = []
        this.evis.forEach((item) => {
          let pos = Common.AliveInObj(this.subs, 'EviItem', item.eviItem)
          let obj = {
            dict: pos === -1 ? item.dict : this.subs[pos].dict,
            pass: +item.eviBody.pass,
            uncertain: +item.eviBody.uncertain,
            fail: +item.eviBody.fail
          }
          tmp.push(obj)
        })
        this.empty = Common.filterItem(Common.deepIntergrity(this.treeData[0], tmp))
        if (this.empty.length) {
          this.show = true
          this.result = 0
        } else {
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
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      close () {
        this.show = false
      },
      addEvi () {
        this.creates = true
      },
      pushEvi (data) {
        console.log(data)
        this.evis = this.evis.concat(data)
        this.creates = false
      },
      cancelPush () {
        this.creates = false
      }
    }
  }
</script>
