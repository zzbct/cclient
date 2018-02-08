<!--登录-->
<template>
  <div class="aside">
    <div class="login-area">
      <div class="login-type">用户登录</div>
      <div class="login-content">
        <span class="arrow"></span>
        <div class="info"><input v-model="user" placeholder="用户名"></div>
        <div class="info"><input  @keyup.enter="login" v-model="password" type="password" placeholder="密码"></div>
        <div class="basic"><button @click="login">登录</button></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .aside {
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .login-area {
    position: absolute;
    display: table;
    left: 17%;
    top: 30%;
    width: 66%;
    line-height: 40px;
    margin-bottom: 8px;
  }
  .login-type {
    display: table;
    width: 100%;
    line-height: 40px;
    margin-bottom: 8px;
    font-size: 12px;
    text-align: left;
    color: #fff;
  }
  .login-content {
    position: relative;
  }
  .arrow {
    position: absolute;
    left: 21px;
    top: -7px;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    border-bottom: 7px solid #fff;
    display: inline-block;
    transition: left 0.5s ease;
  }
  .info {
    position: relative;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #e3e4e5;
    background-color: #fff;
    opacity: 0.8;
  }
  .info:first-child {
    border-top: 1px solid #fff;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .info input {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    height: 34px;
    outline: none;
    line-height: 34px;
    border: none;
    font-size: 14px;
  }

  .basic {
    margin-top: 20px;
  }
  .basic>button {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #358fcb;
    border-radius: 2px;
    border: none;
    outline: none;
    cursor: pointer;
    font: 14px bold;
    color: #fff;
  }
</style>
<script>
  export default{
    data () {
      return {
        user: null,
        password: null
      }
    },
    components: {
    },
    methods: {
      login () {
        // 从compliance tool database获取目标
        this.$http.post('/server', {
          user: this.user,
          password: this.password
        })
          .then((response) => {
            // 响应成功回调
            var info = response.body
            if (info.Msg !== 'Success!') {
              alert('信息有误，请重新输入')
              return
            }
            localStorage.setItem('ID', info.UserID)
            localStorage.setItem('Auth', info.Auth)
            this.$router.push({ path: '/data' })
          })
          .catch((reject) => {
            console.log(reject)
          })
      }
    }
  }
</script>
