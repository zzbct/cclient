<template>
  <div>
    <!--导航-->
    <HNav target="mp"></HNav>
    <!--图视-->
    <div class="art">

    </div>
    <div>
      目标总数79 证据项200
    </div>
    <!--可视化信息概览-->
    <div>
      <!--目标论证状态（环形图表）-->
      <div>
        <Toroidal :percent='20' stroke-color='#43a3fa'></Toroidal>
      </div>
      <!--各审定范围目标数（条形图表）-->
      <div></div>
      <!--达到审定要求目标数占比（环形图表）-->
      <div>
        <Pie  ref='pie'></Pie>
      </div>
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
  import HNav from '@/components/BasicFrame/HNav'
  import Toroidal from '@/components/BasicFrame/Toroidal'
  import Pie from '@/components/BasicFrame/Pie'
  export default{
    data () {
      return {

      }
    },
    components: {
      HNav,
      Toroidal,
      Pie
    },
    mounted () {
      var data = [{value: 10, name: '未论证'}, {value: 90, name: '已论证'}]
      this.$refs.pie.$emit('bridge', data)
    },
    methods: {
    }
  }
</script>
