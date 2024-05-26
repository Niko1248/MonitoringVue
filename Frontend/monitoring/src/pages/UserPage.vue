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
        connect: true
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
        const eventSource = new EventSource(`${Config.SERVER_URL}/state`)
        eventSource.onopen = (event) => {
          console.log('Соединение установлено')
          this.connect = true
        }
        eventSource.onerror = (event) => {
          if (eventSource.readyState == EventSource.CLOSED) {
            console.log('Connection was closed')
          } else {
            console.log('Error occurred')
            this.connect = false
          }
        }
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data)
          if (typeof data === 'string' && data === 'Соединение с Ардуино активно.') {
            this.$store.commit('enableArduino')
          } else if (typeof data === 'string') {
            this.$store.commit('disableArduino')
          } else {
            this.$store.commit('updateSystemState', {
              pin: String(data.pin),
              newState: data.state
            })

            if (!this.$store.state.systems.find((system) => system.state == 'Авария')) {
              this.$store.commit('disableSound')
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
      document.addEventListener('keydown', this.handleKeyPress)
      this.getSystems()
    },
    beforeUnmount() {
      this.$store.commit('clearSystems')
      this.$store.commit('clearSubunitList')
      this.$store.commit('clearLog')
      this.$store.commit('closeAllPopups', 'reset')
      this.$store.commit('closePopupLog')
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
