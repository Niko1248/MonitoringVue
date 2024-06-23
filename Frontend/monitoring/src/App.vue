<script setup>
  import UserPage from './pages/UserPage.vue'
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script></script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #040a14;
  }
  *::-webkit-scrollbar {
    width: 10px;
  }
  *::-webkit-scrollbar-track {
    background: #1f2737;
    border-radius: 5px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #8bdfb2ea;
    border-radius: 20px;
    box-shadow: 0px 5px 20px #040a14cd;
    transition: 0.2s;

    &:active {
      background-color: rgb(151, 240, 192);
      box-shadow: 0px 5px 20px #040a14;
      transition: 0.2s;
    }
  }
</style>
