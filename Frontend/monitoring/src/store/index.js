import { useToast } from 'vue-toastification'
import { createStore } from 'vuex'

const toast = useToast()

export default createStore({
  state: {
    username: '',
    toast: toast,
    roles: '',
    systems: [],
    soundEnable: false,
    workSorted: false,
    alarmSorted: false,
    arduino: false,
    popups: {
      popupRegistration: false,
      popupAddSP: false,
      popupSP: false,
      popupPayload: false,
      popupLog: false
    },
    NavPopups: {
      Open: false,
      AuthItems: false,
      soundItems: false,
      settingItems: false
    }
  },
  mutations: {
    /* Мутация СП */
    removeSystems(state, value) {
      state.systems = value
    },
    addSystems(state, value) {
      state.systems.push(value)
    },
    updateSystemState(state, { pin, newState }) {
      const systemIndex = state.systems.findIndex((system) => system.pin === pin)
      if (systemIndex !== -1) {
        state.systems[systemIndex].state = newState
      }
    },
    updateSystemNote(state, { _id, value }) {
      const systemIndex = state.systems.findIndex((system) => system._id === _id)
      if (systemIndex !== -1) {
        state.systems[systemIndex].note = value
      }
    },
    /* Парсинг токена */
    parseUsername(state, value) {
      state.username = value
    },
    parseRoles(state, value) {
      state.roles = value
    },
    /* Звук */
    enableSound(state) {
      state.soundEnable = true
    },
    disableSound(state) {
      state.soundEnable = false
    },

    /* Глобальные попапы */
    showPopupAddSp(state) {
      state.popups.popupAddSP = !state.popups.popupAddSP
    },
    showPopupPayload(state) {
      state.popups.popupPayload = !state.popups.popupPayload
    },
    showPopupRegistration(state) {
      state.popups.popupRegistration = !state.popups.popupRegistration
    },
    showPopupSp(state) {
      state.popups.popupSP = !state.popups.popupSP
    },
    showPopupLog(state) {
      state.popups.popupLog = !state.popups.popupLog
    },
    closePopupLog(state) {
      state.popups.popupLog = !state.popups.popupLog
    },
    disableArduino(state) {
      state.arduino = false
    },
    enableArduino(state) {
      state.arduino = true
    },
    /* Закрытие всех попапов */
    closeAllPopups(state, name) {
      for (const key in state.NavPopups) {
        if (name == 'reset') {
          state.NavPopups[key]
        }
        if (key == name) {
          if (state.NavPopups[key] === true) {
            state.NavPopups[key] = false
          } else {
            state.NavPopups[key] = true
          }
        } else {
          state.NavPopups[key] = false
        }
      }
    },
    /* Сортировка */
    disableWorkSorted(state, value) {
      state.workSorted = value
      if (value) {
        state.alarmSorted = false
      }
    },
    disableAlarmSorted(state, value) {
      state.alarmSorted = value
      if (value) {
        state.workSorted = false
      }
    }
  }
  // getters: {
  //   isAnyPopupOpen: (state) => {
  //     return Object.values(state.NavPopups).some((value) => value === true)
  //   },
  // },
})
