<template>
  <div
    class="system"
    :style="{
      backgroundColor: system.state == 'В работе' ? '#278547' : system.state == 'Авария' ? '#7E1313' : '#535353'
    }"
    v-show="sortedFunc(system, inputValue)"
    @click="sendDataToSP">
    <div class="system__number">{{ system.number }}</div>
    <div class="system__correspondent">{{ system.correspondent }}</div>
    <div class="item-left">
      <div
        class="system__KMU"
        v-if="system.KMU.number != ''">
        <div>{{ system.KMU.type }}</div>
        <div class="KMU">{{ system.KMU.number }}</div>
      </div>
      <div
        class="system__KMU"
        v-else>
        <div>{{ system.OMU.type }}</div>
        <div class="KMU">{{ system.OMU.number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import convertTime from '../utils/convertTime.js'
  export default {
    data() {
      return {
        systemNumber: this.system.number,
        systemCorrespondent: this.system.correspondent,
        systemTraces: this.system.tract,
        systemState: this.system.state,
        systemID: this.system._id
      }
    },
    methods: {
      sortedFunc(system, inputValue) {
        if (system.state == 'Авария' && this.$store.state.alarmSorted) {
          if (inputValue.includes(system.number) && inputValue != '') {
            return true
          } else if (inputValue.toLowerCase().includes(system.correspondent.toLowerCase()) && inputValue != '') {
            return true
          } else if (inputValue == '') {
            return true
          }
        } else if (system.state === 'В работе' && this.$store.state.workSorted) {
          if (inputValue.includes(system.number) && inputValue != '') {
            return true
          } else if (inputValue.toLowerCase().includes(system.correspondent.toLowerCase()) && inputValue != '') {
            return true
          } else if (inputValue == '') {
            return true
          }
        } else if (this.$store.state.alarmSorted === false && this.$store.state.workSorted === false) {
          if (inputValue.includes(system.number) && inputValue != '') {
            return true
          } else if (inputValue.toLowerCase().includes(system.correspondent.toLowerCase()) && inputValue != '') {
            return true
          } else if (inputValue == '') {
            return true
          }
        } else {
          return false
        }
      },
      sendDataToSP() {
        this.$emit('update-data-in-SP', {
          systemNumber: this.systemNumber,
          systemCorrespondent: this.system.correspondent,
          systemPin: this.system.pin,
          systemSubunit: this.system.subunit,
          systemKMU: this.system.KMU,
          systemOMU: this.system.OMU,
          systemReserve: this.system.tracts,
          systemActiveTract: this.system.selectedNameTract,
          systemState: this.system.state,
          systemID: this.system._id,
          systemNote: this.system.note,
          systemPayload: this.system.payload
        }) /* отправляю данные в попап СП через родительский компонент*/
      }
    },
    props: {
      system: {
        type: Object,
        required: true
      },
      inputValue: {
        type: String
      }
    },
    computed: {
      systemStatus() {
        return this.system.state
      }
    },
    watch: {
      systemStatus(newVal) {
        if (newVal === 'В работе') {
          this.$store.state.toast.success(
            `${convertTime()} В работе: СП ${this.system.number} ${this.system.subunit} - ${this.system.correspondent}`
          )
          this.$store.dispatch('sendSystemStatus', {
            type: 'Success',
            message: `В работе: СП ${this.system.number} ${this.system.subunit} - ${this.system.correspondent}`,
            subunit: this.system.subunit
          })
        } else if (newVal === 'Авария') {
          this.$store.state.toast.error(
            `${convertTime()} Авария: СП ${this.system.number} ${this.system.subunit} - ${this.system.correspondent}`
          )
          this.$store.dispatch('sendSystemStatus', {
            type: 'Warning',
            message: `Авария: СП ${this.system.number} ${this.system.subunit} - ${this.system.correspondent}`,
            subunit: this.system.subunit
          })
        }
        if (newVal === 'Авария' && this.$store.state.soundEnable === false) {
          this.$store.commit('enableSound')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .system {
    position: relative;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Wix Madefor Display;
    padding: 0.2vw 0.7vw;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 5px;
      top: 0;
      left: 0;
      background-color: #ffffff00;
      transition: 0.1s;
    }

    &:hover {
      &::before {
        transition: 0.1s;
        background-color: #00000062;
      }

      .system__number,
      .system__correspondent,
      .traces,
      .system__KMU {
        filter: drop-shadow(0px 0px 10px #000);
        color: #fff;
        z-index: 2;
      }
    }

    &:active {
      &::before {
        transition: 0s;
        background-color: #000000bc;
      }
    }
  }

  .system__number {
    font-family: Viga Regular;
    font-size: 2vw;
  }

  .system__correspondent {
    font-size: 1.3vw;
    text-align: left;
    margin: 0px 0.5vw;
  }

  .ok {
    background-color: #278547;
  }

  .crash {
    background-color: #7e1313;
  }

  .traces {
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 4px;
    text-align: center;
    margin: 0.4vw 0.5vw 0.4vw 0.5vw;
    max-width: 2.2vw;
    font-size: 0.9vw;
  }

  .system__KMU {
    font-size: 1vw;
  }

  .item-left {
    display: flex;
    width: 29%;
    justify-content: space-between;
  }
</style>
