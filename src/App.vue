<template>
  <div id="app">
    <div class="animate">
      <div class="clound1"></div>
      <div class="clound2"></div>
      <div class="build"></div>
      <div class="plane"></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
    background: url('./assets/clound.jpg')  no-repeat;
    background-size: contain;
    animation: myclound 13s infinite alternate;
  }
  .clound2 {
    position: absolute;
    left: 400px;
    top: 10%;
    width: 100px;
    height:60px;
    background: url('./assets/clound.jpg')  no-repeat;
    background-size: contain;
    animation: myclound2 10s infinite alternate;
  }
  .build {
    position: absolute;
    left: 800px;
    top: 65%;
    width: 300px;
    height: 160px;
    background: url('./assets/building.jpg')  no-repeat;
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
    background: url('./assets/plane.jpg')  no-repeat;
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
      left: 1100px;
      top: 2%;
      transform: rotate(-15deg) scale(0.7);
    }
  }
</style>
