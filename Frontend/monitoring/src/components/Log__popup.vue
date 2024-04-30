<template lang="html">
  <div class="log">
    <div class="log popup">
      <img
        src="./../assets/img/nav/close.svg"
        alt="закрыть"
        width="20px"
        class="close"
        @click="showPopupLog" />
      <ol class="log__list">
        <li
          v-for="({ type, subunit, message, createdAt }, index) in this.$store.state.dataLogs"
          :key="index"
          class="log__item">
          <div class="log__time">{{ createdAt }}</div>
          <div class="log__message">{{ message }}</div>
        </li>
      </ol>
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
  .log__list {
    padding: 50px;
    color: white;
    max-height: 45vh;
  }
  .log__item {
    display: flex;
  }
  .log__time {
    margin-right: 1.5vw;
  }
</style>
