<template>
  <div>
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      background-color="#409eff"
      text-color="#ccc"
      active-text-color="#fff"
      router>
      <el-menu-item class="item-customer it1" index="/data">数据准备</el-menu-item>
      <el-menu-item class="item-customer" index="/manage">目标管理</el-menu-item>
      <span @click="powerOn" class="icon-switch switch-common"></span>
    </el-menu>
  </div>
</template>
<style scoped>
  a {
    text-decoration: none;
  }
  .item-customer {
    width: 10%;
  }
  .it1 {
    margin-left: 50px;
  }
  .switch-common {
    float: right;
    margin-right: 150px;
    line-height: 60px;
    color: white;
  }
  .switch-common:hover {
    color: red;
    cursor: pointer;
  }
</style>
<script>
import {Menu, MenuItem} from 'element-ui'
export default{
  data () {
    return {
    }
  },
  components: {
    elMenu: Menu,
    elMenuItem: MenuItem
  },
  methods: {
    powerOn () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
