<template lang="html">
  <div class="UserList">
    <div class="UserList__wrapper popup">
      <div
        class="close"
        @click="closePopupActiveUsers">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px" />
      </div>
      <h1 class="title">Пользователи</h1>

      <div class="content">
        <div class="subtitle">
          <div class="title__number">№ п/п</div>
          <div class="title__user">Пользователь</div>
          <div class="title__subunit">Подразделение</div>
          <div class="title__roles">Роль</div>
          <div class="title__status">Последняя активность</div>
        </div>
        <div
          v-for="(item, index) in activeUsersList"
          :key="index"
          class="content-items">
          <div class="content__number">{{ index + 1 }}</div>
          <div class="content__username">{{ item.username }}</div>
          <div class="content__subunit">{{ translateSubunit(item.subunit[0], this.$store.state.subunitList) }}</div>
          <div class="content__roles">{{ item.roles[0] }}</div>
          <div class="content__status">{{ formatLastActive(item.lastActive) }}</div>
        </div>
      </div>
      <button
        class="refresh"
        @click="getActiveUsers">
        Обновить
      </button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { formatDistanceToNow, nextDay } from 'date-fns'
  import { ru } from 'date-fns/locale'
  import Config from '../../config'
  import translateSubunit from '../utils/translateSubunit.js'
  export default {
    data() {
      return {
        activeUsersList: []
      }
    },
    methods: {
      translateSubunit,
      async getActiveUsers() {
        try {
          const response = await axios.get(`${Config.SERVER_URL}/api/auth/activeUsers`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.activeUsersList = response.data
        } catch (e) {
          console.log(e)
        }
      },
      closePopupActiveUsers() {
        this.$store.commit('closePopupActiveUsers')
      },
      formatLastActive(lastActive) {
        if (!lastActive) {
          return 'Пользователь еще не был активен'
        } else {
          return formatDistanceToNow(lastActive, { addSuffix: true, locale: ru })
        }
      }
    },
    mounted() {
      this.getActiveUsers()
    }
  }
</script>

<style lang="scss" scoped>
  .UserList {
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

  .UserList__wrapper {
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
  .wrapper-content {
    display: flex;
    gap: 1vw;
  }
  .subtitle,
  .content-items {
    display: flex;
    width: calc(100% - 25px);
    justify-content: flex-start;
    color: #fff;
    div {
      display: flex;
      width: calc(100% / 5);
      justify-content: flex-start;
      margin: 5px 0px 5px;
      &:first-child {
        transform: translateX(3vw);
      }
    }
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
  .content__number {
    color: #9d9d9d;
  }
  .content__status {
    color: #66fbf1;
  }
  .refresh {
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
