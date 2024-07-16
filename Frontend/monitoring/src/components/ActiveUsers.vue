<template lang="html">
  <div class="UserList">
    <div class="UserList__wrapper popup">
      <div class="close">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px"
          @click="closePopupActiveUsers" />
      </div>
      <div class="content">
        <div class="title">
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
  import { formatDistanceToNow } from 'date-fns'
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
        if (lastActive !== '') {
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
    position: fixed;
    left: 0px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .UserList__wrapper {
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
  .wrapper-content {
    display: flex;
    gap: 1vw;
  }
  .title,
  .content-items {
    display: grid;
    grid-template-columns: 0.2fr 1fr 1fr 1fr 1fr;
    gap: 10px;
  }
  .content {
    width: 100%;
    background: #2e3541;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
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
