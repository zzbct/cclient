<template>
  <div class="view">
    <div class="title">新增证据</div>
    <div class="evi">
      <div class="evi-body scroll">
        <div class="evi-item" v-for="(item,index) in evis">
          <div class="num">新增{{ index+1 }}</div>
          <div class="context">
            <div class="flex">
              <label class="flex-left left1" for="eviItem">直接论证目标项</label>
              <div class="flex-right">
                <ElmSelect name="eviItem" v-model="item.goal" size="mini" placeholder="选择直接论证目标项">
                  <ElmOption
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                   >
                  </ElmOption>
                </ElmSelect>
              </div>
            </div>
            <div class="flex">
              <label class="flex-left" for="discribe">证据描述</label>
              <div class="flex-right">
                <ElmInput v-model="item.text" name="discribe" size="mini" type="textarea" :rows="2"></ElmInput>
              </div>
            </div>
            <div class="flex">
              <div class="flex-left">证据置信度</div>
              <div class="flex-right1">
                <ElmInput v-model="item.pass" size="mini" placeholder="通过" title="通过" clearable></ElmInput>
                <ElmInput class="flex-right1-mid" v-model="item.fail" size="mini" placeholder="不通过"  title="不通过" clearable></ElmInput>
                <ElmInput v-model="item.uncertain" size="mini" placeholder="不确定" title="不确定"  clearable></ElmInput>
              </div>

            </div>
          </div>
          <div class="btn operate"><span @click="del(index)">-删除证据</span></div>
        </div>
      </div>
      <div class="btn add">
        <span @click="add">+新增证据</span>
      </div>
      <div class="btn submit">
        <ElmButton size="mini" @click="pushs">确定</ElmButton>
        <ElmButton size="mini" @click="cancels">取消</ElmButton>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .view {
    background-color: white;
  }
  .evi {
    font-size: 14px;
  }
  .evi-body {
    max-height: 370px;
    overflow: auto;
  }
  .title{
    height: 60px;
    line-height: 60px;
  }
  .evi-item{
    display: flex;
    height: 160px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .num, .operate {
    width: 8%;
    padding: 0 10px;
    line-height: 160px;
  }
  .context {
    flex-grow: 1;
  }
  .flex {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .flex-left {
    width: 23%;
    text-align: left;
  }
  .flex-right, flex-right1 {
    flex-grow: 1;
  }
  .flex-right>div {
    width: 100%;
  }
  .flex-right1 {
    display: flex;
    justify-content: space-around;
  }
  .flex-right1-mid {
    margin: 0 25px;
  }
  .left1 {
    line-height: 30px;
  }
  .btn {
    color: blue;
    cursor: pointer;
  }
  .add {
    height: 40px;
    padding: 0 10px;
    margin-left: 8%;
    line-height: 40px;
    text-align: left;
  }
  .submit {
    height: 40px;
    line-height: 40px;
  }
</style>
<script>
  import {Select, Option, Input, Steps, Step, Button} from 'element-ui'
  export default{
    data () {
      return {
        evis: []
      }
    },
    props: {
      datas: {
        type: Array,
        default: []
      }
    },
    computed: {
      options () {
        let arr = []
        this.datas.forEach(item => {
          if (item.dict.indexOf('s') === -1) {
            arr.push({value: item.dict + ':' + item.EviItem, label: item.dict + ':' + item.EviItem})
          } else {
            arr.push({value: item.dict + ':' + item.EviItem, label: item.dict + ':' + item.EviItem, disabled: true})
          }
        })
        return arr
      }
    },
    components: {
      ElmSelect: Select,
      ElmOption: Option,
      ElmInput: Input,
      ElmButton: Button,
      Steps,
      Step
    },
    methods: {
      add () {
        this.evis.push({text: '', pass: 1, fail: 0, uncertain: 0, eviItem: ''})
      },
      del (idx) {
        this.evis.splice(idx, 1)
      },
      pushs () {
        let data = []
        this.evis.forEach(item => {
          let s = item.goal.split(':')
          data.push(
            {
              type: 'new',
              dict: s[0],
              eviItem: s[1],
              text: item.text,
              eviBody: {
                pass: item.pass,
                fail: item.fail,
                uncertain: item.uncertain
              }
            })
        })
        this.$emit('pushEvi', data)
      },
      cancels () {
        this.$emit('cancelPush')
      }
    }
  }
</script>
