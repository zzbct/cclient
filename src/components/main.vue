<template>
  <div>
    <!--导航-->
    <hNav target="mp"></hNav>
    <!--图视-->
    <div class="art">

    </div>
    <div>
      目标总数79 证据项200
    </div>
    <!--可视化信息概览-->
    <div>
      <!--目标论证状态（环形图表）-->
      <div></div>
      <!--各审定范围目标数（条形图表）-->
      <div></div>
      <!--达到审定要求目标数占比（环形图表）-->
      <div></div>
    </div>
  </div>
</template>
<style scoped>
  .art {
    margin-top: 20px;
  }
  .red {
    height: 90px;
    background-color: red;
  }
  .yellow {
    height: 20px;
    background-color: yellow;
  }
</style>
<script>
  import hNav from '@/components/BasicFrame/hNav'
  export default{
    data () {
      return {
      }
    },
    components: {
      hNav
    },
    methods: {
    }
  }
</script>
