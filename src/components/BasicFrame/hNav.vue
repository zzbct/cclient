<template>
  <div class="hnav-view">
    <div :class="target === 'mp'? 'locked' : 'active'">
      <router-link to="/">主页面</router-link>
    </div>
    <div :class="target === 'dr'? 'locked' : 'active'">
      <router-link to="/data">数据准备</router-link>
    </div>
    <div :class="target === 'gm'? 'locked' : 'active'">
      <router-link to="/manage">目标管理</router-link>
    </div>
  </div>
</template>
<style scoped>
  a {
    text-decoration: none;
  }

  .hnav-view {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: #f7c106;
    font-size: 20px;
  }

  .hnav-view>div {
    flex-grow: 1;
    padding: 0 10px;
    line-height: 60px;
  }

  .locked {
    position: relative;
    background-color: #ef8614;
  }

  .locked:after {
    content:"";
    width:100%;
    height:4px;
    background-color: black;
    position: absolute;
    top:0;
    left: 0;
  }
</style>
<script>
  export default{
    props: {
      target: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
