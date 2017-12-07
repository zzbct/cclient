<template>
  <div class="selector">
    <div class="imitate-title">{{title}}</div>
    <div class="imitate-select">
      <button @click="control" class="btn select-view" type="button" aria-haspopup="true" aria-expanded="false">
        {{target}}
        <span class="icon-caret-down"></span>
      </button>
      <div :class="show? 'imitate-shape' : 'hiden'">
        <span></span>
        <span class="triangle"></span>
      </div>
      <div :class="show? 'option-view' : 'hiden'">
        <div @click="lockTarget(opt)" v-for="opt in options" class="option-item" :class="target === opt ? 'selected': ''">{{ opt }}</div>
      </div>
    </div>
  </div>

</template>
<style scoped>
  .selector {
    display: flex;
    justify-content: space-between;
  }
  .imitate-title {
    margin: 0 10px;
    height: 30px;
    line-height: 30px;
  }
  .imitate-select {
    width: 100px;
  }
  .select-view {
    width: 100%;
    margin-bottom: 6px;
    color: #acacb0;
    background-color: #444350;
    border-color: #444350;
    border-radius: 4px;
  }
  .btn {
    padding: 6px 4px;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
    user-select: none;
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .hiden {
    visibility: hidden;
  }

  .select-view:hover {
    color: #0083e3;
    background-color: #5c5a6c;
    border-color: #5c5a6c;
  }

  .imitate-shape {
    text-align: center;
  }

  .triangle {
    position: absolute;
    margin-left: -4px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid #fff;
  }

  .option-view{
    margin-top: 6px;
    padding: 0 0;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    box-shadow: 0px 3px 10px #ccc;
    overflow: hidden;
  }

  .option-item {
    padding: 5px 15px;
    text-align: center;
    white-space: nowrap;
    user-select: none;
    color: #292b2c;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
  .option-item:hover {
    cursor: pointer;
  }
  .option-item:last-child{
    border-bottom: 0;
  }
  .selected {
    background-color: #0083e3;
    color: #fff;
  }
</style>
<script>
  export default{
    props: {
      title: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: ''
      }
    },
    data () {
      return {
        target: 'all',
        show: false
      }
    },
    components: {
    },
    methods: {
      lockTarget(opt) {
        this.target = opt;
        this.show = !this.show;
      },

      control() {
        this.show = !this.show;
      }
    }
  }
</script>
