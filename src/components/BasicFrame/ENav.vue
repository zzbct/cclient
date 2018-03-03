<template>
  <div>
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      background-color="#409eff"
      text-color="#ccc"
      active-text-color="#fff"
      router>
      <el-menu-item class="item-customer it1" index="/data">
        <span class="icon-database"></span>
        <span class="nav-icon">数据准备</span>
      </el-menu-item>
      <el-menu-item class="item-customer" index="/manage">
        <span class="icon-user-tie"></span>
        <span class="nav-icon">目标管理</span>
      </el-menu-item>
      <span @click="powerOn" class="icon-switch switch-common" title="注销"></span>
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
  .nav-icon {
    margin-left: 3px;
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
