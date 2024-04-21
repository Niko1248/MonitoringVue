<template>
  <div
    class="connect__wrapper"
    v-if="!connect">
    <div class="img__wrapper">
      <img
        src="../assets/img/settings/koibri-white.png"
        alt=""
        class="connect__logo" />
    </div>
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
  import { ref, onMounted } from 'vue'
  import { useStore } from 'vuex'
  export default {
    components: { NavMenu, SystemList },
    data() {
      return {
        systems: [],
        enableSound: false,
        inputValue: '',
        connect: true
      }
    },
    setup() {
      const handleKeyPress = (event) => {
        if (event.ctrlKey && event.key === '1') {
          if (!store.state.popups.popupLog === true) {
            store.commit('showPopupLog')
          } else {
            store.commit('closePopupLog')
          }
        }
      }
      const store = useStore()
      onMounted(() => {
        document.addEventListener('keydown', handleKeyPress)
      })

      return {}
    },
    methods: {
      async getSystems() {
        try {
          const response = await axios.get(`${Config.SERVER_URL}/api/systems/getSystems`)
          this.$store.state.systems = response.data
        } catch (e) {
          console.log(e.message)
          setTimeout(this.getSystems, 10000)
        }
      },
      updateInputValue(value) {
        this.inputValue = value
      }
    },
    computed: {},
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

      this.getSystems()
    }
  }
</script>
<style scoped>
  .connect__wrapper {
    position: fixed;
    width: 100%;
    background: rgb(0, 0, 0, 0.9);
    z-index: 999;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .img__wrapper {
    border: 3px solid white;
    border-radius: 50%;
    padding: 1vw;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    animation: glow 1.5s infinite alternate;
  }
  @keyframes glow {
    from {
      box-shadow: 0 0 2px #3498db, 0 0 5px #3498db, 0 0 10px #3498db, 0 0 15px #3498db;
    }

    to {
      box-shadow: 0 0 10px #3498db, 0 0 15px #3498db, 0 0 20px #3498db, 0 0 30px #3498db;
    }
  }
  .connect__logo {
    width: 4vw;
  }
</style>
