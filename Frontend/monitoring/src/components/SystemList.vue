<template lang="">
  <div class="container">
    <div
      class="wrapper"
      ref="scrollContainer"
      @wheel="onWheel">
      <transition-group name="systemList">
        <SystemItem
          v-for="system in systems"
          :system="system"
          :key="system._id"
          :inputValue="inputValue"
          @update-data-in-SP="receiveDataFromItem"
          @click="showPopupSP" />
      </transition-group>

      <transition-group name="add">
        <Sp
          class="SP"
          :system-data="systemData"
          v-if="this.$store.state.popups.popupSP" />
      </transition-group>

      <transition-group name="add">
        <AddSystem
          :objTract="objTract"
          class="popup"
          v-if="this.$store.state.popups.popupAddSP" />
      </transition-group>

      <transition-group name="add">
        <EditSystem
          class="popup"
          :system-data="systemData"
          :tractToEditSystem="tractToEditSystem"
          @send-selectTract="editSelectTract"
          v-if="this.$store.state.popups.popupEditSP" />
      </transition-group>

      <transition-group name="add-XY">
        <AddTract
          @send-tract="addTractObject"
          @send-tract-edit="addTractToEditSystem"
          class="popup"
          v-if="this.$store.state.popups.popupAddTract" />
      </transition-group>

      <transition-group name="add-XY">
        <EditTract
          class="popup"
          :selectTract="selectTract"
          v-if="this.$store.state.popups.popupEditTract" />
      </transition-group>

      <transition-group name="add">
        <RegistrationForm
          class="popup"
          v-if="this.$store.state.popups.popupRegistration" />
      </transition-group>

      <transition-group name="add">
        <ActiveUsers
          class="popup"
          v-if="this.$store.state.popups.popupActiveUsers" />
      </transition-group>

      <transition-group name="add">
        <ArduinoMenu
          class="popup"
          :arduinoStateList="arduinoStateList"
          v-if="this.$store.state.popups.popupArduinoState" />
      </transition-group>

      <transition-group name="down_up">
        <LogPopup
          class="popup log_popup"
          v-if="this.$store.state.popups.popupLog" />
      </transition-group>
    </div>
  </div>
</template>

<script>
  import SystemItem from '../components/SystemItem.vue'
  import AddSystem from '../components/AddSystem.vue'
  import Sp from '../components/Sp__popup.vue'
  import RegistrationForm from '../components/RegistrationForm.vue'
  import LogPopup from '../components/Log__popup.vue'
  import AddTract from '../components/AddTract.vue'
  import EditSystem from './EditSystem.vue'
  import ArduinoMenu from './ArduinoMenu.vue'
  import ActiveUsers from './ActiveUsers.vue'
  import EditTract from './EditTract.vue'

  export default {
    data() {
      return {
        systemData: {},
        objTract: undefined,
        selectTract: undefined,
        tractToEditSystem: undefined
      }
    },
    components: {
      SystemItem,
      AddSystem,
      RegistrationForm,
      Sp,
      LogPopup,
      AddTract,
      EditSystem,
      ArduinoMenu,
      ActiveUsers,
      EditTract
    },
    props: {
      systems: {
        type: Array,
        required: true
      },
      inputValue: {
        type: String
      },
      arduinoStateList: {
        type: Array
      }
    },
    computed: {
      isPopupOpen() {
        return this.$store.getters.isAnyPopupOpen
      }
    },
    methods: {
      editSelectTract(data) {
        this.selectTract = data
      },
      addTractObject(obj) {
        this.objTract = obj
      },
      onWheel(e) {
        if (!this.isPopupOpen) {
          this.$refs.scrollContainer.scrollLeft += e.deltaY
        } else {
          e.preventDefault()
        }
      },
      showPopupSP() {
        if (!this.$store.state.popups.popupSP) this.$store.commit('showPopupSp')
      },
      receiveDataFromItem(data) {
        this.systemData = data
      },
      addTractToEditSystem(data) {
        console.log(data)
        this.tractToEditSystem = data
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    overflow-x: auto;
    max-height: 100vh;
    white-space: nowrap;
  }

  .wrapper {
    padding: 20px;
    display: flex;
    width: auto;
    gap: 13px;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: calc(100vh - 90px);
    align-content: flex-start;
    overflow-x: auto;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .popup {
    position: fixed;
    top: 0;
  }
  .log_popup {
    width: calc(100% - 40px);
    top: auto;
    bottom: 0;
  }
  .systemList-item {
    display: inline-block;
    margin-right: 10px;
  }

  .systemList-enter-active,
  .systemList-leave-active {
    transition: all 0.4s ease;
  }

  .systemList-enter-from,
  .systemList-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }

  .systemList-move {
    transition: transform 0.6s ease;
  }

  .add-enter-active,
  .add-leave-active {
    transition: all 0.4s ease;
    animation-delay: 1s;
  }

  .add-enter-from,
  .add-leave-to {
    opacity: 0;
    transition: all 0.2s ease;
  }

  .add-move {
    transition: transform 0.6s ease;
  }

  /* addTract animation */
  .add-XY-enter-active,
  .add-XY-leave-active {
    transition: all 0.2s ease;
    animation-delay: 1s;
  }

  .add-XY-enter-from,
  .add-XY-leave-to {
    transition: all 0.2s ease;
    opacity: 0;
    transform: translate(20vw, -10vw);
  }

  .add-XY-move {
    transition: transform 0.2s ease;
  }
  /* log animation */
  .down_up-enter-active,
  .down_up-leave-active {
    transition: all 0.4s ease;
  }
  .down_up-enter-from,
  .down_up-leave-to {
    transition: all 0.2s ease;
    transform: translateY(100%);
  }

  .down_up-move {
    transition: transform 0.6s ease;
  }

  .SP {
    position: fixed;
    height: 100vh;
    z-index: 99;
  }
</style>
