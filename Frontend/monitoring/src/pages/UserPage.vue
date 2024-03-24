<template>
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
        enableSound: false,
        inputValue: ''
      }
    },
    methods: {
      async getSystems() {
        try {
          const response = await axios.get(`${Config.SERVER_URL}/api/systems/getSystems`)
          this.$store.state.systems = response.data
        } catch (e) {
          console.log(e.message)
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
      const eventSource = new EventSource(`${Config.SERVER_URL}/state`)
      eventSource.onmessage = (event) => {
        const stateSystemUpdated = JSON.parse(event.data)
        this.$store.commit('updateSystemState', {
          pin: String(stateSystemUpdated.pin),
          newState: stateSystemUpdated.state
        })
        if (!this.$store.state.systems.find((system) => system.state == 'Авария')) {
          this.$store.commit('disableSound')
        }
      }

      this.getSystems()
    }
  }
</script>
<style scoped></style>
