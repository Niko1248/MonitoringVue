<template lang="">
  <div class="settings">
    <img
      class="settings__ico ico"
      src="../assets/SETTINGS.svg"
      @click="showSettingItems"
      alt="Настройки" />
    <transition name="fade">
      <div
        class="setting__items popup"
        v-if="this.$store.state.NavPopups.settingItems">
        <div>
          <input
            type="checkbox"
            id="workSorted"
            style="transform: translateX(-5px); cursor: pointer"
            v-model="workSorted" />
          <label
            class="setting__item-text"
            for="workSorted"
            >Исправные</label
          >
        </div>
        <div class="setting__item-text">
          <input
            type="checkbox"
            id="alarmSorted"
            style="transform: translateX(-5px); cursor: pointer"
            v-model="alarmSorted" />
          <label
            class="setting__item-text"
            for="alarmSorted"
            >Неисправные</label
          >
        </div>
        <div @click="showPopupAddSP">
          <p
            class="plus__ico"
            style="transform: translateX(-5px); cursor: pointer">
            +
          </p>
          <p
            class="setting__item-text"
            @click="showSettingItems">
            Добавить СП
          </p>
        </div>
        <div v-if="this.$store.state.roles === 'ADMIN'">
          <img
            src="./../assets/img/nav/nodes.png"
            alt="nodes-ico"
            width="20px"
            style="transform: translateX(-10px); cursor: pointer" />
          <p
            @click="showPopupArduinoState"
            class="setting__item-text">
            Узлы сети
          </p>
        </div>
        <div v-if="this.$store.state.subunit === 'gcs' || this.$store.state.subunit === 'cskp'">
          <img
            src="./../assets/img/nav/users.png"
            alt="nodes-ico"
            width="20px"
            style="transform: translateX(-10px); cursor: pointer" />
          <p
            @click="showPopupActiveUsers"
            class="setting__item-text">
            Пользователи
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      showSettingItems() {
        this.$store.commit('closeAllPopups', 'settingItems')
        // this.$store.commit('showSettingItems');
      },
      showPopupAddSP() {
        if (!this.$store.state.popups.popupAddSP === true) this.$store.commit('showPopupAddSp')
      },
      showPopupActiveUsers() {
        this.$store.commit('showPopupActiveUsers')
      },
      showPopupArduinoState() {
        this.$store.commit('showPopupArduinoState')
      }
    },
    computed: {
      workSorted: {
        get() {
          return this.$store.state.workSorted
        },
        set(value) {
          this.$store.commit('disableWorkSorted', value)
        }
      },
      alarmSorted: {
        get() {
          return this.$store.state.alarmSorted
        },
        set(value) {
          this.$store.commit('disableAlarmSorted', value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-from {
    transition: 0.2s ease-in-out;
    transform: translateY(-55%) scale(0);
  }

  .fade-enter-to {
    transition: 0.2s ease-in-out;
    transform: translateY(0%) scale(1);
  }

  .fade-leave-active {
    transition: 0.2s ease-in-out;
    transform: translateY(0%) scale(1);
  }

  .fade-leave-from,
  .fade-leave-to {
    opacity: 0;
    transition: 0.2s ease-in-out;
    transform: translateY(-55%) scale(0);
  }

  .settings {
    position: relative;
  }

  .settings__ico {
    margin-right: 25px;
    width: 22px;
    margin-top: 3px;
    cursor: pointer;
    filter: drop-shadow(0px 0px 0px #00000000);
  }

  .setting__items {
    position: absolute;
    top: 39.5px;
    width: 130px;
    left: -70px;
    background: #0e1621;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 10px 20px 10px 20px;
    border-radius: 0px 0px 10px 10px;
    color: #fff;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      left: -13px;
      top: 0;
      background-image: url(./../assets/img/nav/left.png);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 13px;
      height: 13px;
      right: -13px;
      top: 0;
      background-image: url(./../assets/img/nav/right.png);
    }

    div {
      display: flex;
      margin-bottom: 10px;

      input,
      .plus__ico {
        margin-right: 10px;
      }
    }
  }

  .setting__item-text {
    transition: 0.4s ease-in-out;
    cursor: pointer;

    &:hover {
      transition: 0.1s ease-in-out;
      text-shadow: 0px 0px 11px #f9fefe;
    }
  }
</style>
