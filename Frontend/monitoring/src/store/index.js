import { useToast } from 'vue-toastification'
import { createStore } from 'vuex'
import axios from 'axios'
import Config from '../../config/index.js'
const toast = useToast()

export default createStore({
  state: {
    username: '',
    toast: toast,
    roles: '',
    subunit: '',
    subunitRu: '',
    subunitList: [],
    systems: [],
    dataLogs: undefined,
    logFilter: 'Всё',
    soundEnable: false,
    workSorted: false,
    alarmSorted: false,
    arduino: false,
    arduinoURL: '',
    popups: {
      popupRegistration: false,
      popupAddSP: false,
      popupEditSP: false,
      popupSP: false,
      popupPayload: false,
      popupLog: false,
      popupAddTract: false,
      popupEditTract: false,
      popupArduinoState: false,
      popupActiveUsers: false
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
    clearSystems(state, value) {
      state.systems = []
    },
    updateSystem(state, value) {
      const systemIndex = state.systems.findIndex((system) => system.pin === value.pin)
      if (systemIndex !== -1) {
        state.systems.splice(systemIndex, 1, value)
      }
    },
    updateSystemState(state, { pin, newState }) {
      const systemIndex = state.systems.findIndex((system) => system.pin === pin)
      if (systemIndex !== -1) {
        state.systems[systemIndex].state = newState
      }
    },
    updateSystemInfo(state, { _id, note, activeTract }) {
      const systemIndex = state.systems.findIndex((system) => system._id === _id)
      if (systemIndex !== -1) {
        state.systems[systemIndex].note = note
        state.systems[systemIndex].selectedNameTract = activeTract
      }
    },
    // Лог
    addLogs(state, value) {
      state.dataLogs = value
    },
    pushLog(state, value) {
      state.dataLogs.push(value)
    },
    clearLog(state) {
      state.dataLogs = undefined
    },
    /* Парсинг токена */
    parseUsername(state, value) {
      state.username = value
    },
    parseRoles(state, value) {
      state.roles = value
    },
    parseSubunit(state, value) {
      state.subunit = value
    },
    parseSubunitRu(state, value) {
      state.subunitRu = value
    },
    parseSubunitList(state, value) {
      state.subunitList = value
    },
    clearSubunitList(state) {
      state.subunitList = []
    },
    /* Ардуино */
    setArduinoURL(state, data) {
      state.arduinoURL = data
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
    showPopupEditSp(state) {
      state.popups.popupEditSP = !state.popups.popupEditSP
    },
    showPopupAddTract(state) {
      state.popups.popupAddTract = !state.popups.popupAddTract
    },
    showPopupEditTract(state) {
      state.popups.popupEditTract = !state.popups.popupEditTract
    },
    PopupPayload(state) {
      state.popups.popupAddTract = !state.popups.popupAddTract
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
      state.popups.popupLog = false
    },
    disableArduino(state) {
      state.arduino = false
    },
    enableArduino(state) {
      state.arduino = true
    },
    showPopupArduinoState(state) {
      state.popups.popupArduinoState = !state.popups.popupArduinoState
    },
    closePopupArduinoState(state) {
      state.popups.popupArduinoState = false
    },
    showPopupActiveUsers(state) {
      state.popups.popupActiveUsers = !state.popups.popupActiveUsers
    },
    closePopupActiveUsers(state) {
      state.popups.popupActiveUsers = false
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
  },
  actions: {
    async sendLog({ state, commit }, data) {
      try {
        data.subunit = state.subunitRu
        data.username = state.username
        const response = await axios.post(`${Config.SERVER_URL}/api/logs/addLog`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response) {
          commit('pushLog', response.data)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async sendSystemStatus({ commit }, data) {
      try {
        data.username = ''
        const response = await axios.post(`${Config.SERVER_URL}/api/logs/addSystemStatus`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response) {
          commit('pushLog', response.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})
