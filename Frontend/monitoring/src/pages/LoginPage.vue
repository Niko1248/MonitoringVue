<template>
  <div class="wrapper">
    <form
      class="form"
      @submit.prevent>
      <h1 class="title">Войти в систему</h1>
      <div class="input__wrapper">
        <input
          type="text"
          placeholder="Введите логин..."
          v-model="user.username" />
        <input
          type="password"
          placeholder="Введите пароль..."
          v-model="user.password" />
      </div>
      <button
        @click.prevent="sendLogin"
        class="enter">
        Войти
      </button>
      <p
        class="error"
        v-if="error">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  import Config from '../../config/index.js'

  export default {
    data() {
      return {
        error: '',
        user: {
          username: ''.toLowerCase(),
          password: ''
        }
      }
    },
    methods: {
      async sendLogin() {
        try {
          const loginData = { ...this.user, username: this.user.username.toLowerCase() }
          const response = await axios.post(`${Config.SERVER_URL}/api/auth/login`, loginData) //Добавить обработчик ошибки на неправильный ввод
          localStorage.setItem('token', response.data.token)
          this.$router.push('/user')
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    color: white;
    margin-bottom: 20px;
    letter-spacing: 0.17vw;
    cursor: default;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Wix Madefor Display;
  }

  .input__wrapper {
    display: flex;
    flex-direction: column;
  }

  input {
    height: 5vh;
    width: 18vw;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 0px 10px;
    border: none;
    background: #e1e1e1;
    font-size: 0.8vw;
  }

  .enter {
    width: 100%;
    height: 2.5vw;
    border-radius: 10px;
    margin-top: 10px;
    border: none;
    font-size: 0.8vw;
    cursor: pointer;
    &:hover {
      background: #e1e1e1;
    }
  }
  .error {
    color: red;
    margin-top: 10px;
  }
</style>
