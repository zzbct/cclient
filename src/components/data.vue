<template>
  <div>
    <!--导航-->
    <hNav target="dr"></hNav>
    <!--筛选区-->
    <div class="data-filter">
      <Selector title="审定阶段" :options="opSet0"></Selector>
      <Selector title="目标类型" :options="opSet1"></Selector>
      <Selector title="阈值状态" :options="opSet2"></Selector>
    </div>
    <!--数据展示编辑区-->
    <div>

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
</style>
<script>
  import hNav from '@/components/BasicFrame/hNav'
  import Selector from '@/components/BasicFrame/Selector'
  export default{
    data () {
      return {
        opSet0: ['all','SOI1','SOI2','SOI3','SOI4'],
        opSet1: ['all','标准','自定义'],
        opSet2: ['all','未设定','已设定']
      }
    },
    components: {
      hNav,
      Selector
    },
    methods: {
    }
  }
</script>
