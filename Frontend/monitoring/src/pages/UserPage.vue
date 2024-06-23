<template>
  <div
    class="connect__wrapper"
    v-if="!connect">
    <div class="img__wrapper">
      <img
        src="../assets/img/settings/koibri.gif"
        alt=""
        class="connect__logo" />
    </div>
    <p>Связь с сервером потеряна...</p>
  </div>
  <NavMenu @input-change="updateInputValue" />
  <SystemList
    :systems="this.$store.state.systems"
    :inputValue="inputValue"
    :arduinoStateList="arduinoStateList"
    @click="this.$store.commit('closeAllPopups', 'reset')" />
</template>

<script>
  import NavMenu from '../components/NavMenu.vue'
  import SystemList from '../components/SystemList.vue'
  import axios from 'axios'
  import Config from '../../config/index.js'

  export default {
    components: { NavMenu, SystemList },
    data() {
      return {
        systems: [],
        inputValue: '',
        connect: true,
        arduinoStateList: [],
        intervalHeartbeat: null,
        intervalActiveUsers: null
      }
    },

    methods: {
      async getSystems() {
        try {
          const response = await axios.get(`${Config.SERVER_URL}/api/systems/getSystems`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.$store.state.systems = response.data
        } catch (e) {
          console.log(e.message)
          setTimeout(this.getSystems, 10000)
        }
      },
      async getLogs() {
        try {
          const response = await axios.get(`${Config.SERVER_URL}/api/logs/getLogs`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.$store.commit('addLogs', response.data)
        } catch (e) {
          console.log(e.message)
        }
      },
      async heartbeat() {
        try {
          await axios.post(`${Config.SERVER_URL}/api/auth/heartbeat`, { username: this.$store.state.username })
        } catch (e) {
          console.log(e)
        }
      },

      updateInputValue(value) {
        this.inputValue = value
      },
      handleKeyPress(event) {
        if ((event.ctrlKey && event.key === '`') || event.key === 'ё') {
          this.$store.commit('showPopupLog')
        }
      }
    },

    watch: {
      inputValue(value) {
        this.inputValue = value
      }
    },
    mounted() {
      try {
        const eventSource = new EventSource(
          `${Config.SERVER_URL}/state?roles=${this.$store.state.roles}&username=${this.$store.state.subunitRu}`
        ) //Event для проверки соединения с сервером, при разрыве идем ниже
        eventSource.onopen = (event) => {
          console.log('Соединение установлено')
          this.connect = true
        }
        eventSource.onerror = (event) => {
          //При остановке сервера соединение разрывается и сообщение об ошибке
          if (eventSource.readyState == EventSource.CLOSED) {
            console.log('Connection was closed')
          } else {
            console.log('Error occurred')
            this.connect = false
          }
        }
        eventSource.onmessage = (event) => {
          //Event по работе с Ардуино...состояние пинов + статус ардуино
          const data = JSON.parse(event.data)
          if (data.arduinoStateListFlag) {
            //это обрабатывает все данные с ардуино, только для Superadmin (На бэке для суперадмина вешается флаг arduinoStateListFlag)
            let index = this.arduinoStateList.findIndex((el) => el.subunit === data.subunit)
            if (index === -1) {
              this.arduinoStateList.push(data)
            } else if (index !== -1 && this.arduinoStateList[index].message !== data.message) {
              this.arduinoStateList[index] = data
            }
          } else {
            //Если не Superadmin то бэк отправляет только данные по этому пользователю (events/index.js)
            if (data.message === 'Соединение с Ардуино активно.' && data.subunit === this.$store.state.subunitRu) {
              this.$store.commit('enableArduino') //Меняю картинку состояния ардуино на активную
            } else if (
              data.message === 'Соединение с Ардуино отсутствует.' &&
              data.subunit === this.$store.state.subunitRu
            ) {
              this.$store.commit('disableArduino') //Меняю картинку состояния ардуино на неактивную
            } else {
              this.$store.commit('updateSystemState', {
                // обработка при изменении состояния пинов
                pin: String(data.pin),
                newState: data.state
              })

              if (!this.$store.state.systems.find((system) => system.state == 'Авария')) {
                //Работа со звуком
                this.$store.commit('disableSound')
              }
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
      this.intervalHeartbeat = setInterval(this.heartbeat, 5000)
      document.addEventListener('keydown', this.handleKeyPress)
      this.getSystems() // Получаю все системы
    },
    beforeUnmount() {
      //при размонтировании очистить все данные и закрыть попапы, снять слушатели
      this.$store.commit('clearSystems')
      this.$store.commit('clearSubunitList')
      this.$store.commit('clearLog')
      this.$store.commit('closeAllPopups', 'reset')
      this.$store.commit('closePopupLog')
      clearInterval(this.intervalHeartbeat)
      document.removeEventListener('keydown', this.handleKeyPress)
    }
  }
</script>
<style scoped>
  .connect__wrapper {
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.683);
    backdrop-filter: blur(2px);
    z-index: 999;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    animation: disconnect 5s infinite;
    flex-direction: column;
    font-family: Wix Madefor Display;
    color: #fff;
    font-size: 0.9vw;
  }
  @keyframes disconnect {
    0% {
      backdrop-filter: blur(2px);
    }
    50% {
      backdrop-filter: blur(5px);
    }
    100% {
      backdrop-filter: blur(2px);
    }
  }
  .img__wrapper {
    padding: 1vw;
    transition: 1s ease;
    animation: glow 5s infinite ease;
    filter: drop-shadow(0px 0px 30px #000000);
    margin-bottom: 1vw;
  }
  @keyframes glow {
    0% {
      transform: translate(0px, 0px);
    }
    30% {
      transform: translate(2px 10px);
    }
    70% {
      transform: translate(15px, 10px);
    }

    100% {
      transform: translate(1px, 2px);
    }
  }
  .connect__logo {
    width: 5vw;
  }
</style>
