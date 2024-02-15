import { createStore } from "vuex"

export default createStore({
  state: {
    username: "",
    roles: "",
    systems: [],
    soundEnable: false,
    workSorted: false,
    alarmSorted: false,
    popups: {
      popupRegistration: false,
      popupAddSP: false,
      popupSP: false,
      popupPayload: false,
    },
    NavPopups: {
      Open: false,
      AuthItems: false,
      soundItems: false,
      settingItems: false,
    },
  },
  mutations: {
    /* Мутация СП */
    changeSystems(state, value) {
      state.systems = value
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

    /* Менюшные попапы */
    // showAuthItems(state) {
    //   state.NavPopups.AuthItems = !state.NavPopups.AuthItems
    // },
    // showSoundItems(state) {
    //   state.NavPopups.soundItems = !state.NavPopups.soundItems
    // },
    // showSettingItems(state) {
    //   state.NavPopups.settingItems = !state.NavPopups.settingItems
    // },

    /* Закрытие всех попапов */
    closeAllPopups(state, name) {
      for (const key in state.NavPopups) {
        if (name == "reset") {
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
    },
  },
  // getters: {
  //   isAnyPopupOpen: (state) => {
  //     return Object.values(state.NavPopups).some((value) => value === true)
  //   },
  // },
})
