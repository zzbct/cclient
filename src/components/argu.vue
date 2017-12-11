<!--目标管理子页--目标论证页-->
<template>
  <div>
    <HNav target="gm">目标管理</HNav>
    <h1>目标论证页</h1>
    <!--目标相关信息-->
    <div>
      <div class="info-block">
        <div class="block-head">顶级论证目标</div>
        <div class="block-body">目标描述</div>
      </div>
      <div class="info-block">
        <div class="block-head">目标审定结果阈值</div>
        <div class="block-body">阈值数</div>
      </div>
      <div class="info-block">
        <div class="block-head">论证模式</div>
        <div class="block-info">
          <div>
            <span>(1|2)&3&4</span>
            <span>查看详情</span>
          </div>
          <div>
            <p>1-软件开发过程活动(a)</p>
            <p>2-软件开发过程活动(b)</p>
            <p>3-软件开发过程活动(c)</p>
            <p>4-软件开发过程活动(d)</p>
          </div>
        </div>
      </div>
    </div>
    <!--证据相关信息-->
    <div>
      <div>
        <div class="evi-discribe">证据描述</div>
        <div class="evi-confidence">证据置信度</div>
        <div class="evi-parent">直接论证目标项</div>
      </div>
      <div>
        <div>
          <div class="evi-evidence"></div>
          <div class="evi-confidence"></div>
          <div class="evi-parent"></div>
        </div>
      </div>
    </div>
    <div>
      <button>执行论证</button>
      <button>查看论证详细</button>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
  import HNav from '@/components/BasicFrame/HNav'
  export default{
    data () {
      return {
      }
    },
    components: {
      HNav
    },
    methods: {
    }
  }
</script>
