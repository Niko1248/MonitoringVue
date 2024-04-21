<template lang="html">
  <div class="log">
    <div class="log popup">
      <img
        src="./../assets/img/nav/close.svg"
        alt="закрыть"
        width="20px"
        class="close"
        @click="showPopupLog" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    components: {},
    methods: {
      showPopupLog() {
        this.$store.commit('showPopupLog')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .log {
    position: relative;
    bottom: 0;
    width: 100%;
    height: 53vh;
    background: #0e16214b;
    backdrop-filter: blur(3px);
    border-radius: 10px 10px 0px 0px;
    z-index: 999;
    filter: drop-shadow(-15px -10px 10px #0000009f);
  }
  .close {
    position: absolute;
    right: 0.6vw;
    top: 0.6vw;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      filter: drop-shadow(0px 0px 2px #fff);
      transition: 0.2s;
    }
  }
</style>
