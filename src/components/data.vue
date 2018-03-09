<template>
  <div>
    <!--导航-->
    <ENav></ENav>
    <!--筛选区-->
    <div class="data-filter">
      <Selector title="审定阶段" :options="opSet0" @select="updateStage"></Selector>
      <Selector title="目标类型" :options="opSet1" @select="updateCharacter"></Selector>
      <Selector title="阈值状态" :options="opSet2" @select="updateThreshold"></Selector>
    </div>
    <!--数据展示编辑区-->
    <div class="data-view">
      <div class="flex-style">
        <div class="discribe">目标描述</div>
        <div class="stage">审定阶段</div>
        <div class="character">目标类型</div>
        <div class="threshold">阈值状态</div>
      </div>
      <div class="view-body scroll">
        <div class="flex-style" v-for="(item,index) in goals">
          <div class="discribe" :title="item.CheckItem">{{ item.CheckItem }}</div>
          <div class="stage">{{ item.Stage }}</div>
          <div class="character">{{ item.Customize }}</div>
          <div class="threshold">
            <template v-if="item.writable">
              <input v-model="item.threshold">
              <span @click="post(item,index)" class="icon-checkmark"></span>
              <span @click="cancel(index)" class="icon-cross"></span>
            </template>
            <template v-else>
              <input class="locked" readonly v-model="item.threshold" >
              <span @click="edit(index)" class="icon-pencil"></span>
            </template>
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
    width: 80%;
  }
  .data-view {
    margin: 0 auto;
    width: 80%;
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
    width: 64%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stage {
    width: 12%;
  }
  .character {
    width: 12%;
  }
  .threshold {
    width: 12%;
  }
  .threshold>input {
    width: 40%;
    outline: none;
    border: none;
  }
  .threshold>span {
    cursor: pointer;
    font-size: 12px;
  }
  .locked {
    color: gray;
  }
</style>
<script>
  import ENav from '@/components/BasicFrame/ENav'
  import Selector from '@/components/BasicFrame/Selector'

  export default{
    data () {
      return {
        opSet0: ['all', 'SOI1', 'SOI2', 'SOI3', 'SOI4'],
        opSet1: ['all', '标准', '自定义'],
        opSet2: ['all', '未设定', '已设定'],
        stage: 'all',
        character: 'all',
        threshold: 'all',
        goals: null
      }
    },
    components: {
      ENav,
      Selector
    },
    computers () {

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
            threshold: this.threshold,
            userID: localStorage.getItem('ID')
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
      updateThreshold (msg) {
        this.threshold = msg
        this.getGoals()
      },
      edit (idx) {
        this.goals[idx].writable = true
      },
      cancel (idx) {
        this.goals[idx].writable = false
      },
      post (data, idx) {
        this.goals[idx].writable = false
        /* 更新单目标阈值 */
        this.$http.post('/server/users/threshold', {
          ID: data.ID,
          threshold: data.threshold !== '未设定' ? data.threshold : null
        })
          .then((response) => {
            // 响应成功回调
            console.log(response)
          })
          .catch((reject) => {
            console.log(reject)
          })
      }
    }
  }
</script>
