<template lang="html">
  <div class="ArduinoMenu">
    <div class="ArduinoMenu__wrapper popup">
      <div
        class="close"
        @click="closePopupArduinoState">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px" />
      </div>
      <h1 class="title">Узлы системы мониторинга</h1>
      <div class="content">
        <div class="subtitle">
          <div class="title__number">№ п/п</div>
          <div class="title__subunit">Подразделение</div>
          <div class="title__IP">IP адрес</div>
          <div class="title__status">Статус</div>
        </div>
        <div
          v-for="(item, index) in formattedArduinoStateList"
          :key="index"
          class="content-items">
          <div class="content__number">{{ index + 1 }}</div>
          <div class="content__subunit">{{ item.subunit }}</div>
          <div class="content__IP">{{ item.arduinoURL }}</div>
          <div class="content__status">
            <p
              v-if="item.message == 'Соединение с Ардуино активно.'"
              style="color: #24d34d">
              Активен
            </p>
            <p
              v-else
              style="color: #a22c2c">
              Недоступен
            </p>
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
    },
    computed: {
      formattedArduinoStateList() {
        return this.arduinoStateList.map((item) => {
          return {
            ...item,
            arduinoURL: item.arduinoURL.startsWith('http://') ? item.arduinoURL.substring(7) : item.arduinoURL
          }
        })
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
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ArduinoMenu__wrapper {
    padding: 1.1vw 1.5vw 2.3vw;
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
  .title {
    font-family: Wix Madefor Display;
    color: #fff;
    margin-bottom: 1vw;
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
  .subtitle,
  .content-items {
    display: flex;
    width: calc(100% - 25px);
    justify-content: flex-start;
    div {
      display: flex;
      width: calc(100% / 4);
      justify-content: flex-start;
      margin: 5px 0px 5px;
      color: #fff;
      &:first-child {
        transform: translateX(3vw);
      }
    }
  }

  .content__number {
    color: #9d9d9d;
  }
  .content {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5vw;
  }
  .subtitle {
    background: #2e3541;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    div {
      width: calc(100% / 4);
      display: flex;
      &:first-child {
        transform: translateX(1.5vw);
      }
    }
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
