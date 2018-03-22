<!--登录-->
<template>
  <div class="view">
    <div class="animate">
      <div class="clound1"></div>
      <div class="clound2"></div>
      <div class="build"></div>
      <div class="plane"></div>
    </div>
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
  </div>
</template>
<style scoped>

  .aside {
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    bottom: 0;
    background-color: lightgray;
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
  .animate {
    width: 70%;
    z-index: 1;
  }
  .clound1 {
    position: absolute;
    left: 80px;
    top: 4%;
    width: 100px;
    height: 60px;
    background: url('../assets/clound.jpg')  no-repeat;
    background-size: contain;
    animation: myclound 13s infinite alternate;
  }
  .clound2 {
    position: absolute;
    left: 400px;
    top: 10%;
    width: 100px;
    height:60px;
    background: url('../assets/clound.jpg')  no-repeat;
    background-size: contain;
    animation: myclound2 10s infinite alternate;
  }
  .build {
    position: absolute;
    left: 800px;
    top: 65%;
    width: 300px;
    height: 160px;
    background: url('../assets/building.jpg')  no-repeat;
    background-size: contain;
    animation: mybuilding 9s forwards;
    animation-delay: 4s;
  }
  @keyframes mybuilding {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
  @keyframes myclound {
    from {
      left: 80px;
    }
    to {
      left: 200px;
    }
  }
  @keyframes myclound2 {
    from {
      left: 400px;
    }
    to {
      left: 700px;
    }
  }
  .plane {
    position: absolute;
    left: 20px;
    top: 70%;
    width: 200px;
    height:200px;
    background: url('../assets/plane.jpg')  no-repeat;
    background-size: contain;
    animation: myplane 8s ease-in forwards;
    z-index: -1;
  }
  @keyframes myplane {
    0% {
      left: 20px;
      top: 70%;
    }
    100% {
      left: 1200px;
      top: 2%;
      transform: rotate(-15deg) scale(0.7);
    }
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
