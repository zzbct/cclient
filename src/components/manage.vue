<template>
  <div>
    <!--导航-->
    <HNav target="gm"></HNav>
    <!--筛选区-->
    <div class="data-filter">
      <Selector title="审定阶段" :options="opSet0" @select="updateStage"></Selector>
      <Selector title="目标类型" :options="opSet1" @select="updateCharacter"></Selector>
      <Selector title="论证状态" :options="opSet2" @select="updateState"></Selector>
      <Selector title="论证结果" :options="opSet3" @select="updateResult"></Selector>
    </div>
    <!--数据展示管理区-->
    <div class="data-view">
      <div class="flex-style">
        <div class="discribe">目标描述</div>
        <div class="stage">审定阶段</div>
        <div class="character">目标类型</div>
        <div class="state">论证状态</div>
        <div class="result">论证结果</div>
        <div class="operator">操作</div>
      </div>
      <div class="view-body scroll">
        <div class="flex-style" v-for="(item,index) in goals">
          <div class="discribe" :title="item.CheckItem">{{ item.CheckItem }}</div>
          <div class="stage">{{ item.Stage }}</div>
          <div class="character">{{ item.Customize }}</div>
          <div class="state">{{ item.state}}</div>
          <div class="result">{{ item.result }}</div>
          <div class="operator">
            <span class="opt1">
              <router-link to="/argu">进入论证</router-link>
            </span>
            <span class="opt2" v-if="item.result!=='无'">查看论证信息反馈</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .data-filter {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    margin: 50px auto;
    width: 90%;
  }
  .data-view {
    margin: 0 auto;
    width: 90%;
  }
  .view-head {

  }
  .view-body {
    margin: 20px 0;
    height: 400px;
    box-sizing: border-box;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    overflow: auto;
  }
  .flex-style {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: left;
  }
  .flex-style>div {
    height: 40px;
    line-height: 40px;
  }
  .discribe {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stage {
    width: 6%;
  }
  .character {
    width: 6%;
  }
  .state {
    width: 7%;
  }
  .result {
    width: 9%;
  }
  .operator {
    width: 12%;
  }
  .operator>span {
    cursor: pointer;
    font-size: 12px;
    color: #444350;
  }
  .opt1:hover {
    color: white;
    background-color:#009DD9;
  }
  .opt2:hover {
    color: white;
    background-color: darkblue;
  }
</style>
<script>
  import HNav from '@/components/BasicFrame/HNav'
  import Selector from '@/components/BasicFrame/Selector'

  export default{
    data () {
      return {
        opSet0: ['all', 'SOI1', 'SOI2', 'SOI3', 'SOI4'],
        opSet1: ['all', '标准', '自定义'],
        opSet2: ['all', '未论证', '已论证'],
        opSet3: ['all', '未达到要求', '达到要求'],
        stage: 'all',
        character: 'all',
        state: 'all',
        result: 'all',
        goals: null
      }
    },
    components: {
      HNav,
      Selector
    },
    created () {
      this.getGoals()
    },
    methods: {
      getGoals () {
        // 从compliance tool database获取目标
        this.$http.get('/server/users/goals', {
          params: {
            stage: this.stage,
            character: this.character,
            state: this.state,
            result: this.result
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
      updateStage (msg) {
        this.stage = msg
        this.getGoals()
      },
      updateCharacter (msg) {
        this.character = msg
        this.getGoals()
      },
      updateState (msg) {
        this.state = msg
        this.getGoals()
      },
      updateResult (msg) {
        this.result = msg
        this.getGoals()
      }
    }
  }
</script>
