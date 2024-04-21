<template lang="html">
  <div class="">
    <div class="addPayload__wrapper popup">
      <div
        class="close"
        @click="showPopupPayload">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px" />
      </div>
      <h1>Добавление загрузки</h1>

      <button class="save">Сохранить</button>
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
      showPopupPayload() {
        this.$store.commit('showPopupPayload')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .addPayload__wrapper {
    width: 100%;
    height: 100%;
    background: #0e1621;
    border-radius: 10px;
    padding: 20px 0px 60px 0px;
    position: absolute;
    top: 0;
    filter: drop-shadow(0px 20px 30px #0000006d);

    h1 {
      color: #f2f1f1;
      font-weight: bold;
      margin-bottom: 30px;
      margin-left: 20px;
    }

    div {
      display: flex;
    }
  }
  .close {
    height: 100%;
    width: 4%;
    background: #053429;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0px 10px 10px 0px;
    transition: 0.2s ease-in;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/left-down.svg);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      top: 0px;
      background-image: url(./../assets/img/nav/left-top.png);
    }

    &:hover {
      filter: drop-shadow(-2px 0px 5px #ffffff34);
      transition: 0.2s ease-in;
    }
  }

  .save {
    background: #053429;
    outline: none;
    color: #f2f1f1;
    position: absolute;
    bottom: 0;
    left: calc((100% - 130px) / 2);
    width: 130px;
    height: 35px;
    border: none;
    border-radius: 10px 10px 0px 0px;
    font-size: 18px;
    transition: 0.2s ease-in;

    &:hover {
      filter: drop-shadow(0px -2px 5px #ffffff34);
      transition: 0.2s ease-in;
      color: #fff;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/left-down.svg);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      right: -13px;
      bottom: 0px;
      background-image: url(./../assets/img/nav/right-down.svg);
    }
  }
</style>
