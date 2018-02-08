<template>
  <div>
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      @select="handleSelect"
      background-color="#409eff"
      text-color="#ccc"
      active-text-color="#fff"
      router>
      <el-menu-item class="item-customer it1" index="/data">数据准备</el-menu-item>
      <el-menu-item class="item-customer" index="/manage">目标管理</el-menu-item>
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
  }
}
</script>
