import { createStore } from "vuex"

export default createStore({
  state: {
    soundEnable: false,
    workSorted: false,
    alarmSorted: false,
    popupAddSP: false,
    popupRegistration: false,
  },
  mutations: {
    enableSound(state) {
      state.soundEnable = true
    },
    showPopupAddSp(state) {
      state.popupAddSP = !state.popupAddSP
    },
    showPopupRegistration(state) {
      state.popupRegistration = !state.popupRegistration
    },
    disableSound(state) {
      state.soundEnable = false
    },
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
})
