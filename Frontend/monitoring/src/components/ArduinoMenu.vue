<template lang="html">
  <div class="ArduinoMenu">
    <div class="ArduinoMenu__wrapper popup">
      <div class="close">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px"
          @click="closePopupArduinoState" />
      </div>
      <div class="content">
        <div class="title">
          <div class="title__number">№ п/п</div>
          <div class="title__subunit">Подразделение</div>
          <div class="title__IP">IP адрес</div>
          <div class="title__status">Статус Ардуино</div>
        </div>
        <div
          v-for="(item, index) in arduinoStateList"
          :key="index"
          class="content-items">
          <div class="content__number">{{ index + 1 }}</div>
          <div class="content__subunit">{{ item.subunit }}</div>
          <div class="content__IP">{{ item.arduinoURL }}</div>
          <div class="content__status">
            <img
              v-if="item.message == 'Соединение с Ардуино активно.'"
              width="20px"
              src="../assets/greenCrest.svg"
              alt="В работе" />
            <img
              v-else
              width="20px"
              src="../assets/redCrest.svg"
              alt="Соединение отсутствует" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      closePopupArduinoState() {
        this.$store.commit('closePopupArduinoState')
      }
    },
    props: {
      arduinoStateList: {
        type: Array
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ArduinoMenu {
    font-family: Wix Madefor Display;
    width: 100vw;
    height: 90svh;
    background: rgba(0, 0, 0, 0.887);
    position: fixed;
    left: 0px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ArduinoMenu__wrapper {
    padding: 2.5vw;
    width: 80vw;
    max-height: 80vh;
    background-color: #0e1621;
    border-radius: 10px;
    filter: drop-shadow(0px 20px 30px rgba(0, 0, 0, 0.4274509804));
  }
  .ico {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .close {
    height: 100%;
    width: 25px;
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
  .Sp__wrapper-content {
    display: flex;
    gap: 1vw;
  }
  .title,
  .content-items {
    display: grid;
    grid-template-columns: 0.2fr 1fr 1fr 1fr;
    gap: 10px;
  }
  .content {
    width: 100%;
    background: #2e3541;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: 1.5s ease;
    opacity: 1;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transition: 1.5s ease;
  }
</style>
