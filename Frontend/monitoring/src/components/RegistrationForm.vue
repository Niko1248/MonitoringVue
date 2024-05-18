<template lang="html">
  <div class="outspace">
    <div class="addSP__wrapper popup">
      <div
        class="close"
        @click="showPopupRegistration">
        <img
          src="./../assets/img/nav/close.svg"
          alt="закрыть"
          width="20px" />
      </div>
      <div class="logo__wrapper">
        <img
          class="logo"
          src="./../assets/img/settings/Kolibri2.png"
          alt="" />
      </div>

      <h1>Регистрация пользователя</h1>
      <div>
        <div class="addSP__wrapper-left">
          <input
            type="text"
            placeholder="Имя пользователя"
            v-model="newUser.username" />
          <input
            type="password"
            placeholder="Пароль"
            v-model="newUser.password" />
          <select
            class=""
            v-model="newUser.roles">
            <option
              value=""
              disabled
              selected
              hidden>
              Роль
            </option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPERADMIN">SuperAdmin</option>
          </select>
          <select
            class=""
            v-model="newUser.subunit">
            <option
              value=""
              disabled
              selected
              hidden>
              Подразделение
            </option>
            <option
              v-for="(subunit, index) in this.$store.state.subunitList"
              :key="index"
              :value="Object.keys(subunit)[0]">
              {{ Object.values(subunit)[0] }}
            </option>
          </select>
          <p
            class="error"
            v-if="error">
            {{ error }}
          </p>
          <p
            class="success"
            v-if="success">
            {{ success }}
          </p>
        </div>
        <div class="addSP__wrapper-right"></div>
      </div>
      <button
        class="save"
        @click="registration">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Config from '../../config'

  export default {
    data() {
      return {
        newUser: {
          username: ''.toLowerCase(),
          password: '',
          roles: '',
          subunit: ''
        },
        error: '',
        success: ''
      }
    },
    components: {},
    methods: {
      showPopupRegistration() {
        this.$store.commit('showPopupRegistration')
      },
      async registration() {
        this.error = ''
        this.success = ''
        try {
          const response = await axios.post(`${Config.SERVER_URL}/api/auth/registration`, this.newUser, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.success = response.data.message
          this.$store.dispatch('sendLog', {
            type: 'Info',
            message: `Пользователь ${this.newUser.username} Роль: ${this.newUser.roles} Подразделение: ${this.newUser.subunit} успешно создан"`
          })
          this.newUser = {
            username: ''.toLowerCase(),
            password: '',
            roles: '',
            subunit: ''
          }
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .outspace {
    font-family: Wix Madefor Display;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.887);
    position: fixed;
    left: 0px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .addSP__wrapper {
    width: 50%;
    background: #0e1621;
    border-radius: 10px;
    padding: 20px 0px 60px 0px;
    position: relative;
    filter: drop-shadow(0px 20px 30px #0000006d);
    position: relative;

    .logo__wrapper {
      position: absolute;
      right: 7%;
      top: 20px;
      height: 100%;
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: end;

      img {
        width: 75%;
        opacity: 0.6;
        transform: translateY(-20px);
      }
    }

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

  .addSP__wrapper-left {
    display: flex;
    flex-direction: column;
    width: calc(48% - 20px);
    margin-left: 20px;

    input {
      width: 86%;
      height: 35px;
      border: none;
      border-radius: 5px;
      outline: none;
      margin: 7px 0px;
      background: #2e3541;
      color: #f2f1f1;
      padding: 4px 20px 4px 20px;
      font-size: 18px;
      transition: 0.2s ease-in;

      &::placeholder {
        font-size: 18px;
        color: #f2f1f1;
      }

      &:hover {
        filter: drop-shadow(0px 0px 2px #ffffff40);
        transition: 0.2s;
      }

      &:focus {
        filter: drop-shadow(0px 0px 2px #000);
        transition: 0.2s ease-in;
      }
    }

    select {
      width: calc(86% + 40px);
      height: 45px;
      border: none;
      border-radius: 5px;
      outline: none;
      margin: 7px 0px;
      background: #2e3541;
      color: #f2f1f1;
      padding: 4px 0px 6px 20px;
      font-size: 18px;
      color: #f2f1f1;
      transition: 0.2s ease-in;

      &:hover {
        filter: drop-shadow(0px 0px 2px #ffffff40);
        transition: 0.2s;
      }

      &:focus {
        filter: drop-shadow(0px 0px 2px #000);
        transition: 0.2s ease-in;
      }
    }
  }

  .addSP__wrapper-right {
    width: 50%;
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
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>
