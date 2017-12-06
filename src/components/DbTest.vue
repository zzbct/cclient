<template>
  <div>
    <h1>DB接口测试</h1>
    <hr>
    <div>
      <h2>查看目标</h2>
      <div class="one-row">
        <div>
          <span>审定阶段</span>
          <select v-model="stage">
            <option selected>all</option>
            <option>SOI1</option>
            <option>SOI2</option>
            <option>SOI3</option>
            <option>SOI4</option>
          </select>
        </div>
        <div>
          <span>类型</span>
          <select v-model="character">
            <option selected>all</option>
            <option value="2">标准</option>
            <option value="1">自定义</option>
          </select>
        </div>
        <div>
          <button @click="getGoals">获取目标</button>
        </div>
      </div>
      <div class="text-pool">
        <div v-for="(goal, index) in goals">
          {{ index }}: {{ goal.CheckItem }}
        </div>
      </div>
    </div>
    <div>
      <h2>查看子目标</h2>
      <div class="one-row">
        <div>
          <span>父目标</span>
          <input type="text" v-model="queryP">
        </div>
        <div>
          <button @click="getSubGoals">获取目标</button>
        </div>
      </div>
      <div class="text-pool">
        <div v-for="(goal, index) in subGoals">
          {{ index }}: {{ goal.EviItem }}
        </div>
      </div>
    </div>
    <div>
      <h2>查看证据</h2>
      <div class="one-row">
        <div>
          <span>目标</span>
          <input type="text" v-model="queryP">
        </div>
        <div>
          <button @click="getSubGoals">获取证据</button>
        </div>
      </div>
      <div class="text-pool">
        <div v-for="(evi, index) in Evidences">
          {{ index }}: {{ evi.EviItem }}
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .one-row {
    display: flex;
    width: 60%;
    margin: 0 auto;
    justify-content: space-between;
  }

  .text-pool {
    margin: 50px 0;
    padding: 20px;
    width: auto;
    height: 200px;
    overflow: auto;
    border: 1px solid darkblue;
    text-align: left;
  }
</style>
<script>
  export default{
    data () {
      return {
        stage: null,
        character: null,
        goals: {},
        queryP: null,
        subGoals: {}
      }
    },
    methods: {
      getGoals () {
        // 从compliance tool database获取目标
        this.$http.get('/server/users/goals', {
          params: {
            stage: this.stage,
            character: this.character
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
      getSubGoals () {
        // 从compliance tool database获取目标
        this.$http.get('/server/users/subgoals', {
          params: {
            parent: this.queryP
          }
        })
          .then((response) => {
            // 响应成功回调
            console.log(response)
            this.subGoals = response.data
          })
          .catch((reject) => {
            console.log(reject)
          })
      }
    }
  }
</script>
